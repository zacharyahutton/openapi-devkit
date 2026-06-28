# OpenAPI DevKit

> **Portfolio demonstration** — a minimal CLI that reads OpenAPI 3.x JSON and emits typed TypeScript fetch clients. Starter scaffold for learning code generation, not a full-featured codegen platform.

## Problem

Hand-writing fetch wrappers for coursework and contract APIs is slow and types drift from the spec. This tool demonstrates parsing an OpenAPI document and generating client stubs.

## Stack

- TypeScript · Node.js 20+ · OpenAPI 3 · Zod (planned) · CLI

## Quick start

```bash
npm install
npm run build
node dist/cli.js --input examples/petstore.json --output ./generated --dry-run
```

## Project structure

```
src/
  cli.ts          # CLI entry (--input, --output, --dry-run)
  parseSpec.ts    # OpenAPI JSON parser
  generate.ts     # TypeScript client emitter
examples/
  petstore.json   # Sample OpenAPI 3 spec
```

## Disclaimer

Linked from my [portfolio case study](https://github.com/zacharyahutton/portfolio). Full $ref resolution, Zod validators, and Postman export are described in the portfolio write-up; this repo is the honest starter slice.

## License

MIT
