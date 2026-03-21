# Blog API

A full-stack blog application built with Node.js, Express, Prisma, and PostgreSQL.

## What This Project Is

A full-stack blog platform where users can register, log in, write posts with rich text formatting, and manage their content through a personal dashboard. The backend is a REST API built with Node.js and Express, connected to a PostgreSQL database through Prisma ORM. The frontend is plain HTML, CSS, and JavaScript with no framework.

---

## Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| Runtime | Node.js | JavaScript outside the browser |
| Framework | Express.js | Simple, fast HTTP routing |
| Database | PostgreSQL | Relational data with enforced structure |
| ORM | Prisma | Type-safe database queries in JavaScript |
| Auth | JWT + bcrypt | Stateless authentication, hashed passwords |
| Frontend | HTML/CSS/JS | No framework — plain and fast |
| Editor | Quill.js | Rich text editing in the browser |

---

## Features

- User registration and login with JWT authentication
- Password hashing with bcrypt
- Create, read, update, and delete blog posts
- Rich text editor with headings, bold, lists, code blocks, and image upload
- Pagination and live search on the homepage
- Ownership-based authorization — only authors can edit or delete their posts
- Admin role can delete any post
- Personal dashboard showing only the logged-in user's posts
- Instant delete without page reload using DOM manipulation

---

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/auth/register | No | Register a new user |
| POST | /api/auth/login | No | Login and receive a token |
| GET | /api/posts | No | Get all posts (paginated, searchable) |
| GET | /api/posts/:id | No | Get a single post by ID |
| GET | /api/posts/my | Yes | Get logged-in user's posts |
| POST | /api/posts | Yes | Create a new post |
| PUT | /api/posts/:id | Yes | Update a post (author only) |
| DELETE | /api/posts/:id | Yes | Delete a post (author or admin) |

---

## How To Run Locally

### Prerequisites

- Node.js v18 or higher
- PostgreSQL installed and running
- Git

### Steps

**1. Clone the repository**

```bash
git clone https://github.com/VicProjects12/Blog-API.git
cd Blog-API
```

**2. Install dependencies**

```bash
npm install
```

**3. Create your .env file in the root folder**

```
DATABASE_URL=postgresql://postgres@localhost:5432/blogapi
JWT_SECRET=your_long_random_secret_here
JWT_EXPIRES_IN=7d
PORT=5000
```

**4. Run the database migration**

```bash
npx prisma migrate dev --name init
```

**5. Start the server**

```bash
node server.js
```

**6. Open the frontend**

Open `frontend/index.html` in your browser. The backend runs on http://localhost:5000.

---

## Project Structure

```
Blog-API/
├── controllers/
│   └── postController.js
├── middleware/
│   └── auth.js
├── routes/
│   ├── auth.js
│   └── posts.js
├── config/
│   └── prisma.js
├── prisma/
│   └── schema.prisma
├── frontend/
│   ├── js/
│   ├── style.css
│   ├── index.html
│   ├── post.html
│   ├── create.html
│   ├── dashboard.html
│   ├── login.html
│   └── register.html
├── server.js
├── .env
└── .gitignore
```

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| DATABASE_URL | PostgreSQL connection string |
| JWT_SECRET | Secret key for signing tokens |
| JWT_EXPIRES_IN | Token expiry duration e.g. 7d |
| PORT | Port the server runs on — defaults to 5000 |

---

Built by Victor — [github.com/VicProjects12](https://github.com/VicProjects12)