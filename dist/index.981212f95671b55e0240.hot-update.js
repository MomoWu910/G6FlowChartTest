"use strict";
self["webpackHotUpdateG6Test"]("index",{

/***/ "./index.ts":
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const g6_1 = __webpack_require__(/*! @antv/g6 */ "./node_modules/@antv/g6/es/index.js");
const data = {
    nodes: [
        {
            id: 'node1',
            label: 'Circle1',
            x: 150,
            y: 150,
        },
        {
            id: 'node2',
            label: 'Circle2',
            x: 400,
            y: 150,
        },
    ],
    edges: [
        {
            source: 'node1',
            target: 'node2',
        },
    ],
};
const graph = new g6_1.default.Graph({
    container: 'container',
    width: 500,
    height: 500,
    defaultNode: {
        type: 'circle',
        size: [100],
        color: '#5B8FF9',
        style: {
            fill: '#9EC9FF',
            lineWidth: 3,
        },
        labelCfg: {
            style: {
                fill: '#fff',
                fontSize: 20,
            },
        },
    },
    defaultEdge: {
        style: {
            stroke: '#e2e2e2',
        },
    },
});
graph.data(data);
graph.render();


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("ac88f03eee679f277f4c")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=index.981212f95671b55e0240.hot-update.js.map