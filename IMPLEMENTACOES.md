# Implementações e próximos passos

Esta entrega adiciona modelos de domínio e um serviço de pontuação (score) baseado em métricas de cidades. Objetivos e artefatos:

Adicionado:
- `src/modules/score/types.ts` — tipos TypeScript para métricas de cidade e configuração de pesos.
- `src/modules/score/score.service.ts` — implementação do cálculo de score com normalização simples por componente.
- `pages/api/score.ts` — endpoint POST que recebe métricas e retorna o score calculado.
- `src/modules/score/score.service.spec.ts` — testes unitários básicos para o cálculo de score.

Recomendações e próximos passos:
- Migrar `prisma/schema.prisma` para tipos numéricos adequados (Int/Float/Decimal) para `population`, `pib`, `idh`.
- Implementar UI (dashboard) consumindo `POST /api/score` para visualizar comparativos e composição de score.
- Implementar persistência e versionamento de métricas (create/update city data) e integração com crawler/IBGE.
- Criar CI (GitHub Actions) para rodar tsc/lint/test automaticamente.

Boas práticas seguidas:
- TypeScript estrito e testes automatizados.
- Separação de responsabilidade: serviço de domínio desacoplado da API.
