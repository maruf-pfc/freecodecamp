# 🐾 Pet Shelter Business

A **GraphQL API + Client** project built while following freeCodeCamp’s tutorial series on building, consuming, and documenting GraphQL APIs.

This project is split into two parts:

- **Server** → Apollo GraphQL server
- **Client** → Vite-based frontend

## 📂 Project Structure

```txt
pet-shelter-business/
├── server/ # Apollo GraphQL backend
├── client/ # Vite frontend
└── README.md # Documentation
```

## 🚀 Setup Instructions

### 1️⃣ Clone and Install

```bash
git clone <repo-url>
cd pet-shelter-business
```

### 2️⃣ Server Setup

```bash
cd server
pnpm init
pnpm add @apollo/server graphql
pnpm add -D @babel/core @babel/preset-env babel-jest jest supertest
```

#### Add Babel config at root of `server/`

Create a file: `babel.config.cjs`

```js
// babel.config.cjs
module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current"
        }
      }
    ]
  ]
};
```

#### Run the server in dev mode

```bash
pnpm dev
```

#### Run tests

```bash
pnpm test
```

### 3️⃣ Client Setup

```bash
cd ..
mkdir client
cd client
pnpm create vite@latest .
pnpm add @apollo/server graphql
```

## 🛠 Available Commands

From inside **server**:

- `pnpm dev` → Start Apollo server with nodemon
- `pnpm test` → Run Jest + Supertest

From inside **client**:

- `pnpm dev` → Start Vite dev server
- `pnpm build` → Build for production
- `pnpm preview` → Preview production build locally

## 📦 Dependencies

### Server

- [@apollo/server](https://www.npmjs.com/package/@apollo/server)
- [graphql](https://www.npmjs.com/package/graphql)

### Dev Dependencies

- @babel/core
- @babel/preset-env
- babel-jest
- jest
- supertest
- nodemon

## 👤 Author

**Md. Maruf Sarker**

## 📝 License

This project is licensed under the **ISC License**.
