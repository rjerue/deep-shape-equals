# deep-shape-equals

`deep-shape-equals` is a library that allows you to see if two or more objects have the same shape. Meaning, the keys that they have are the same.

## Why?

I needed an effective way to check the shape of API calls. I didn't care what the actual data was, just that keys to the objects and that their types matched what I had from another set. One can use this library to see if an object has the same keys

## Getting started

```js
import { areObjectsSameShape } from 'deep-shape-equals';

const basic = {
  a: 1,
  b: 'Ryan',
};

const basicCompliment = {
  a: 2,
  b: 'Jerue',
};

const bad = { ...basic, a: 'hello' };

const isTrue = areObjectsSameShape([basic, basicCompliment]);

const isFalse = areObjectsSameShape([basic, bad]); //because a is a string in one object, but not the other
```

## Advanced

There is a second argument called `ignoreArrayOrder`. See the following below tests to see how this works. This is `false` by default.

```js
// positive case
() => {
  const left = { ...basic, array: [1, '2', true] };
  const right = { ...basicCompliment, array: ['2', 11, false] }; //array position ignored, only checks if all types are satisfied
  expect(areObjectsSameShape([left, right], true)).toEqual(true);
};

//negative case
() => {
  const left = { ...basic, array: ['1', 2, true] };
  const right = { ...basicCompliment, array: [11, '22', false] }; //the number here is in the first array position
  expect(areObjectsSameShape([left, right], false)).toEqual(false);
};
```

## TSDX Bootstrap

This project was bootstrapped with [TSDX](https://github.com/jaredpalmer/tsdx).

## Local Development

Below is a list of commands you will probably find useful.

### `npm start` or `yarn start`

Runs the project in development/watch mode. Your project will be rebuilt upon changes. TSDX has a special logger for you convenience. Error messages are pretty printed and formatted for compatibility VS Code's Problems tab.

<img src="https://user-images.githubusercontent.com/4060187/52168303-574d3a00-26f6-11e9-9f3b-71dbec9ebfcb.gif" width="600" />

Your library will be rebuilt if you make edits.

### `npm run build` or `yarn build`

Bundles the package to the `dist` folder.
The package is optimized and bundled with Rollup into multiple formats (CommonJS, UMD, and ES Module).

<img src="https://user-images.githubusercontent.com/4060187/52168322-a98e5b00-26f6-11e9-8cf6-222d716b75ef.gif" width="600" />

### `npm test` or `yarn test`

Runs the test watcher (Jest) in an interactive mode.
By default, runs tests related to files changed since the last commit.
