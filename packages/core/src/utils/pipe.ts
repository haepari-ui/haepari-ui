export const pipe = <T>(initialValue: T, functions: Array<(props: T) => T>) => {
  return functions.reduce(
    (currentValue, nextFunction) => nextFunction(currentValue),
    initialValue
  );
}
