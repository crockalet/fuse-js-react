import Fuse from "fuse.js";
import { DotNestedPath } from "./util/DotNestedPath";
import { FuseCustomKey } from "./FuseCustomKey";
import { Dictionary } from "lodash";

export interface UseFuseOptions<
  T = any,
  TCustomKeys extends Dictionary<any> = {}
> extends Omit<Fuse.IFuseOptions<T>, "keys"> {
  keys?: DotNestedPath<T>[] | { name: DotNestedPath<T>; weight?: number }[];
  customKeys?: FuseCustomKey<T, Extract<keyof TCustomKeys, string>>[];
  returnAllWhenEmpty?: boolean;
}
