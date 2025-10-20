CONTRIBUTING — Economic Radar

Este documento descreve como contribuir com o repositório e as convenções adotadas.

1. Preparação local

- Clone o repositório e instale dependências:

```bash
git clone https://github.com/joao-victor-fonseca/economic-radar.git
cd economic-radar
npm install
```

- Habilite os hooks do Husky (somente na primeira vez):

```bash
npx husky install
```

2. Branches e commits

- Crie branches com nomes claros: `feature/`, `fix/`, `chore/` ou `refactor/`.
- Commits pequenos e atômicos com mensagens no estilo Conventional Commits.
- Antes de commitar, formate e rode lint localmente:

```bash
npm run format
npm run lint:fix
```

3. Pull Requests

- Abra PRs pequenos (1 recurso por PR). Inclua no corpo do PR o que mudou e como testar.
- Marque reviewers e use a checklist de QA (testes rodando, lint ok, build local ok).

4. Testes

- Adicione testes unitários para novas funcionalidades e serviços.
- Execute a suíte de testes antes de abrir PR:

```bash
npm run test
```

5. Estilo de código

- Usamos ESLint + Prettier. O pre-commit roda `lint-staged` para aplicar formatação/lint nos arquivos staged.

6. Perguntas

- Se estiver com dúvidas sobre arquitetura ou alteração significativa, abra um draft PR e deixe uma descrição detalhada para discussão.
