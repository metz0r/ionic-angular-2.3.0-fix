(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '@angular/core', '../../config/config', '../../navigation/nav-params', '../../navigation/view-controller'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var config_1 = require('../../config/config');
    var nav_params_1 = require('../../navigation/nav-params');
    var view_controller_1 = require('../../navigation/view-controller');
    var ToastCmp = (function () {
        /**
         * @param {?} _viewCtrl
         * @param {?} _config
         * @param {?} _elementRef
         * @param {?} params
         * @param {?} renderer
         */
        function ToastCmp(_viewCtrl, _config, _elementRef, params, renderer) {
            this._viewCtrl = _viewCtrl;
            this._config = _config;
            this._elementRef = _elementRef;
            this.dismissTimeout = undefined;
            renderer.setElementClass(_elementRef.nativeElement, "toast-" + _config.get('mode'), true);
            this.d = params.data;
            if (this.d.cssClass) {
                this.d.cssClass.split(' ').forEach(function (cssClass) {
                    // Make sure the class isn't whitespace, otherwise it throws exceptions
                    if (cssClass.trim() !== '')
                        renderer.setElementClass(_elementRef.nativeElement, cssClass, true);
                });
            }
            this.id = (++toastIds);
            if (this.d.message) {
                this.hdrId = 'toast-hdr-' + this.id;
            }
        }
        /**
         * @return {?}
         */
        ToastCmp.prototype.ngAfterViewInit = function () {
            var _this = this;
            // if there's a `duration` set, automatically dismiss.
            if (this.d.duration) {
                this.dismissTimeout = ((setTimeout(function () {
                    _this.dismiss('backdrop');
                }, this.d.duration)));
            }
            this.enabled = true;
        };
        /**
         * @return {?}
         */
        ToastCmp.prototype.ionViewDidEnter = function () {
            var activeElement = document.activeElement;
            if (activeElement) {
                activeElement.blur();
            }
            var /** @type {?} */ focusableEle = this._elementRef.nativeElement.querySelector('button');
            if (focusableEle) {
                focusableEle.focus();
            }
        };
        /**
         * @return {?}
         */
        ToastCmp.prototype.cbClick = function () {
            if (this.enabled) {
                this.dismiss('close');
            }
        };
        /**
         * @param {?} role
         * @return {?}
         */
        ToastCmp.prototype.dismiss = function (role) {
            clearTimeout(this.dismissTimeout);
            this.dismissTimeout = undefined;
            return this._viewCtrl.dismiss(null, role, { disableApp: false });
        };
        ToastCmp.decorators = [
            { type: core_1.Component, args: [{
                        selector: 'ion-toast',
                        template: '<div class="toast-wrapper" ' +
                            '[class.toast-bottom]="d.position === \'bottom\'" ' +
                            '[class.toast-middle]="d.position === \'middle\'" ' +
                            '[class.toast-top]="d.position === \'top\'"> ' +
                            '<div class="toast-container"> ' +
                            '<div class="toast-message" id="{{hdrId}}" *ngIf="d.message">{{d.message}}</div> ' +
                            '<button ion-button clear class="toast-button" *ngIf="d.showCloseButton" (click)="cbClick()"> ' +
                            '{{ d.closeButtonText || \'Close\' }} ' +
                            '</button> ' +
                            '</div> ' +
                            '</div>',
                        host: {
                            'role': 'dialog',
                            '[attr.aria-labelledby]': 'hdrId',
                            '[attr.aria-describedby]': 'descId',
                        },
                    },] },
        ];
        /** @nocollapse */
        ToastCmp.ctorParameters = function () { return [
            { type: view_controller_1.ViewController, },
            { type: config_1.Config, },
            { type: core_1.ElementRef, },
            { type: nav_params_1.NavParams, },
            { type: core_1.Renderer, },
        ]; };
        return ToastCmp;
    }());
    exports.ToastCmp = ToastCmp;
    function ToastCmp_tsickle_Closure_declarations() {
        /** @type {?} */
        ToastCmp.decorators;
        /**
         * @nocollapse
         * @type {?}
         */
        ToastCmp.ctorParameters;
        /** @type {?} */
        ToastCmp.prototype.d;
        /** @type {?} */
        ToastCmp.prototype.descId;
        /** @type {?} */
        ToastCmp.prototype.dismissTimeout;
        /** @type {?} */
        ToastCmp.prototype.enabled;
        /** @type {?} */
        ToastCmp.prototype.hdrId;
        /** @type {?} */
        ToastCmp.prototype.id;
        /** @type {?} */
        ToastCmp.prototype._viewCtrl;
        /** @type {?} */
        ToastCmp.prototype._config;
        /** @type {?} */
        ToastCmp.prototype._elementRef;
    }
    var /** @type {?} */ toastIds = -1;
});
//# sourceMappingURL=toast-component.js.map