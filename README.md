# Jobfinder Api

`Jobfinder Api` es el backend para el proyecto `Jobfinder App`.

## Características

-   Endpoints para Ofertas de Trabajo.
-   Endpoints para Sectores.
-   Endpoints para Habilidades.
-   Endpoints para Usuarios.
-   Endpoints para Autenticación de Usuarios.
-   Validación de Data y Token a través de middlewares.
-   Endpoints protegidos con JSON Web Tokens.
-   Modelos y Base de Datos en Postgres.
-   ORM de Base de Datos: Sequelize.
-   Envío de Notificaciones por Email.

## Propósito del Proyecto

-   Este proyecto fue desarrollado para aplicar y practicar las tecnologías de back-end que se muestran a continuación.

## Tech Stack

-   Javascript.
-   NodeJS.
-   ExpressJS.
-   Postgres.
-   Sequelize.

## Herramientas de Desarrollo y Otras Tecnologías

-   [Axios](https://www.npmjs.com/package/axios)
-   [Babel](https://babeljs.io/)
-   [Bcryptjs](https://www.npmjs.com/package/bcryptjs)
-   [Chalk](https://www.npmjs.com/package/chalk)
-   [Cloudinary](https://cloudinary.com/)
-   [Cors](https://www.npmjs.com/package/cors)
-   [Dotenv](https://www.npmjs.com/package/dotenv)
-   [ExpressJS](https://expressjs.com/)
-   [Express Validator](https://express-validator.github.io/docs/)
-   [Json Web Token](https://jwt.io/)
-   [Nodejs](https://nodejs.org/en/)
-   [Nodemailer](https://nodemailer.com/about/)
-   [Nodemon](https://www.npmjs.com/package/nodemon)
-   [Morgan](https://www.npmjs.com/package/morgan)
-   [Postgres](https://www.postgresql.org/)
-   [Sequelize v6.9](https://sequelize.org/v6/)
-   [Vscode](https://code.visualstudio.com/)

## Demo Jobfinder app

-   [Jobfinder App](https://jobfinder-app-njca.netlify.app/)

## Repo Jobfinder app

-   [Jobfinder app](https://github.com/nca1478/job-finder-app)

## Requerimientos

-   Nodejs v14 o superior.
-   Express v4 o superior.
-   Sequelize v6.9.
-   PostgreSQL 14
-   Sequelize v6.9

## Instalación de Api y Base de Datos

## Configuración de Variables de entorno

-   Renombrar .env.example a .env.
-   Agregar las credenciales al .env.
-   Nota: al ejecutar la primera vez, DBSYNC=true
-   Luego colocar DBSYNC=false

## Opción 1: Ejecutar Api, Crear DB (dev)

-   Ejecutar el comando: `docker compose up --build -d`
-   Para eliminar: `docker compose down --volumes`

## Opción 2: Ejecutar Api (prod)

-   Ejecutar el comando: `docker compose -f docker-compose.prod.yml up --build -d`

## Archivo de entrada

> src/app.js
