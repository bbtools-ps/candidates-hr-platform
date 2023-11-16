export const debounce = <F extends (...args: any[]) => void>(
  callback: F,
  delay: number
) => {
  let timerId: ReturnType<typeof setTimeout>;

  return (...args: Parameters<F>) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};
