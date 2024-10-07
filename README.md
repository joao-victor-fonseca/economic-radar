<h1 align="center" style="color:white;" >🚀 Economic Radar 🚀</h1>

<div align="center">
    <img src="https://img.shields.io/badge/-TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/-Next.js-A020F0?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/-Docker-0db7ed?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
    <img src="https://img.shields.io/badge/-PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
    <img src="https://img.shields.io/badge/-Prisma-3982CE?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma" />
</div>

---

## 📋 Table of Contents

1. [⚙️ Tech Stack](#tech-stack)
2. [🤸 Quick Start](#quick-start)
3. [🐳 Docker Setup](#docker-setup)

---

## <a name="tech-stack">⚙️ Tech Stack</a>

- **Next.js** - Server-side rendering and static generation
- **TypeScript** - Typed JavaScript for better code quality
- **Tailwind CSS** - Utility-first CSS framework
- **Docker** - Containerized environments
- **PostgreSQL** - Relational database management system
- **Prisma** - Next-generation ORM

---

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

### Prerequisites

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/)

### Cloning the Repository

```bash
git clone https://github.com/joao-victor-fonseca/economic-radar.git
cd economic-radar
```

Open http://localhost:3000 in your browser to view the project.

## <a name="docker-setup">🐳 Docker Setup</a>

To run the project using Docker, follow these steps:

### Build the Docker containers:

Run the following command to build the containers defined in the `docker-compose.yml` file:

```bash
docker-compose up --build
```

### Access the application:

Once the build is complete, the application will be accessible at [http://localhost:3000](http://localhost:3000).

### Stop the containers:

To stop the Docker containers, run the following command:

```bash
docker-compose down
```

### Database migrations:

After the containers are running, you may need to run Prisma migrations with the following command:

```bash
npx prisma migrate dev
```

## 🎉 Done!

That's it! The project should now be running locally with Docker.
