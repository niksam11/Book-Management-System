# Book Management REST API

A robust REST API for managing books, built with Node.js, Express, and TypeScript.
Features include basic CRUD operations and a bulk import feature via CSV with manual validation.

## Features
- **CRUD Operations**: Create, Read, Update, Delete books.
- **Bulk Import**: Upload CSV files to add multiple books at once.
- **Validation**: Manual CSV validation ensures data integrity.
- **Type Safety**: Built completely with TypeScript.
- **Logging**: Request logging using Morgan.
- **Error Handling**: Centralized error handling middleware.

## Setup Instructions

### Prerequisites
- Node.js (v14+ recommended)
- npm

### Installation
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the App
- **Development**:
  ```bash
  npm run dev
  ```
- **Production Build**:
  ```bash
  npm run build
  npm start
  ```
- **Testing**:
  ```bash
  npm test
  ```

## API Endpoints

### Books
- `GET /books`: Get all books.
- `GET /books/:id`: Get a book by ID.
- `POST /books`: Create a new book.
    - Body: `{ "title": "String", "author": "String", "publishedYear": Number }`
- `PUT /books/:id`: Update a book.
- `DELETE /books/:id`: Delete a book.

### Import
- `POST /books/import`: Upload a CSV file.
    - Key: `file`
    - Content:
      ```csv
      title,author,publishedYear
      Book Title,Author Name,2023
      ```

## Tech Stack
- Node.js
- Express
- TypeScript
- Morgan (Logging)
- Multer (File Upload)
- Jest (Testing)