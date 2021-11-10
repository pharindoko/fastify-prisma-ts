import { FastifyInstance } from "fastify";
import { createUser } from "./user.service";
import { UserType, UserRef } from "./user.schema";

export function setupRoutes(server: FastifyInstance, options: any, next: any) {
  server.post<{ Body: UserType; Reply: UserType }>(
    "/user",
    {
      schema: {
        body: UserRef,
        response: {
          200: UserRef,
        },
      },
    },
    (req, rep) => {
      createUser(
        { name: req.body.name, mail: req.body.mail!, foo: req.body.foo! },
        rep
      );
      req.log.info("Some info about the current request");
      rep.status(200).send(req.body);
    }
  );

  next();
}
