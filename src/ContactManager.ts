import { Interface as ReadlineInterface } from 'readline';
import { createInterface } from 'readline/promises';
import {
  Contact,
  ContactValidationError,
  CreateContactDto,
} from './types/Contact';
import { ContactValidator } from './utils/validation';

export class ContactManager {
  private contacts: Contact[] = [];
  private rl: ReadlineInterface;

  constructor() {
    this.rl = createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  private async question(prompt: string): Promise<string> {
    return new Promise((resolve) => {
      this.rl.question(prompt, resolve);
    });
  }

  // Display main menu
  private async displayMenu(): Promise<void> {
    console.clear();
    console.log(`
=== Contact Manager ===
1. Add New Contact (n)
2. Show Contact List (l)
3. Search Contact (s)
4. Delete Contact (d)
5. Exit (q)
==================
`);
  }

  // Add new contact
  private async addContact(): Promise<void> {
    try {
      const contactDto = await this.getContactInput();
      ContactValidator.validateContact(contactDto);

      const newContact: Contact = {
        ...contactDto,
        id: this.generateId(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      this.contacts.push(newContact);
      console.log('\nContact added successfully!');
    } catch (error) {
      if (error instanceof ContactValidationError) {
        console.error('\nValidation error:', error.message);
      } else {
        console.error(
          '\nError adding contact:',
          error instanceof Error ? error.message : 'Unknown error',
        );
      }
    }
    await this.waitForEnter();
  }

  // Get contact information from user
  private async getContactInput(): Promise<CreateContactDto> {
    const firstName = (await this.question('First Name: ')).trim();
    const lastName = (await this.question('Last Name: ')).trim();
    return { firstName, lastName };
  }

  // Generate unique ID
  private generateId(): number {
    return this.contacts.length > 0
      ? Math.max(...this.contacts.map((c) => c.id)) + 1
      : 1;
  }

  // Show contact list
  private async showContacts(): Promise<void> {
    try {
      if (this.contacts.length === 0) {
        console.log('\nContact list is empty.');
        return;
      }

      console.log('\n=== Contact List ===');
      this.contacts.sort((a, b) => a.id - b.id).forEach(this.displayContact);
    } catch (error) {
      console.error(
        '\nError displaying contacts:',
        error instanceof Error ? error.message : 'Unknown error',
      );
    } finally {
      await this.waitForEnter();
    }
  }

  private displayContact(contact: Contact): void {
    console.log(
      `${contact.id}. ${contact.firstName} ${contact.lastName}` +
        ` (Created: ${contact.createdAt.toLocaleDateString()})`,
    );
  }

  // Search contacts
  private async searchContact(): Promise<void> {
    try {
      const searchTerm = (await this.question('Search term: '))
        .trim()
        .toLowerCase();
      if (!searchTerm) {
        console.log('\nSearch term cannot be empty.');
        return;
      }

      const results = this.contacts.filter(
        (contact) =>
          contact.firstName.toLowerCase().includes(searchTerm) ||
          contact.lastName.toLowerCase().includes(searchTerm),
      );

      if (results.length === 0) {
        console.log('\nNo contacts found.');
        return;
      }

      console.log('\n=== Search Results ===');
      results.forEach(this.displayContact);
    } catch (error) {
      console.error(
        '\nError searching contacts:',
        error instanceof Error ? error.message : 'Unknown error',
      );
    } finally {
      await this.waitForEnter();
    }
  }

  // Delete contact
  private async deleteContact(): Promise<void> {
    try {
      const idStr = await this.question('Contact ID to delete: ');
      const id = ContactValidator.validateId(idStr);

      const index = this.contacts.findIndex((c) => c.id === id);
      if (index === -1) {
        console.log('\nContact not found.');
        return;
      }

      const contact = this.contacts[index];
      const confirm = await this.question(
        `\nAre you sure you want to delete ${contact.firstName} ${contact.lastName}? (y/N): `,
      );

      if (confirm.toLowerCase() === 'y') {
        this.contacts.splice(index, 1);
        console.log('\nContact deleted successfully.');
      } else {
        console.log('\nDeletion cancelled.');
      }
    } catch (error) {
      if (error instanceof ContactValidationError) {
        console.error('\nValidation error:', error.message);
      } else {
        console.error(
          '\nError deleting contact:',
          error instanceof Error ? error.message : 'Unknown error',
        );
      }
    } finally {
      await this.waitForEnter();
    }
  }

  // Wait for Enter key
  private async waitForEnter(): Promise<void> {
    await this.question('\nPress Enter to continue...');
  }

  // Run the application
  public async run(): Promise<void> {
    try {
      while (true) {
        await this.displayMenu();
        const action = (
          await this.question('Please select an option: ')
        ).toLowerCase();

        switch (action) {
          case 'n':
            await this.addContact();
            break;
          case 'l':
            await this.showContacts();
            break;
          case 's':
            await this.searchContact();
            break;
          case 'd':
            await this.deleteContact();
            break;
          case 'q':
            console.log('\nGoodbye!');
            this.rl.close();
            return;
          default:
            console.log('\nInvalid option!');
            await this.waitForEnter();
        }
      }
    } catch (error) {
      console.error(
        'Application error:',
        error instanceof Error ? error.message : 'Unknown error',
      );
    } finally {
      this.rl.close();
    }
  }

  // Helper methods for testing
  public getContacts(): Contact[] {
    return [...this.contacts];
  }

  public clearContacts(): void {
    this.contacts = [];
  }
}
