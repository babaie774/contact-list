import { ContactManager } from './ContactManager';

const contactManager = new ContactManager();
contactManager.run().catch(error => {
  console.error('خطای برنامه:', error instanceof Error ? error.message : 'خطای ناشناخته');
  process.exit(1);
}); 