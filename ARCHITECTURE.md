ARCHITECTURE — Economic Radar

Visão rápida da arquitetura proposta e convenções de pasta.

Padrões principais

- Separação em camadas: Controller (rotas API) → Service (validação + regras) → Repository (acesso a dados).
- Validação de entrada com Zod em `src/modules/<domain>/schema.ts`.
- Repositórios isolam dependência do Prisma para facilitar mocks em testes.
- Handlers de API finos: parse, auth, chamar service, retornar resposta.

Estrutura recomendada de pastas

src/
modules/
city/
schema.ts # zod schemas
service.ts # regras de negócio e validação
repository.ts # prisma calls
user/
...
lib/
prisma.ts # prisma singleton

Regras de migração por domínio

1. Criar `src/modules/<domain>` com `schema.ts`, `service.ts`, `repository.ts`.
2. Migrar a lógica do handler (pages/api/...) para chamar as funções do `service`.
3. Adicionar testes unitários para `service` e `repository` usando mocks do Prisma.
4. Abrir PR por domínio, rodar testes e linters antes de pedir revisão.

Boas práticas

- Evite `any`; prefira tipos explícitos e zod para validação de entrada.
- Escreva testes para regras de negócio no `service`.
- Use commits atômicos e mensagens descritivas.

Se quiser, posso gerar um checklist de migração automático (script) que auxilie mover handlers para services/repos.
