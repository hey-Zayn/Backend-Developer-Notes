# RSA Cryptography System

A robust Node.js application demonstrating **Asymmetric Cryptography** using the RSA algorithm. This project implements a secure way to encrypt and decrypt data using a public-private key pair, following the Model-View-Controller (MVC) architectural pattern.

## 🔐 What is Asymmetric Cryptography?

Asymmetric cryptography, or Public-Key Cryptography, uses a pair of related keys:

1.  **Public Key**: Shared with anyone. It is used to **encrypt** data.
2.  **Private Key**: Kept secret by the owner. It is used to **decrypt** data encrypted with the corresponding public key.

This ensures that even if someone intercepts the encrypted data and has the public key, they cannot read the original message without the private key.

---

## 🚀 How it Works (The Process)

1.  **Key Generation**: The system generates a 2048-bit RSA key pair.
2.  **Encryption**:
    - The client sends plain text data to the `/encrypt` endpoint.
    - The server uses the **Public Key** to scramble the data into a Base64-encoded cipher string.
3.  **Decryption**:
    - The client sends the encrypted Base64 string to the `/decrypt` endpoint.
    - The server uses the **Private Key** to unscramble the cipher back into its original plain text.

---

## 🏗️ Project Structure (MVC)

The project follows a clean MVC structure for scalability and readability:

- **lib/genrateKeys.js**: Logic for generating and exporting the RSA key pair.
- **helpers/data.functions.js**: Core cryptographic functions for encryption and decryption.
- **controller/data.controller.js**: Handles the API requests and responses.
- **routers/data.router.js**: Defines the API routes.
- **index.js**: The entry point of the application.

---

## 🛣️ API Endpoints

### 1. Encrypt Data

Encrypts a plain text string using the public key.

- **URL**: `/data/encrypt`
- **Method**: `POST`
- **Body**:

  ```json
  {
    "data": "Hello, this is a secret message!"
  }
  ```

- **Response Example**:
  ```json
  {
    "encryptedData": "A1b2C3d4E5f6G7h8I9j0K1l2M3n4O5p6Q7r8S9t0U1v2W3x4Y5z6A7b8C9d0E1f..."
  }
  ```

### 2. Decrypt Data

Decrypts an encrypted string using the private key.

- **URL**: `/data/decrypt`
- **Method**: `POST`
- **Body**:

  ```json
  {
    "encryptedData": "A1b2C3d4E5f6G7h8I9j0K1l2M3n4O5p6Q7r8S9t0U1v2W3x4Y5z6A7b8C9d0E1f..."
  }
  ```

- **Response Example**:
  ```json
  {
    "decryptedData": "Hello, this is a secret message!"
  }
  ```

---

## 🛠️ Setup & Installation

1.  **Install dependencies**:

    ```bash
    npm install
    ```

2.  **Start the server**:
    ```bash
    npm run dev
    ```
    The server will start on `http://localhost:3000`.

---

## 👨‍💻 Key Technologies

- **Node.js**: Runtime environment.
- **Express**: Web framework for the API.
- **Crypto**: Built-in Node.js module for cryptographic operations.
- **Nodemon**: For automatic server restarts during development.
