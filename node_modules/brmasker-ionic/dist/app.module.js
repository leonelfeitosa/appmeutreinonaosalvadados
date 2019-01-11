import { MaskerModule } from './components/masker/masker.module';
import { NgModule } from '@angular/core';
export var AppMaskerModule = (function () {
    function AppMaskerModule() {
    }
    AppMaskerModule.forRoot = function () {
        return {
            ngModule: MaskerModule
        };
    };
    AppMaskerModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        MaskerModule
                    ],
                    exports: [
                        MaskerModule
                    ]
                },] },
    ];
    /** @nocollapse */
    AppMaskerModule.ctorParameters = function () { return []; };
    return AppMaskerModule;
}());
//# sourceMappingURL=app.module.js.map