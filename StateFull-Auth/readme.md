# StateFull Auth - Node.js MVC Authentication System

StateFull Auth is a robust, state-of-the-art authentication system built with Node.js, Express, and MongoDB. It follows the **Model-View-Controller (MVC)** architectural pattern to ensure clean code separation, scalability, and ease of maintenance.

## 🚀 Features

- **Secure Registration & Login**: User data is handled with best practices.
- **JWT Authentication**: Stateless yet powerful session management using JSON Web Tokens.
- **Hashed Passwords**: Uses `bcrypt` for industry-standard password security.
- **Protected Routes**: Middleware-based access control for private resources.
- **MVC Architecture**: Clear separation of Database, Models, Controllers, and Routes.

---

## 🏗️ Project Structure (MVC)

The project is organized to keep logic, data, and routing separate:

- **Models/**: Defines the data schema and database interactions.
- **Controllers/**: Contains the business logic for handling requests (e.g., login, register).
- **Routes/**: Maps URL paths to controller functions.
- **Middleware/**: Functions that run before controllers (e.g., verify JWT).
- **Database/**: Configuration for MongoDB connection.

---

## 📦 Models

### User Model (`User.Model.js`)

The `User` model handles user data storage and security.

**Fields:**

- `name` (String, Required): The user's full name.
- `email` (String, Required, Unique): Used for login and identification.
- `password` (String, Required): Stored as a secure hash.

**Security Hooks:**

- **Pre-save Hook**: Automatically hashes the password using `bcrypt` (10 salt rounds) before saving to the database.

**Methods:**

- `comparePassword(password)`: Compares a plain-text password with the stored hash to verify credentials.

---

## 🛣️ API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint    | Description                   | Body Params                 |
| :----- | :---------- | :---------------------------- | :-------------------------- |
| `POST` | `/register` | Create a new user account     | `name`, `email`, `password` |
| `POST` | `/login`    | Authenticate user and get JWT | `email`, `password`         |

**Example Login Response:**

```json
{
  "success": true,
  "message": "User logged in successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Private Routes (`/api/private`)

| Method | Endpoint   | Description              | Required Header          |
| :----- | :--------- | :----------------------- | :----------------------- |
| `GET`  | `/private` | Access protected content | `Authorization: <token>` |

---

## 🔒 Authentication Logic

1. **Registration**: User provides details → Password is hashed → User saved in MongoDB.
2. **Login**: User provides email/password → Controller verifies password via `comparePassword` → If valid, a **JWT** is signed with user details and a secret key.
3. **Authorization**: Submitting the JWT in the `Authorization` header allows the `AuthMiddleware` to decode the token and grant access to protected routes.

---

## 🛠️ Setup & Installation

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd StateFull-Auth
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Environment Setup**:
   Create a `.env` file in the root directory (refer to `example.env.md`) and add:

   ```env
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_key
   ```

4. **Run the server**:
   ```bash
   npm run dev
   ```

---

## 📄 License

This project is for educational purposes. Feel free to use and modify!
