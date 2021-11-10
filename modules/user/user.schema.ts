import { Static, TLiteral, TUnion, Type } from "@sinclair/typebox";

type IntoStringUnion<T> = {
  [K in keyof T]: T[K] extends string ? TLiteral<T[K]> : never;
};

function StringUnion<T extends string[]>(
  values: [...T]
): TUnion<IntoStringUnion<T>> {
  return { enum: values } as any;
}

const T = StringUnion(["A", "B", "C"]);

type T = Static<typeof T>;

export const UserObject = Type.Object(
  {
    name: Type.String(),
    mail: Type.Optional(Type.String({ format: "email" })),
    foo: Type.Optional(Type.String(T)),
  },
  { $id: "UserObject" }
);

export const UserRef = Type.Ref(UserObject);
export type UserType = Static<typeof UserRef>;
