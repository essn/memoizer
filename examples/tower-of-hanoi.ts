import memoizer from '../src';

const hanoi = (disc, src, aux, dst) => {
  if (disc > 0) {
    hanoi(disc - 1, src, dst, aux);
    hanoi(disc - 1, aux, src, dst);
  }
};

console.log('Tower of Hanoi without memoizer...');

console.time('unMemoizedHanoi');

hanoi(3, 'Src', 'Aux', 'Dst');

console.timeEnd('unMemoizedHanoi');

const fastHanoi = memoizer()(hanoi);

console.log('Tower of Hanoi with memoizer...');

console.time('memoizedHanoi');

fastHanoi(3, 'Src', 'Aux', 'Dst');

console.timeEnd('memoizedHanoi');
