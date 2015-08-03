# dom-inserted

[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

> Listen for DOM node insertion, see http://davidwalsh.name/detect-node-insertion

## Usage

`npm i dom-inserted`

[![NPM](https://nodei.co/npm/dom-inserted.png?downloads=true)](https://www.npmjs.com/package/dom-inserted)

```js
var domInserted = require('dom-inserted');

// Listen for elements that have a .inserted class
domInserted.listen();

// Listen for elements that have a .custom class
domInserted.listen('custom')

document.addEventListener('inserted', onInserted, false);

function onInserted(ev){
    // ev.details contains: {animationName: ..., insertedElement: ...}
    var evDetails = ev.details;
}
```
## Standalone

You will need to have [node][node] setup on your machine.

Then you can install dependencies and build:

```js
npm i && npm run build
```

That will output the built distributables to `./build`.

[node]:       http://nodejs.org/

## Licence

MIT, see [LICENSE.md](http://github.com/stbaer/dom-inserted/blob/master/LICENSE.md) for details.
