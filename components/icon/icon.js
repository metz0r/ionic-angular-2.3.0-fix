var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { Directive, ElementRef, HostBinding, Input, Renderer } from '@angular/core';
import { isTrueProperty } from '../../util/util';
import { Config } from '../../config/config';
import { Ion } from '../ion';
/**
 * \@name Icon
 * \@description
 * Icons can be used on their own, or inside of a number of Ionic components.
 * For a full list of available icons, check out the
 * [Ionicons docs](../../../../ionicons).
 *
 * One feature of Ionicons in Ionic is when icon names are set, the actual icon
 * which is rendered can change slightly depending on the mode the app is
 * running from. For example, by setting the icon name of `alarm`, on iOS the
 * icon will automatically apply `ios-alarm`, and on Material Design it will
 * automatically apply `md-alarm`. This allows the developer to write the
 * markup once while Ionic applies the appropriate icon based on the mode.
 *
 * \@usage
 * ```html
 * <!-- automatically uses the correct "star" icon depending on the mode -->
 * <ion-icon name="star"></ion-icon>
 *
 * <!-- explicity set the icon for each mode -->
 * <ion-icon ios="ios-home" md="md-home"></ion-icon>
 *
 * <!-- always use the same icon, no matter what the mode -->
 * <ion-icon name="ios-clock"></ion-icon>
 * <ion-icon name="logo-twitter"></ion-icon>
 * ```
 *
 * \@demo /docs/v2/demos/src/icon/
 * @see {\@link /docs/v2/components#icons Icon Component Docs}
 *
 */
export var Icon = (function (_super) {
    __extends(Icon, _super);
    /**
     * @param {?} config
     * @param {?} elementRef
     * @param {?} renderer
     */
    function Icon(config, elementRef, renderer) {
        _super.call(this, config, elementRef, renderer, 'icon');
        /** @private */
        this._isActive = true;
        /** @private */
        this._name = '';
        /** @private */
        this._ios = '';
        /** @private */
        this._md = '';
        /** @private */
        this._css = '';
        /**
         * @private
         */
        this._hidden = false;
        this._iconMode = config.get('iconMode');
    }
    Object.defineProperty(Icon.prototype, "color", {
        /**
         * \@input {string} The color to use from your Sass `$colors` map.
         * Default options are: `"primary"`, `"secondary"`, `"danger"`, `"light"`, and `"dark"`.
         * For more information, see [Theming your App](/docs/v2/theming/theming-your-app).
         * @return {?}
         */
        get: function () {
            return this._color;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._setColor(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Icon.prototype, "mode", {
        /**
         * \@input {string} The mode determines which platform styles to use.
         * Possible values are: `"ios"`, `"md"`, or `"wp"`.
         * For more information, see [Platform Styles](/docs/v2/theming/platform-specific-styles).
         * @param {?} val
         * @return {?}
         */
        set: function (val) {
            this._setMode(val);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    Icon.prototype.ngOnDestroy = function () {
        if (this._css) {
            this.setElementClass(this._css, false);
        }
    };
    Object.defineProperty(Icon.prototype, "name", {
        /**
         * \@input {string} Specifies which icon to use. The appropriate icon will be used based on the mode.
         * For more information, see [Ionicons](/docs/v2/ionicons/).
         * @return {?}
         */
        get: function () {
            return this._name;
        },
        /**
         * @param {?} val
         * @return {?}
         */
        set: function (val) {
            if (!(/^md-|^ios-|^logo-/.test(val))) {
                // this does not have one of the defaults
                // so lets auto add in the mode prefix for them
                this._name = this._iconMode + '-' + val;
            }
            else {
                this._name = val;
            }
            this.update();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Icon.prototype, "ios", {
        /**
         * \@input {string} Specifies which icon to use on `ios` mode.
         * @return {?}
         */
        get: function () {
            return this._ios;
        },
        /**
         * @param {?} val
         * @return {?}
         */
        set: function (val) {
            this._ios = val;
            this.update();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Icon.prototype, "md", {
        /**
         * \@input {string} Specifies which icon to use on `md` mode.
         * @return {?}
         */
        get: function () {
            return this._md;
        },
        /**
         * @param {?} val
         * @return {?}
         */
        set: function (val) {
            this._md = val;
            this.update();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Icon.prototype, "isActive", {
        /**
         * \@input {boolean} If true, the icon is styled with an "active" appearance.
         * An active icon is filled in, and an inactive icon is the outline of the icon.
         * The `isActive` property is largely used by the tabbar. Only affects `ios` icons.
         * @return {?}
         */
        get: function () {
            return this._isActive;
        },
        /**
         * @param {?} val
         * @return {?}
         */
        set: function (val) {
            this._isActive = isTrueProperty(val);
            this.update();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    Icon.prototype.update = function () {
        var /** @type {?} */ iconName;
        if (this._ios && this._iconMode === 'ios') {
            iconName = this._ios;
        }
        else if (this._md && this._iconMode === 'md') {
            iconName = this._md;
        }
        else {
            iconName = this._name;
        }
        var /** @type {?} */ hidden = this._hidden = (iconName === null);
        if (hidden) {
            return;
        }
        var /** @type {?} */ iconMode = iconName.split('-', 2)[0];
        if (iconMode === 'ios' &&
            !this._isActive &&
            iconName.indexOf('logo-') < 0 &&
            iconName.indexOf('-outline') < 0) {
            iconName += '-outline';
        }
        var /** @type {?} */ css = 'ion-' + iconName;
        if (this._css === css) {
            return;
        }
        if (this._css) {
            this.setElementClass(this._css, false);
        }
        this._css = css;
        this.setElementClass(css, true);
        var /** @type {?} */ label = iconName
            .replace('ios-', '')
            .replace('md-', '')
            .replace('-', ' ');
        this.setElementAttribute('aria-label', label);
    };
    Icon.decorators = [
        { type: Directive, args: [{
                    selector: 'ion-icon',
                    host: {
                        'role': 'img'
                    }
                },] },
    ];
    /** @nocollapse */
    Icon.ctorParameters = function () { return [
        { type: Config, },
        { type: ElementRef, },
        { type: Renderer, },
    ]; };
    Icon.propDecorators = {
        'color': [{ type: Input },],
        'mode': [{ type: Input },],
        'name': [{ type: Input },],
        'ios': [{ type: Input },],
        'md': [{ type: Input },],
        'isActive': [{ type: Input },],
        '_hidden': [{ type: HostBinding, args: ['class.hide',] },],
    };
    return Icon;
}(Ion));
function Icon_tsickle_Closure_declarations() {
    /** @type {?} */
    Icon.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    Icon.ctorParameters;
    /** @type {?} */
    Icon.propDecorators;
    /** @type {?} */
    Icon.prototype._iconMode;
    /** @type {?} */
    Icon.prototype._isActive;
    /** @type {?} */
    Icon.prototype._name;
    /** @type {?} */
    Icon.prototype._ios;
    /** @type {?} */
    Icon.prototype._md;
    /** @type {?} */
    Icon.prototype._css;
    /** @type {?} */
    Icon.prototype._hidden;
}
//# sourceMappingURL=icon.js.map