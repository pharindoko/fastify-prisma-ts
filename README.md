# Fastify-Prisma-Typescript-Starter

This is a starter using:

- Fastify 3 with Typescript
- Fastify-Swagger with Openapi 3.0
- Typebox
- Prisma 2
- Postgresql

## Requirements

Docker / Docker-Compose

### Build

```bash
make build
```

### Start

```bash
make start
```

## Known Issues

- currently TypeRefs for Typebox are experimental, but I wanted to have this to support reference for schemas instead of using inline schemas.
- fastify-swagger is missing the typing for refResolver - I extended the interface to circumvent this issue (https://github.com/fastify/fastify-swagger/issues/501)
