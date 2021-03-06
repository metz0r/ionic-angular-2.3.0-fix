(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    /**
     * @param {?} element
     * @return {?}
     */
    function indexForItem(element) {
        return element['$ionIndex'];
    }
    exports.indexForItem = indexForItem;
    /**
     * @param {?} element
     * @return {?}
     */
    function reorderListForItem(element) {
        return element['$ionReorderList'];
    }
    exports.reorderListForItem = reorderListForItem;
    /**
     * @param {?} node
     * @param {?} listNode
     * @return {?}
     */
    function findReorderItem(node, listNode) {
        var /** @type {?} */ nested = 0;
        while (node && nested < 4) {
            if (indexForItem(node) !== undefined) {
                if (listNode && node.parentNode !== listNode) {
                    return null;
                }
                return node;
            }
            node = node.parentNode;
            nested++;
        }
        return null;
    }
    exports.findReorderItem = findReorderItem;
});
//# sourceMappingURL=item-reorder-util.js.map