#rewire-global

[![Build Status](https://travis-ci.org/TheSavior/rewire-global.svg)](https://travis-ci.org/TheSavior/rewire-global)
[![devDependency Status](https://david-dm.org/TheSavior/rewire-global.svg)](https://david-dm.org/TheSavior/rewire-global#info=devDependencies)
[![devDependency Status](https://david-dm.org/TheSavior/rewire-global/dev-status.svg)](https://david-dm.org/TheSavior/rewire-global#info=devDependencies)

Hook [rewire](https://github.com/jhnns/rewire) into every required package.

## Installation

```sh
$ npm install rewire-global --save-dev
```

## Usage
```
require('rewire-global').enable();

var myModule = require('./my-module');
var myFunc = myModule.__get__('myFunc');
```
