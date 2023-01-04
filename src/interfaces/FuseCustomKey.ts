export type FuseCustomKey<T, TName extends string> = {
  name: TName;
  weight?: number;
  getFn: (obj: T) => string | string[];
};
