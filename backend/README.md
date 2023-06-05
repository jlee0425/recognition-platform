# Backend

### Dependencies
- Typescript, expressjs
- Nestjs, TypeORM, JWT

## Getting Started

First, install the dependencies and start development server:

```bash
yarn && yarn dev
```

## endpoints

- Public Routes
  - `/auth/login, POST`
    - Accepts: [`username`, `password`] from body
    - Returns: `JWT` access_token
  - `/auth/logout, POST`
    - Removes Token

- Protected Routes
  - `/auth/me, GET`
    - Accepts: `access_token` from request header 
    - Returns: `USER`
  - `/user, GET`
    - Accepts: `access_token` from request header 
    - Returns: `USER` Table excluding the user who requested.
  - `/user/update-user, POST`
    - Populates `USER.profile`
  - `/user/update-manager, POST`
    - Populates `USER.manager`
  - `/recognitions, POST`
    - Accepts: [`senderId`, `receiverId`, `recognitionList`] from body
    - Returns: Created & Saved Recognition
  - `/recognitions, GET`
    - Accpets: `access_token` from request header
    - Returns: recognitions submitted by the current user.
  - `/recognitions/me, GET`
    - Accpets: `access_token` from request header
    - Returns: recognitions submitted for the current user.
  - `/recognitions/team, GET`
    - Accpets: `access_token` from request header
    - Returns: recognitions submitted for the current user's team.

## Entities

- `user`
  - `id`: Primary Key
  - `username`: VARCHAR
  - `password`: VARCHAR, not encrypted
  - `managerId`: Foreign Key for `user` (MANY-1)
  - `profileId`: Foreign Key for the user's corresponding `profile` (1-1)

- `profile`
  - `id`: Primary Key
  - `firstname`: VARCHAR
  - `lastname`: VARCHAR
  - `department`: VARCHAR
  - `location`: VARCHAR
  - `email`: VARCHAR
  - `phone` VARCHAR
  - `description` VARCHAR

- `recognition`
  - `id`: Primary Key
  - `senderId`: Foreign Key for `user` (1-1)
  - `receiverId`: Foreign Key for `user` (1-1)

- `recognition_value`
  - `id`: Primary Key
  - `value`: VARCHAR
  - `detail`: VARCHAR
  - `recognitionId`: Foreign Key for `recognition` (MANY-1)
  

