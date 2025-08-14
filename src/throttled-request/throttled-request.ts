export const throttledRequest = <T extends (...args: any[]) => Promise<any>>(
  requestFn: T,
  time = 0,
) => {
  return async (...args: Parameters<T>): Promise<ReturnType<T>> => {
    const startTS = Date.now();
    const res: ReturnType<T> = await requestFn(...args);
    const endTS = Date.now();

    const diff = endTS - startTS;

    if (diff < time) {
      await new Promise((resolve) => setTimeout(resolve, time - diff));
    }

    return Promise.resolve(res);
  };
};
