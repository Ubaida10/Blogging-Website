```markdown
# Angular Blog Platform

A simple blog platform built with Angular and `json-server` for mock backend APIs.

## Features

- User registration and login (mocked)
- Create, edit, and delete blog posts
- List and view blog details
- Categories and authors
- Image support (as URL or base64 string)
- Responsive UI with Bootstrap

## Tech Stack

- [Angular](https://angular.io/)
- [json-server](https://github.com/typicode/json-server)
- [Bootstrap](https://getbootstrap.com/)

## Getting Started

### Prerequisites

- Node.js & npm
- Angular CLI (`npm install -g @angular/cli`)
- `json-server` (`npm install -g json-server`)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Start the mock backend:
   ```sh
   json-server --watch db.json --port 3000
   ```

4. Start the Angular app:
   ```sh
   ng serve
   ```
   The app will run at `http://localhost:4200`.

## Project Structure

- `src/app/` — Angular components, services, and models
- `db.json` — Mock database for users and blogs

## Usage

- Register or log in (mocked)
- Create, edit, or delete blogs
- View blogs by category or author

## Notes

- Images are stored as URLs or base64 strings in the `imageUrl` field.
- `json-server` only supports JSON; file uploads are not supported.

