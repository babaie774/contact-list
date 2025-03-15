import { ContactValidationError, CreateContactDto } from '../types/Contact';

export class ContactValidator {
  static validateContact(contact: CreateContactDto): void {
    if (!contact.firstName || contact.firstName.trim().length === 0) {
      throw new ContactValidationError('First name is required');
    }

    if (!contact.lastName || contact.lastName.trim().length === 0) {
      throw new ContactValidationError('Last name is required');
    }

    if (contact.firstName.length > 50) {
      throw new ContactValidationError(
        'First name cannot be longer than 50 characters',
      );
    }

    if (contact.lastName.length > 50) {
      throw new ContactValidationError(
        'Last name cannot be longer than 50 characters',
      );
    }
  }

  static validateId(id: string): number {
    const parsedId = parseInt(id);
    if (isNaN(parsedId) || parsedId < 1) {
      throw new ContactValidationError('Invalid contact ID');
    }
    return parsedId;
  }
}
