# API Documentation

## Table of Contents
- [Authentication Endpoints](#authentication-endpoints)
- [User Endpoints](#user-endpoints)
- [Admin Endpoints](#admin-endpoints)

---

## Authentication Endpoints

### Register User
**URL:** `<server_url>/api/v1/auth/register`  
**Method:** `POST`

**Request Body:**
```json
{
    "name": "ABC",
    "email": "abc1@gmail.com",
    "phone": "9508005524",
    "password": "Pass@123$"
}
```

- For the first user in the database, add the role `superadmin` in MongoDB.
- Cookies will be set on the server side.

---

### Login User
**URL:** `<server_url>/api/v1/auth/login`  
**Method:** `POST`

**Request Body:**
```json
{
    "email": "abc1@gmail.com",
    "password": "Pass@123$"
}
```

- This endpoint handles login for both admin and user roles.
- Cookies will be created on the server side.

---

### Logout User
**URL:** `<server_url>/api/v1/auth/logout`  
**Method:** `GET`

---

## User Endpoints

### Get User Details
**URL:** `<server_url>/api/v1/user/me`  
**Method:** `GET`

**Response:**
```json
{
    "name": "ABC",
    "email": "abc12@gmail.com",
    "phoneNumber": "9508005522",
    "role": "superadmin"
}
```

---

### Deactivate User
**URL:** `<server_url>/api/v1/user/deactivate`  
**Method:** `PUT`

- This endpoint requires cookies set from the server side.

---

## Admin Endpoints

### Get All Users
**URL:** `<server_url>/api/v1/admin/users`  
**Method:** `GET`

**Response:**
```json
{
    "page": 1,
    "pageSize": 10,
    "totalPages": 1,
    "totalUsers": 2,
    "users": [
        {
            "_id": "678f893cbf01c2a102ec250b",
            "name": "ABC",
            "email": "abc1@gmail.com",
            "phoneNumber": "9508005524",
            "isActive": false,
            "role": "user",
            "createdAt": "2025-01-21T11:47:08.951Z",
            "updatedAt": "2025-01-21T11:54:31.967Z",
            "__v": 0
        },
        {
            "_id": "678f8b66bf01c2a102ec2514",
            "name": "ABC",
            "email": "abc12@gmail.com",
            "phoneNumber": "9508005522",
            "isActive": true,
            "role": "superadmin",
            "createdAt": "2025-01-21T11:56:22.939Z",
            "updatedAt": "2025-01-21T11:56:22.939Z",
            "__v": 0
        }
    ]
}
```

- This endpoint requires a token sent using a cookie.

---

### Activate User
**URL:** `<server_url>/api/v1/admin/activate`  
**Method:** `PUT`

**Request Body:**
```json
{
    "email": "abc1@gmail.com"
}
```
- Activates the last account that was deactivated.

---

### Create Admin
**URL:** `<server_url>/api/v1/admin/create-admin`  
**Method:** `POST`

**Request Body:**
```json
{
    "email": "abc1@gmail.com"
}
```
- Converts the last activated account into an admin.

---
