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

Para Usuarios Registrados (Role.USER)

POST    /api/v1/comments          # Crear comentario (1 por usuario por producto)
PATCH   /api/v1/comments/:id      # Actualizar comentario propio
DELETE  /api/v1/comments/:id      # Eliminar comentario propio

Para Administradores (Role.ADMIN)

GET     /api/v1/comments/product/:productId    # Ver todos los comentarios de un producto
GET     /api/v1/comments/user/:userId          # Ver todos los comentarios de un usuario
DELETE  /api/v1/comments/:id                   # Eliminar cualquier comentario

🔐 Autenticación
Login
POST /api/v1/auth/login

json
// Request
{
  "email": "user@example.com",
  "password": "password123"
}

// Response
{
  "token": "eyJhbGci...",
  "email": "user@example.com",
  "role": "user",
  "name": "Juan Perez",
  "id": 1
}
Register
POST /api/v1/auth/register

json
// Request
{
  "name": "Juan Perez",
  "email": "user@example.com",
  "password": "password123"
}

// Response
{
  "name": "Juan Perez",
  "email": "user@example.com"
}
📦 Productos
Crear Producto (ADMIN)
POST /api/v1/productos

json
// Request
{
  "nombre": "Smartphone",
  "descripcion": "Teléfono inteligente",
  "precio": 699.99,
  "tipoProductoId": 1
}

// Response
{
  "id": 1,
  "nombre": "Smartphone",
  "descripcion": "Teléfono inteligente",
  "precio": 699.99,
  "tipoProducto": {
    "id": 1,
    "nombre": "Electrónicos"
  }
}
Listar Productos (USER+)
GET /api/v1/productos

json
// Response
[
  {
    "id": 1,
    "nombre": "Smartphone",
    "descripcion": "Teléfono inteligente",
    "precio": 699.99,
    "tipoProducto": {
      "id": 1,
      "nombre": "Electrónicos"
    }
  }
]
💬 Comentarios
Crear Comentario (USER)
POST /api/v1/comments

json
// Request
{
  "content": "Excelente producto!",
  "productId": 1
}

// Response
{
  "id": 1,
  "content": "Excelente producto!",
  "user": {
    "id": 1,
    "name": "Juan Perez"
  },
  "createdAt": "2023-10-05T12:00:00.000Z"
}
Ver Comentarios por Producto (ADMIN)
GET /api/v1/comments/product/1

json
// Response
[
  {
    "id": 1,
    "content": "Excelente producto!",
    "user": {
      "id": 1,
      "name": "Juan Perez"
    },
    "createdAt": "2023-10-05T12:00:00.000Z"
  }
]
👥 Usuarios (ADMIN only)
Crear Usuario
POST /api/v1/users

json
// Request
{
  "name": "Maria Garcia",
  "email": "maria@example.com",
  "password": "password123"
}

// Response
{
  "id": 2,
  "name": "Maria Garcia",
  "email": "maria@example.com",
  "role": "user"
}
📋 Categorías
Crear Categoría (ADMIN)
POST /api/v1/tipo-productos

json
// Request
{
  "nombre": "Electrónicos",
  "descripcion": "Dispositivos electrónicos"
}

// Response
{
  "id": 1,
  "nombre": "Electrónicos",
  "descripcion": "Dispositivos electrónicos"
}

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