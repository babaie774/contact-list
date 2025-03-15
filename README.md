# Contact Manager

A professional CLI contact management system implemented in TypeScript.

## Features

- 📝 Add new contacts
- 📋 Display contact list
- 🔍 Search contacts
- ❌ Delete contacts
- 🎯 Strong typing with TypeScript
- ✨ Simple and user-friendly CLI interface
- 🧪 Unit tests with Jest
- 🔍 Code quality with ESLint
- 💅 Code formatting with Prettier
- 🔄 Fast development with Nodemon

## Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

## Installation

```bash
# Install dependencies
npm install

# or using yarn
yarn install
```

## Available Commands

```bash
# Run the application
npm start

# Run in development mode
npm run dev

# Run tests
npm test

# Build the project
npm run build

# Lint the code
npm run lint

# Format the code
npm run format
```

## Project Structure

```
contact-manager/
├── src/
│   ├── index.ts
│   ├── ContactManager.ts
│   ├── types/
│   │   └── Contact.ts
│   └── utils/
│       └── validation.ts
├── tests/
│   └── ContactManager.test.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Tests

This project uses Jest for unit testing. Tests include:

- Testing contact addition
- Testing contact list display
- Testing input validation

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. 