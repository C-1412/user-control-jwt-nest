🚀 API REST - NestJS CRUD + Auth + Product Management
Este proyecto implementa un servicio REST completo con NestJS, TypeORM, JWT Authentication y sistema de gestión de productos.

✨ Características

✅ Autenticación JWT segura

✅ Autorización por roles (USER, ADMIN)

✅ CRUD completo de usuarios, tipos de productos y productos

✅ Soft Delete para eliminaciones seguras

✅ Validación de datos robusta

✅ Base de datos PostgreSQL con TypeORM

✅ Relaciones entre entidades

✅ Documentación completa

🏗️ Estructura del Proyecto


src/
├── auth/                # Autenticación y autorización
├── users/               # Gestión de usuarios
├── tipo-productos/      # Categorías de productos
├── productos/           # Gestión de productos
└── common/              # Utilidades compartidas


🔐 AuthController (/api/v1/auth)

POST	/api/v1/auth/register	Registrar nuevo usuario	
POST	/api/v1/auth/login	Iniciar sesión (retorna JWT)
GET	/api/v1/auth/profile	Obtener perfil del usuario


👥 UsersController (/api/v1/users)

POST	/api/v1/users	Crear usuario nuevo	ADMIN
GET	/api/v1/users	Listar todos los usuarios	ADMIN
GET	/api/v1/users/:id	Obtener usuario por ID	ADMIN
PATCH	/api/v1/users/:id	Actualizar usuario	ADMIN
DELETE	/api/v1/users/:id	Eliminar usuario (soft delete)	ADMIN


📦 TipoProductosController (/api/v1/tipo-productos)

POST	/api/v1/tipo-productos	Crear tipo de producto	ADMIN
GET	/api/v1/tipo-productos	Listar todos los tipos	USER
GET	/api/v1/tipo-productos/:id	Obtener tipo por ID	USER
PATCH	/api/v1/tipo-productos/:id	Actualizar tipo de producto	ADMIN
DELETE	/api/v1/tipo-productos/:id	Eliminar tipo (soft delete)	ADMIN


🛍️ ProductosController (/api/v1/productos)

POST	/api/v1/productos	Crear producto	ADMIN
GET	/api/v1/productos	Listar todos los productos	USER
GET	/api/v1/productos/:id	Obtener producto por ID	USER
PATCH	/api/v1/productos/:id	Actualizar producto	ADMIN
DELETE	/api/v1/productos/:id	Eliminar producto (soft delete)	ADMIN


🚀 Ejecución
bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run start:dev

# Compilar y ejecutar en producción
npm run build
npm run start:prod

# Ejecutar tests
npm test