import memoizer from '../src';

const fib = (n: number): number => {
  if (n < 2) {
    return n;
  }
  return fib(n - 1) + fib(n - 2);
};

console.log(
  'Summing the first 10 digits of the Fibonacci Sequence without memoizer...'
);

console.time('unMemoizedFib');

fib(10);

console.timeEnd('unMemoizedFib');

const fastFib = memoizer()(fib);

console.log(
  'Summing the first 10 digits of the Fibonacci Sequence with memoizer...'
);

console.time('memoizedFib');

fastFib(10);

console.timeEnd('memoizedFib');
