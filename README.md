# Notes-app

A full-stack Notes Application build with MERN stack!

---

# Features

- User Authentication (Login/Logout)
- Create, View, Update and Delete notes
- Protected Routes with JWT Tokens
- Responsive UI
- Error Handling

---

## Tech Stack

**Frontend:** React, Axios, React Router DOM  
**Backend:** Node.js, Express.js, MongoDB, Mongoose  
**Authentication:** JWT (JSON Web Tokens) 


---

## 🖥️ Local Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/<your-repo-name>.git
cd <your-repo-name>
```

### 2. Setup Backend (Server)

```bash
cd server
npm install
```

### Create a .env file insider the backend/ folder:

```env
MONGO_URI = your_mongodb_connection_string
JWT_SECRET = your_secret_key
```

### Run the backend server:

```bash
npm run dev
```

### 3.Setup Frontend (Client)

```bash
cd ../client
npm install
npm run dev
```
