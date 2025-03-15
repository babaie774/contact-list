export interface BaseContact {
  firstName: string;
  lastName: string;
}

export interface Contact extends BaseContact {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateContactDto = BaseContact;

export class ContactValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ContactValidationError';
  }
} 