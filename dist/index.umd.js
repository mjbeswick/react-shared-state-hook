!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t||self).sharedStateHooks={})}(this,function(t){t.createSharedRef=function(t){var e={current:t};return function(){return e}},t.createSharedState=function(t,e){var n=function(t){var e={};return e.state="function"==typeof t?t():t,e.listeners=[],e.setState=function(t){return function(e){e!==t.state&&(t.state=e,t.listeners.forEach(function(e){e(t.state)}))}}(e),e}(e);return function(t,e){return function(){var n=t.useState()[1];return t.useEffect(function(){return e.listeners.push(n),function(){e.listeners=e.listeners.filter(function(t){return t!==n})}},[]),[e.state,e.setState]}}(t,n)}});
//# sourceMappingURL=index.umd.js.map