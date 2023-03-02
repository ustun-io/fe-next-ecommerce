# E-Commerce - A Next.js Frontend Application

<a href="https://nextjs.org/showcase">![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)</a>
<a href="https://graphql.org/">![GraphQL](https://img.shields.io/badge/-GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white)</a>
<a href="https://www.apollographql.com/docs/apollo-server/">![Apollo-GraphQL](https://img.shields.io/badge/-ApolloGraphQL-311C87?style=for-the-badge&logo=apollo-graphql)</a>
<a href="https://tanstack.com/query/latest">![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)</a>
<a href="https://react-hook-form.com/">![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white)</a>
<a href="https://jwt.io/">![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)</a>
<a href="https://www.typescriptlang.org/docs/">![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)</a>

---

Hi there! 👋
This is an E-Commerce Frontend application based on NextJS. <a href="https://nextjs.org/showcase">![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)</a> is an open-source web development framework created by Vercel enabling React-based web applications with server-side rendering and generating static websites. 

This project utilizes my <a href="https://github.com/erenustun/nest-shop">![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)</a>
Backend application (including a `docker-compose.yml` YAML file for: a mysql instance as database solution).

## ✅ Features:

- [x] Authentication & Authorization (RBAC: `admin`, `customer`, `product_management`)
- [x] Services for `apollo-client` and graphql to `query` and `mutate` data
- [x] E-Mail functionality (for customer) to reset a user password and activate a account
- [x] Library with custom components
- [x] TailwindCSS with custom color palette
- [ ] [Todos](#-todo)

---

## 📃 Requirements
- Install cross-var:
- - `npm install --dev cross-var`
- Start the backend instance (see `readme.md` file in the repository):
    - [Backend Repo (nest-shop)](https://github.com/erenustun/nest-shop)

## 🚀 Running Locally
Clone the project, navigate into project directory & install dependencies:
```bash
  git clone https://github.com/erenustun/fe-next && cd fe-next && npm i
```

### Environment Variables

- Copy `.env.local.example` to `.env.local`:
```bash
  cp .env.local.example .env.local
```

### Start application in development mode
```bash
npm run dev
```

### NextJS application (Demo)
```bash
http://localhost:3002
```

## 🔜 Todo:
- [x] Viewing products in a list and as a single item 
- [x] Adding products to a shopping cart with an input field for quantity (`one-to-many`)
- [ ] Creating & managing orders
