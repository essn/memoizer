import test from 'ava';

import memoizer from '../memoizer';

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

test('singletonCache protects memoized resource from multiple calls', async (t) => {
  // eslint-disable-next-line functional/no-let
  let counter = 0;

  const protekted = (a, b) => {
    counter += 1;

    return a + b;
  };

  const memoizedProtekted = memoizer()(protekted);

  const aDecentAmountOfArguments = new Array(10).fill(1);

  await Promise.all(
    aDecentAmountOfArguments.map((i) => {
      return new Promise((resolve) => resolve(memoizedProtekted(i, i)));
    })
  );

  t.deepEqual(counter, 1);
});

test('singletonCache plays nice in a single thread', async (t) => {
  const adder = (a, b) => a + b;
  const memoizedAdder = memoizer()(adder);

  const aLotOfArguments = new Array(1000000).fill(1);

  await Promise.all(
    aLotOfArguments.reduce((promises, _, i) => {
      const memoizedValue = memoizedAdder(i, 1);
      promises.push(t.deepEqual(memoizedValue, i + 1));
      return promises;
    }, [])
  );
});
