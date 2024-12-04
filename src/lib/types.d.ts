type DataAttributes<T> = {
  [K in keyof T as `data-${K}`]: T[K];
};
