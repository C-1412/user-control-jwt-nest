# 📌 API REST - NestJS CRUD + Auth

Este proyecto implementa un servicio REST con **NestJS**, **TypeORM** y **JWT**.  

---

# Endpoints API

## 🔐 AuthController

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST   | `/api/v1/auth/register` | Registrar nuevo usuario |
| POST   | `/api/v1/auth/login` | Iniciar sesión (retorna JWT) |
| GET    | `/api/v1/auth/profile` | Obtener perfil del usuario |

## 👥 UsersController

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST   | `/api/v1/users` | Crear usuario nuevo |
| GET    | `/api/v1/users` | Listar todos los usuarios |
| GET    | `/api/v1/users/:id` | Obtener usuario por ID |
| PATCH  | `/api/v1/users/:id` | Actualizar usuario |
| DELETE | `/api/v1/users/:id` | Eliminar usuario (soft delete) |

## 📦 TipoProductosController

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST   | `/api/v1/tipo-productos` | Crear tipo de producto |
| GET    | `/api/v1/tipo-productos` | Listar todos los tipos |
| GET    | `/api/v1/tipo-productos/:id` | Obtener tipo por ID |
| PATCH  | `/api/v1/tipo-productos/:id` | Actualizar tipo de producto |
| DELETE | `/api/v1/tipo-productos/:id` | Eliminar tipo (soft delete) |

## 🛍️ ProductosController

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST   | `/api/v1/productos` | Crear producto |
| GET    | `/api/v1/productos` | Listar todos los productos |
| GET    | `/api/v1/productos/:id` | Obtener producto por ID |
| PATCH  | `/api/v1/productos/:id` | Actualizar producto |
| DELETE | `/api/v1/productos/:id` | Eliminar producto (soft delete) |


## 💬 CommentsController

| Método | Endpoint | Descripción | Permisos |
|--------|----------|-------------|----------|
| POST | `/api/v1/comments` | Crear comentario (1 por usuario por producto) | USER |
| PATCH | `/api/v1/comments/:id` | Actualizar comentario propio | USER |
| DELETE | `/api/v1/comments/:id` | Eliminar comentario (propio o admin) | USER o ADMIN |
| GET | `/api/v1/comments/product/:productId` | Ver todos los comentarios de un producto | ADMIN |
| GET | `/api/v1/comments/user/:userId` | Ver todos los comentarios de un usuario | ADMIN |

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