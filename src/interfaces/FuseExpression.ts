import { DotNestedPath } from "./util/DotNestedPath";

export type FuseExpression<T, TCustomKeys extends string> =
  | { [key in DotNestedPath<T> | TCustomKeys]?: string }
  | { [key in "$and" | "$or"]?: FuseExpression<T, TCustomKeys>[] };
