# OpenAPI DevKit

OpenAPI DevKit is a **portfolio demonstration** Node.js CLI that reads OpenAPI 3.x JSON and either lists endpoints or emits TypeScript interface stubs plus thin `fetch` client functions. It shows how spec-driven codegen can reduce hand-written API glue. This is not a full codegen platform (no `$ref` resolution, Zod, or Postman export in this repo).

## Stack

- TypeScript, Node.js 20+
- OpenAPI 3.x JSON
- CLI flags: `--input`, `--output`, `--dry-run`, `--list-endpoints`

## Prerequisites

- Node.js 20 or newer
- npm

## Setup

```bash
git clone https://github.com/zacharyahutton/openapi-devkit.git
cd openapi-devkit
npm install
npm run build
```

## How to run

List operations from the sample spec:

```bash
node dist/cli.js --input examples/petstore.json --list-endpoints
```

Sample output:

```
GET    /pets  (listPets)
POST   /pets  (createPet)
GET    /pets/{id}  (getPet)
```

Generate a client file:

```bash
node dist/cli.js --input examples/petstore.json --output generated/client.ts
```

Dry-run (print preview without writing):

```bash
node dist/cli.js --input examples/petstore.json --output generated/client.ts --dry-run
```

Development without build step:

```bash
npm run dev -- --input examples/petstore.json --list-endpoints
```

## How to test

```bash
npm run build
node dist/cli.js --input examples/petstore.json --list-endpoints
node dist/cli.js --input examples/petstore.json --output generated/client.ts --dry-run
```

Confirm `generated/client.ts` contains `export interface Pet` and `listPets` after a non-dry run.

## Example spec

See `examples/petstore.json` — a minimal OpenAPI 3 document with paths and a `Pet` schema under `components.schemas`.

## Project structure

```
src/
  cli.ts          CLI entry
  parseSpec.ts    Parse paths and list operations
  generate.ts     Interface + fetch client emitters
examples/
  petstore.json   Sample OpenAPI document
generated/        Output directory (created by CLI)
```

## Portfolio disclaimer

Supports the [OpenAPI DevKit case study](https://github.com/zacharyahutton/portfolio). The case study describes Zod validators, `$ref` resolution, and Postman collections; **this repository is the runnable starter** that honestly documents what is implemented today.

## Future improvements

- Resolve `$ref` in `components.schemas`
- Emit Zod validators alongside TypeScript types
- Postman v2.1 collection export
- Support YAML specs

## License

MIT
