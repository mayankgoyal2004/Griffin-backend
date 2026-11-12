# Griffin Construction — Backend API

Enterprise Node.js + Express + Prisma + PostgreSQL backend service powering the Griffin Construction CMS Dashboard and public Frontend website.

---

## 🏗️ Architecture & Tech Stack

- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js
- **Database & ORM**: PostgreSQL with Prisma ORM
- **Authentication**: JWT (JSON Web Tokens) with bcrypt password hashing & HTTP-only cookies
- **Validation**: Zod schema validation middleware
- **Security**: Helmet, CORS, Cookie-parser
- **Logging**: Morgan HTTP request logging & custom structured logger

---

## 📁 Folder Structure

```
Backend/
├── prisma/
│   ├── schema.prisma           # Database models, relations & enums
│   └── seed.js                 # Complete database seeding script
├── src/
│   ├── config/
│   │   ├── db.js               # Prisma Client singleton & connection
│   │   └── env.js              # Environment configuration loader
│   ├── constants/
│   │   └── index.js            # Roles, Statuses, HTTP status codes
│   ├── controllers/            # Route controllers for all business logic
│   │   ├── activity.controller.js
│   │   ├── auth.controller.js
│   │   ├── blog.controller.js
│   │   ├── dashboard.controller.js
│   │   ├── inquiry.controller.js
│   │   ├── media.controller.js
│   │   ├── page.controller.js
│   │   ├── project.controller.js
│   │   ├── service.controller.js
│   │   ├── settings.controller.js
│   │   └── team.controller.js
│   ├── middlewares/            # Error handling, Auth, RBAC, Validation
│   │   ├── auth.middleware.js
│   │   ├── error.middleware.js
│   │   └── validate.middleware.js
│   ├── routes/                 # Express API route declarations
│   │   ├── index.js            # Main /api/v1 router aggregator
│   │   ├── activity.routes.js
│   │   ├── auth.routes.js
│   │   ├── blog.routes.js
│   │   ├── dashboard.routes.js
│   │   ├── inquiry.routes.js
│   │   ├── media.routes.js
│   │   ├── page.routes.js
│   │   ├── project.routes.js
│   │   ├── service.routes.js
│   │   ├── settings.routes.js
│   │   └── team.routes.js
│   ├── utils/                  # Reusable helper classes & methods
│   │   ├── ApiError.js         # Custom structured error class
│   │   ├── ApiResponse.js      # Uniform API JSON response class
│   │   ├── asyncHandler.js     # Promise catch wrapper for handlers
│   │   ├── logger.js           # Timestamped application logger
│   │   └── slugify.js          # URL slug generator
│   ├── validators/             # Zod input validation schemas
│   │   ├── auth.validator.js
│   │   ├── blog.validator.js
│   │   ├── inquiry.validator.js
│   │   ├── project.validator.js
│   │   └── service.validator.js
│   ├── app.js                  # Express application setup
│   └── server.js               # HTTP server bootstrap & shutdown logic
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
cd Backend
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env` and configure your PostgreSQL database credentials:
```env
PORT=5000
NODE_ENV=development
API_PREFIX=/api/v1
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/griffin_db?schema=public"
JWT_SECRET="your_secure_random_jwt_secret"
```

### 3. Initialize Prisma & Database
Generate Prisma client:
```bash
npm run prisma:generate
```

Push schema to PostgreSQL database:
```bash
npm run prisma:push
```

Seed database with initial Griffin Construction data and Admin credentials:
```bash
npm run prisma:seed
```

> **Default Admin Account:**
> - **Email**: `admin@griffinconstruction.in`
> - **Password**: `Admin@12345`

### 4. Start the Server
Development with hot reload:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

---

## 📡 API Endpoints Overview (`/api/v1`)

| Endpoint | Method | Access | Description |
|---|---|---|---|
| `/health` | GET | Public | Server uptime and health check |
| `/auth/login` | POST | Public | Authenticate user & issue JWT |
| `/auth/register` | POST | Public | Register new user |
| `/auth/me` | GET | Protected | Fetch current logged-in user profile |
| `/dashboard/summary` | GET | Protected | Dashboard analytics, counts & overview |
| `/projects` | GET, POST | Mixed | List projects / create project (Admin) |
| `/projects/slug/:slug` | GET | Public | Get single project by slug |
| `/services` | GET, POST | Mixed | List services / create service (Admin) |
| `/blog` | GET, POST | Mixed | List blog posts / create post (Admin) |
| `/inquiries` | GET, POST | Mixed | Submit inquiry (Public) / List (Admin) |
| `/team` | GET, POST | Mixed | List team members / manage (Admin) |
| `/pages/:slug` | GET, PUT | Mixed | CMS page data / update page (Admin) |
| `/settings` | GET, PUT | Mixed | Global company details / update (Admin) |
| `/media` | GET, POST | Protected | Manage media library assets |
| `/activity` | GET | Admin | Audit activity log history |

