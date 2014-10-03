const self = require('sdk/self');
const { Class } = require("sdk/core/heritage");

// pick the Firefox DevTools add-on components defined in the add-on package.json
exports.registerAddonsFromManifest = function() {
  let { "firefox-devtools": devtoolAddonConfig } = require("package.json");

  /* process defined devtools panels */

  const { Panel } = require("dev/panel");

  let { panels } = devtoolAddonConfig;

  let panelClassesByName = Object.keys(panels)
    .reduce((acc, panelName) => {
      let cfg = panels[panelName];

      let panelDef = {
        extends: Panel,
        label: cfg.label,
        tooltip: cfg.tooltip,
        icon: !!cfg.icon ? self.data.url(cfg.icon) : null,
        url: self.data.url(cfg.url)
      };

      if (cfg.RDP) {
        panelDef.setup = function(options) { this.debuggee = options.debuggee; };
        panelDef.dispose = function(options) { this.debuggee = null; };
        panelDef.onReady = function() {
          this.debuggee.start();
          this.postMessage("RDP", [ this.debuggee ]);
        };
      }

      acc[panelName] = Class(panelDef);

      return acc;
    }, {});

  /* auto-install the defined devtools panels */

  const { Tool } = require("dev/toolbox");

  const devToolsAddons = new Tool({
    panels: panelClassesByName
  });
};
