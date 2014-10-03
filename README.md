*firefox-devtools* JPM helper module
====================================

Status: **proof-of-concept**

This small npm package can be used as a dependency in a Mozilla Firefox Add-on,
using the new *JPM* tool.

## Usage

In a Firefox Add-on created using the new *JPM* format (e.g. bootstraped using ```jpm init```
in an empty dir), install the npm dependency:

```js 
npm install rpl/firefox-devtools --save
```

Then you just need to add definition of your Firefox DevTool Add-on Panel in your own *package.json*
file (*url* and *icon* paths are relative to the data directory in the add-on *xpi*):

```js
{
  "name": "dev-panel",
  "title": "dev-panel",
  "description": "a basic add-on",
  "main": "lib/main.js",
  "author": "",
  "license": "MPL 2.0",
  "version": "0.1.0",
  "dependencies": {
     "firefox-devtools": "*"
  },
  "firefox-devtools": {
    "panels": {
      "repl": {
        "label": "REPL",
        "url": "repl-panel.html",
        "icon": "plane_64.png",
        "tooltip": "Firefox debugging protocol REPL",
        "RDP": true
      }
    }
  }
}
```

and in your addon-on code:

```js
var devtools = require("firefox-devtools");

devtools.registerAddonsFromManifest();
```
