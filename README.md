# API de Gestión de Usuarios y Componentes

Esta API proporciona funcionalidades para la gestión de usuarios y componentes de un sistema. Permite realizar operaciones como registrar nuevos usuarios, obtener detalles de usuarios existentes, modificar información de usuarios, listar componentes asociados a un usuario, crear nuevos componentes, y más.

## Funcionalidades Principales

### Usuarios

- **Listar Usuarios:** Obtén una lista de usuarios registrados. Puedes filtrar los resultados según diversos parámetros como nombre de usuario, dirección, teléfono, correo electrónico, contraseña y perfil.
  
- **Obtener Usuario por ID:** Consulta detalles específicos de un usuario proporcionando su ID.

- **Registrar Usuario:** Registra un nuevo usuario con información obligatoria como nombre de usuario, dirección, correo electrónico, contraseña y teléfono.

- **Modificar Usuario:** Actualiza la información de un usuario existente proporcionando su ID. Puedes modificar propiedades como nombre de usuario, dirección, correo electrónico, contraseña, teléfono y perfil.

- **Eliminar Usuario:** Elimina un usuario específico según su ID.

### Componentes

- **Listar Componentes de Usuario:** Obtiene la lista de componentes asociados a un usuario específico.

- **Obtener Detalles de Componente:** Consulta detalles específicos de un componente asociado a un usuario.

- **Crear Componente:** Registra un nuevo componente asociado a un usuario. Debes proporcionar detalles como nombre, cantidad, precio y descripción.

- **Modificar Componente:** Actualiza la información de un componente existente asociado a un usuario. Puedes modificar propiedades como nombre, cantidad, precio y descripción.

- **Eliminar Componente:** Elimina un componente específico asociado a un usuario.

## Uso

- **Rutas API de Usuarios:** `/api/users`
  - Listar Usuarios: `GET /api/users`
  - Obtener Usuario por ID: `GET /api/users/:id`
  - Registrar Usuario: `POST /api/users`
  - Modificar Usuario: `PUT /api/users/:id`
  - Eliminar Usuario: `DELETE /api/users/:id`

- **Rutas API de Componentes:** `/api/components`
  - Listar Componentes de Usuario: `GET /api/components/user/:id`
  - Obtener Detalles de Componente: `GET /api/components/:user_id/component/:component_id`
  - Crear Componente: `POST /api/components/:user_id`
  - Modificar Componente: `PUT /api/components/:user_id/component/:component_id`
  - Eliminar Componente: `DELETE /api/components/:user_id/component/:component_id`
