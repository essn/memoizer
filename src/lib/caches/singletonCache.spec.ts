import test from 'ava';

import memoizer from '../../memoizer';

test('singletonCache only ever stores one value', (t) => {
  const adder = (a, b) => a + b;
  const memoizedAdder = memoizer()(adder);

  const memoizedValue1Take1 = memoizedAdder(1, 2);
  t.deepEqual(memoizedValue1Take1, 3);

  const memoizedValue1Take2 = memoizedAdder(1, 2);
  t.deepEqual(memoizedValue1Take2, 3);

  const memoizedValue2Take1 = memoizedAdder(1, 3);
  t.deepEqual(memoizedValue2Take1, 4);

  const memoizedValue2Take2 = memoizedAdder(1, 3);
  t.deepEqual(memoizedValue2Take2, 4);
});
