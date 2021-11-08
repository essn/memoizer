# Memoizer

Simple, opinionated memoization written in Typescript.

## Usage

    import memoizer from 'memoizer';

    // Default configuration only memoizes one value
    const memoized = memoizer()(fn);

    // Memoize as many values as you like using an LRU caching strategy
    const memoized = memoizer(1)(fn);

## Installation

```bash
yarn install
```

### Running Tests

```bash
yarn test
````

Note: Sometimes `yarn fix` needs to be run before the test suite so tests do not fail on prettier checks.

### Viewing Test Coverage

```bash
yarn cov
```

## Guidelines
Design a memoization tool/framework/library meant to be used by client developers. You may use whatever language you'd like. Broad guidlines:


​
​- Consider ease of use

​
​Keep the ease of use of your tooling in mind. The clearer the path to using your library the less likely other developers are to introduce bugs while using it.
​

​- Plays nice with concurrency in a single thead (*has not been tested in a multi-threaded environment*)

​- Takes parameters into account

A call like:

```
doFoo(10)
```

​Should be memoized separately from:

```
​doFoo(99)
```

​- Avoid "thundering herd" problems
​

​If, say, 100 identical calls all come in at once, the memoized resource likely shouldn't have to absorb 100 requests.

​
​- Flexible and maintainable implementation
​

​- It's fine to look at existing implementations

### My Own Guidelines

I had wanted to do this in Elixir as it provided strong tooling to work in a multi-threaded environment, but I'm not very productive in Elixir quite yet. I opted to go with a language I'm stronger with (Typescript) but chose to work in a mostly functional paradigm to keep some Elixirish traits.

## Works Referenced

https://dev.to/thekashey/memoization-forget-me-bomb-34kh

I found this article particularly interesting on the fine line between memoization and caching. It influenced my choice to be strict about the cache size and default to only a single value.

## What now?

While the rabbit hole is definitely endless, if I were to continue working on this I'd focus on these:

### Key hashing

Currently I am using `JSON.stringify` as a one-size-fits-all approach to creating map keys. This works, but if we're only caching a simple value it's probably more performant to just use strict comparision rather than stringifying. Generating and comparing a string might be more costly than the original action in which case - why bother memoizing?

### Caching Strategies and Data Types

The two strategy approach is nice in that the configuration of the tool is dead simple - you have a limit to the cache size, or you have a single value. However, if the use requirements for the tool change it might, for example, be better to use an LFU cache instead of an LRU cache. If we move away from `JSON.stringify`, we could use a WeakMap instead of a Map, or any other number of data structures, that might improve general performance or use-case specific performance.

### Configuration

An optional secondary dictionary/object/hash (choose your terminology) argument to the `memoizer` function might allow for more flexibility. The limit and multiple item cache or no limit and single item cache configuration could be retained, but the ability to pass in a custom key hashing function, or a custom cache strategy would be nice. Additionally, the tool could be extended with some defaults so the client developer isn't required to roll their own configuration and can choose from documented set of default configurations.

### Higher Order Functions / Factories

Both caches look pretty similar - abstracting them into a higher order function or factory would allow for easier extension and customization. Also, when testing, checking the order and contents of the cache is tricky. An approach like this would allow for easier injection of spies or mocks.

### Multi-Threading?
Maybe.