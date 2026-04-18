# Dev Journal

A simple Node.js project to log your daily learning entries. This project demonstrates core Node.js concepts such as environment variables, file system operations, routing, and serving static files.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Why Use the `path` Module?](#why-use-the-path-module)
- [Handling Directory Paths in Node.js](#handling-directory-paths-in-nodejs)
- [CORS and OPTIONS Preflight Requests](#cors-and-options-preflight-requests)
- [Routing and URL Parsing](#routing-and-url-parsing)
- [API vs Static File Routing](#api-vs-static-file-routing)
- [Project Structure](#project-structure)

---

## Project Overview

**Dev Journal** is a Node.js application that allows you to record and view daily learning entries. It uses a simple JSON file as a database and serves both API endpoints and static HTML/CSS files.

---

## Getting Started

1. **Clone the repository**
2. **Install dependencies** (if any)
3. **Set up your `.env` file** (see below)
4. **Run the server:**
   ```sh
   node index.js
   ```
5. Visit [http://localhost:9000](http://localhost:9000) (or your configured port)

---

## Environment Variables

### Why use `process.env.PORT || 3000`?

This pattern sets the port number for your server:

```js
const PORT = process.env.PORT || 3000;
```

- **`process.env.PORT`**: Uses the port defined in your environment (e.g., by cloud providers like Heroku, AWS, Azure).
- **`3000`**: Fallback default if no environment variable is set.

**Why is this important?**
- Cloud providers dynamically assign ports at runtime.
- Hardcoding a port (like 3000) can cause your app to crash on deployment.
- Using `.env` files lets you easily switch between development, testing, and production environments without changing your source code.

---

## Why Use the `path` Module?

File paths differ across operating systems:

- **Windows:** `data\entries.json`
- **Mac/Linux:** `data/entries.json`

Hardcoding `/` or `\` can break your code on another OS. The Node.js `path` module ensures your file paths are always correct, regardless of the platform.

---

## Handling Directory Paths in Node.js

### Modern Node.js (v20.11.0+)

```js
const __dirname = import.meta.dirname;
const __filename = import.meta.filename;
```

### Older Node.js Versions

```js
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
```

This ensures compatibility and correct path resolution in all environments.

---

## CORS and OPTIONS Preflight Requests

When making `POST`, `PUT`, or `DELETE` requests from a browser, an **OPTIONS preflight request** is sent first. If your server doesn't handle this, requests from real frontends will fail.

**Example handling:**

```js
if (req.method === "OPTIONS") {
  res.writeHead(204, {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });
  res.end();
  return;
}
```

This enables cross-origin requests and ensures smooth API communication.

---

## Routing and URL Parsing

To determine which route a user is visiting, Node.js uses the `URL` object:

```js
const requestUrl = new URL(req.url, `http://${req.headers.host}`);
const pathname = requestUrl.pathname;
```

- **`req.url`**: The requested path (e.g., `/about?name=favour`)
- **`req.headers.host`**: The domain and port (e.g., `localhost:3000`)
- **`pathname`**: Extracts just the path, without query parameters.

| Full URL                              | Pathname   |
|----------------------------------------|------------|
| http://localhost:3000/                 | `/`        |
| http://localhost:3000/about            | `/about`   |
| http://localhost:3000/user?id=5        | `/user`    |

This makes route handling clean and robust.

---

## API vs Static File Routing

In `routes.js`:

- **API routes** (e.g., `/api/entries`) must be handled **before** static file routes.
- Static files (HTML, CSS) are served for paths like `/`, `/entries.html`, `/style.css`.
- Unmatched routes return a 404 JSON error.

---

## Project Structure

```
.env
.gitignore
index.js
package.json
Readme.md
routes.js
controllers/
  entryController.js
data/
  entries.json
public/
  entries.html
  index.html
  style.css
utils/
  helper.js
```

- **controllers/**: API logic (reading/writing entries)
- **data/**: JSON "database"
- **public/**: Static HTML/CSS files
- **utils/**: Helper functions (responses, static file serving)

---

## Learn More

- [Node.js Documentation](https://nodejs.org/en/docs)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [MDN: CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- [Node.js Path Module](https://nodejs.org/api/path.html)

---

Happy journaling!