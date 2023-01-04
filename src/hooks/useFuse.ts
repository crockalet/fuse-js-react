import Fuse from "fuse.js";
import { UseFuseOptions } from "../interfaces/UseFuseOptions";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Dictionary, merge } from "lodash";
import { FuseExpression } from "../interfaces/FuseExpression";

const defaultOptions: UseFuseOptions = { returnAllWhenEmpty: true };

export function useFuse<T, TCustomKeys extends Dictionary<any>>(
  data: T[],
  options?: UseFuseOptions<T, TCustomKeys>
) {
  const {
    returnAllWhenEmpty,
    keys: _keys,
    customKeys,
    ...fuseOptions
  } = merge<any, any>(defaultOptions, options);

  const keys = useMemo(() => merge(_keys, customKeys), [_keys, customKeys]);

  const index = useMemo(() => Fuse.createIndex(keys, data), [keys, data]);
  const fuse = useRef(new Fuse<T>(data, { ...fuseOptions, keys }, index));

  const [results, setResults] = useState<Fuse.FuseResult<T>[]>(
    // @ts-ignore
    fuse.current._docs
  );

  useEffect(() => {
    fuse.current.setCollection(data, index);
  }, [index]);

  const search = useCallback(
    (
      pattern?: string | FuseExpression<T, Extract<keyof TCustomKeys, string>>,
      options?: Fuse.FuseSearchOptions
    ) =>
      !pattern
        ? // @ts-ignore
          setResults(returnAllWhenEmpty ? fuse.current._docs : [])
        : setResults(fuse.current.search(pattern, options)),
    []
  );

  return { data: results, search, fuse: fuse.current };
}
