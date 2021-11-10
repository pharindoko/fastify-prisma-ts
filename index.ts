import fastify from "fastify";
import * as user from "./modules/user/user.controller";
import { UserObject } from "./modules/user/user.schema";
import fastifySwagger, { FastifyDynamicSwaggerOptions } from "fastify-swagger";
import helmet from "fastify-helmet";
import fastifySensible from "fastify-sensible";

const server = fastify({
  logger: true,
});

server.addSchema(UserObject);

export interface FastifyDynamicSwaggerExtendedOptions
  extends FastifyDynamicSwaggerOptions {
  refResolver?: Object;
}
const fastifySwaggerExtendedOptions: FastifyDynamicSwaggerExtendedOptions = {
  routePrefix: "/documentation",
  // @ts-ignore
  refResolver: {
    buildLocalReference(json: any) {
      return json.$id;
    },
  },
  openapi: {
    info: {
      title: "Test swagger",
      description: "testing the fastify swagger api",
      version: "0.1.0",
    },
    servers: [
      {
        url: "http://localhost:8080",
      },
    ],
  },
  uiConfig: {
    docExpansion: "full",
    deepLinking: false,
  },
  staticCSP: true,
  exposeRoute: true,
};

server.register(fastifySwagger, fastifySwaggerExtendedOptions);
server.register(helmet);
server.register(fastifySensible);

server.get("/ping", async (request, reply) => {
  request.log.info("pong");
  return "pong\n";
});
server.register(user.setupRoutes);

server.listen(8080, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
