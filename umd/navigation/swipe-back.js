var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '../util/util', '../gestures/gesture-controller', '../gestures/slide-edge-gesture'], factory);
    }
})(function (require, exports) {
    "use strict";
    var util_1 = require('../util/util');
    var gesture_controller_1 = require('../gestures/gesture-controller');
    var slide_edge_gesture_1 = require('../gestures/slide-edge-gesture');
    var SwipeBackGesture = (function (_super) {
        __extends(SwipeBackGesture, _super);
        /**
         * @param {?} plt
         * @param {?} _nav
         * @param {?} gestureCtlr
         * @param {?} domCtrl
         */
        function SwipeBackGesture(plt, _nav, gestureCtlr, domCtrl) {
            _super.call(this, plt, plt.doc().body, {
                direction: 'x',
                edge: 'left',
                maxEdgeStart: 75,
                threshold: 5,
                zone: false,
                domController: domCtrl,
                gesture: gestureCtlr.createGesture({
                    name: gesture_controller_1.GESTURE_GO_BACK_SWIPE,
                    priority: 20 /* GoBackSwipe */,
                    disableScroll: true
                })
            });
            this._nav = _nav;
        }
        /**
         * @param {?} ev
         * @return {?}
         */
        SwipeBackGesture.prototype.canStart = function (ev) {
            // the gesture swipe angle must be mainly horizontal and the
            // gesture distance would be relatively short for a swipe back
            // and swipe back must be possible on this nav controller
            return (this._nav.canSwipeBack() &&
                _super.prototype.canStart.call(this, ev));
        };
        /**
         * @param {?} ev
         * @return {?}
         */
        SwipeBackGesture.prototype.onSlideBeforeStart = function (ev) {
            this._nav.swipeBackStart();
        };
        /**
         * @param {?} slide
         * @param {?} ev
         * @return {?}
         */
        SwipeBackGesture.prototype.onSlide = function (slide, ev) {
            ev.preventDefault();
            ev.stopPropagation();
            var /** @type {?} */ stepValue = (slide.distance / slide.max);
            this._nav.swipeBackProgress(stepValue);
        };
        /**
         * @param {?} slide
         * @param {?} ev
         * @return {?}
         */
        SwipeBackGesture.prototype.onSlideEnd = function (slide, ev) {
            var /** @type {?} */ velocity = slide.velocity;
            var /** @type {?} */ currentStepValue = (slide.distance / slide.max);
            var /** @type {?} */ isResetDirecction = velocity < 0;
            var /** @type {?} */ isMovingFast = Math.abs(slide.velocity) > 0.4;
            var /** @type {?} */ isInResetZone = Math.abs(slide.delta) < Math.abs(slide.max) * 0.5;
            var /** @type {?} */ shouldComplete = !util_1.swipeShouldReset(isResetDirecction, isMovingFast, isInResetZone);
            this._nav.swipeBackEnd(shouldComplete, currentStepValue, velocity);
        };
        return SwipeBackGesture;
    }(slide_edge_gesture_1.SlideEdgeGesture));
    exports.SwipeBackGesture = SwipeBackGesture;
    function SwipeBackGesture_tsickle_Closure_declarations() {
        /** @type {?} */
        SwipeBackGesture.prototype._nav;
    }
});
//# sourceMappingURL=swipe-back.js.map