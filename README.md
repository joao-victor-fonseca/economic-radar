<h1 align="center" style="color:white;" >🚀 Economic Radar 🚀</h1>

<div align="center">
    <img src="https://img.shields.io/badge/-TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/-Next.js-A020F0?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/-Docker-0db7ed?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
    <img src="https://img.shields.io/badge/-PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
    <img src="https://img.shields.io/badge/-Prisma-3982CE?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma" />
    <img src="https://img.shields.io/badge/-Jest-15b4f1?style=for-the-badge&logo=jest&logoColor=white" alt="Jest" />
</div>

---

## 📋 Índice

1. [⚙️ Stack de Tecnologias](#tech-stack)
2. [🤸 Início Rápido](#quick-start)
3. [🧪 Testes Unitários](#unit-tests)

---

## <a name="tech-stack">⚙️ Stack de Tecnologias</a>

- **Next.js** - Renderização no lado do servidor e geração de páginas estáticas
- **TypeScript** - JavaScript tipado para melhor qualidade de código
- **Tailwind CSS** - Framework CSS utilitário
- **Docker** - Ambientes containerizados
- **PostgreSQL** - Sistema de gerenciamento de banco de dados relacional
- **Prisma** - ORM de próxima geração
- **Jest** - Framework de testes JavaScript para garantir a qualidade do código

---

## <a name="quick-start">🤸 Início Rápido</a>

Siga estas etapas para configurar o projeto localmente em sua máquina.

### Pré-requisitos

Certifique-se de que os seguintes itens estejam instalados em sua máquina:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/)

### Clonando o Repositório

```bash
git clone https://github.com/joao-victor-fonseca/economic-radar.git
cd economic-radar

```


### Baixar baixar dependências

```bash
npm install

```

### Migrações de banco de dados:

Depois que os contêineres estiverem em execução, pode ser necessário executar migrações do Prisma com o seguinte comando:

```bash
npx prisma migrate dev
```

## 🎉 Pronto!

É isso! O projeto agora deve estar sendo executado localmente com Docker.

## <a name="unit-tests">🧪 Testes Unitários</a>

Este projeto está configurado para rodar testes unitários utilizando o framework Jest, que garante a qualidade do código e a robustez da aplicação. Os testes são executados para validar o comportamento de várias partes do sistema, garantindo que as funcionalidades estão funcionando corretamente e que possíveis erros sejam detectados durante o desenvolvimento.

Executando os Testes
Para rodar os testes unitários, basta usar o seguinte comando:


```bash
npm run test
```

## Exemplo de Testes

Os testes são organizados para cobrir funcionalidades críticas do sistema, como:

- **Criação de cidades através da API**: Testa se a API consegue criar uma nova cidade e retornar os dados corretos.
- **Verificação de erros no processo de criação**: Testa se erros são corretamente retornados, como quando o Prisma falha ao tentar salvar no banco de dados.
- **Validação de respostas para métodos HTTP não permitidos**: Testa se a API retorna o status de erro apropriado quando um método HTTP não permitido (como `GET` em uma rota que só permite `POST`) é chamado.
- **Verificação de respostas para cidade não encontrada**: Testa se a API retorna o código `404` corretamente quando a cidade solicitada não é encontrada no banco de dados.
- **Simulação de falhas internas**: Testa se a API retorna o código de erro `500` em caso de falha ao tentar acessar ou processar dados da cidade.

### Mocks e Simulações

Os testes são realizados com **mocks** para garantir que as dependências externas, como o banco de dados, não sejam necessárias durante a execução dos testes. Isso permite simular o comportamento da API sem precisar interagir com uma base de dados real.

### Como Funciona

- Utilizamos o **Jest** para os testes unitários e de integração.
- **Mocks do Prisma**: Simulamos chamadas ao banco de dados com mocks do Prisma para evitar interações com o banco real.
- **Cobertura de testes**: A cobertura de testes é aplicada a todas as rotas principais da API, garantindo que os comportamentos críticos do sistema sejam validados corretamente.


