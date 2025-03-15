import { ContactManager } from '../src/ContactManager';

describe('ContactManager', () => {
  let contactManager: ContactManager;

  beforeEach(() => {
    contactManager = new ContactManager();
  });

  afterEach(() => {
    contactManager.clearContacts();
  });

  describe('getContacts', () => {
    it('should return empty list initially', () => {
      expect(contactManager.getContacts()).toHaveLength(0);
    });
  });

  // Note: Since the main methods of the class require readline interaction,
  // real tests would need to mock readline.
  // In a real project, we should separate the core logic from CLI interaction
  // and write more comprehensive tests.

  describe('Contact Management Logic', () => {
    it('should manage contacts correctly', () => {
      // This is a sample test and should be expanded in a real project
      const contacts = contactManager.getContacts();
      expect(Array.isArray(contacts)).toBe(true);
      expect(contacts).toHaveLength(0);
    });
  });
}); 