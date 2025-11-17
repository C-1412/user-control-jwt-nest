# 📌 API REST - NestJS CRUD + Auth

Este proyecto implementa un servicio REST con **NestJS**, **TypeORM** y **JWT**.  

---

## 👤 UsersController (`/api/v1/users`)

| Método | Endpoint              | Descripción                                |
|--------|-----------------------|--------------------------------------------|
| POST   | `/api/v1/users`       | Crear un usuario nuevo                     |
| GET    | `/api/v1/users`       | Listar todos los usuarios                  |
| GET    | `/api/v1/users/:id`   | Obtener un usuario por su ID               |
| PATCH  | `/api/v1/users/:id`   | Actualizar parcialmente un usuario por ID  |
| DELETE | `/api/v1/users/:id`   | Eliminar un usuario por ID                 |

---

## 🔐 AuthController (`/api/v1/auth`)

| Método | Endpoint                   | Descripción                                                                 |
|--------|----------------------------|-----------------------------------------------------------------------------|
| POST   | `/api/v1/auth/register`    | Registrar un nuevo usuario                                                  |
| POST   | `/api/v1/auth/login`       | Iniciar sesión (devuelve token JWT)                                         |
| GET    | `/api/v1/auth/profile`     | Obtener el perfil del usuario autenticado (requiere `Authorization: Bearer <token>`) |

---

## 🚀 Ejecución

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run start:dev

# Compilar y ejecutar en producción
npm run build
npm run start:prod

# Ejecutar tests
npm test