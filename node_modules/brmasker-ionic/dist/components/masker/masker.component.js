import { Input, Directive, HostListener, ElementRef } from '@angular/core';
export var MaskerDirective = (function () {
    function MaskerDirective(element) {
        this.element = element;
    }
    MaskerDirective.prototype.inputChanged = function (event) {
        if (event.target.value) {
            this.onInput(event.target.value);
        }
    };
    MaskerDirective.prototype.onInput = function (value) {
        var ret = this.formataCampo(value, this.brmaskere.mask, this.brmaskere.len);
        if (ret) {
            this.element.nativeElement.value = ret;
        }
    };
    MaskerDirective.prototype.formataCampo = function (campo, Mascara, tamanho) {
        var boleanoMascara;
        var exp = /\-|\.|\/|\(|\)|\,|\*|\+|\@|\#|\R|\$|\&|\%| /g;
        var campoSoNumeros = campo.toString().replace(exp, '');
        var posicaoCampo = 0;
        var NovoValorCampo = '';
        var TamanhoMascara = campoSoNumeros.length;
        for (var i = 0; i < TamanhoMascara; i++) {
            if (i < tamanho) {
                boleanoMascara = ((Mascara.charAt(i) === '-') || (Mascara.charAt(i) === '.') || (Mascara.charAt(i) === '/'));
                boleanoMascara = boleanoMascara || ((Mascara.charAt(i) === '(') || (Mascara.charAt(i) === ')') || (Mascara.charAt(i) === ' '));
                boleanoMascara = boleanoMascara || ((Mascara.charAt(i) === ',') || (Mascara.charAt(i) === '*') || (Mascara.charAt(i) === '+'));
                boleanoMascara = boleanoMascara || ((Mascara.charAt(i) === '@') || (Mascara.charAt(i) === '#') || (Mascara.charAt(i) === 'R'));
                boleanoMascara = boleanoMascara || ((Mascara.charAt(i) === '$') || (Mascara.charAt(i) === '&') || (Mascara.charAt(i) === '%'));
                if (boleanoMascara) {
                    NovoValorCampo += Mascara.charAt(i);
                    TamanhoMascara++;
                }
                else {
                    NovoValorCampo += campoSoNumeros.charAt(posicaoCampo);
                    posicaoCampo++;
                }
            }
        }
        return NovoValorCampo;
    };
    MaskerDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[brmasker]',
                },] },
    ];
    /** @nocollapse */
    MaskerDirective.ctorParameters = function () { return [
        { type: ElementRef, },
    ]; };
    MaskerDirective.propDecorators = {
        'brmaskere': [{ type: Input, args: ['brmasker',] },],
        'inputChanged': [{ type: HostListener, args: ['keyup', ['$event'],] },],
    };
    return MaskerDirective;
}());
//# sourceMappingURL=masker.component.js.map