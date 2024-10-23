const useDebounce = (func: Function, delay: number = 300) => {
  let timeout: any;
  return function (...args: any[]) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export default useDebounce;
