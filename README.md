# Libgames Server API

This API is for a game platform where you can create, update and delete users, games, profiles, etc. It uses Postgresql as database and Prisma to manipulate it.

## Prerequisites

> - **Node** - [Node Download](https://nodejs.org/pt-br/download/)
> - **NPM** - [Npm Download](https://www.npmjs.com/package/download)

## Installation

> Clone this project on your computer with command:
>
> ```
> 	git clone https://github.com/dalima-dev/libgames.git
> ```
>
> Access project's folder on your terminal:
>
> ```
> 	cd [Project's name]
> ```
>
> Do command:
>
> ```
> 	npm install
> ```
>
> Turn on your database server and fill the environment variables, as example below:
>
> ```
> 	DATABASE_URL="postgresql://postgres:root@localhost:5432/libgames?schema=public"
>         JWT_SECRET="pehVFlLgL7"
> ```
>
> Finally, generate the prisma models into your postgresql database with command:
>
> ```
>   npx prisma db push
> ```

## Execution

> After following steps above, run:
>
> ```
> 	npm start
> ```
>
> Now application is available to use. Access http://localhost:3000/api for swagger docs.

## Links

> - [NestJS Docs](https://docs.nestjs.com/)
> - [Prisma Docs](https://www.prisma.io/docs/)

## License

> Do What The F\*ck You Want To Public License (WTFPL)
