webpackJsonp([1],{

/***/ 103:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HistoricoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mostra_historico_mostra_historico__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_background_mode__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_camera__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_constantes_constantes__ = __webpack_require__(203);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





//import * as io from 'socket.io-client';



var HistoricoPage = /** @class */ (function () {
    function HistoricoPage(navCtrl, http, alertCtrl, backgroundMode, camera, toastCtrl) {
        this.navCtrl = navCtrl;
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.backgroundMode = backgroundMode;
        this.camera = camera;
        this.toastCtrl = toastCtrl;
        this.Constantes = new __WEBPACK_IMPORTED_MODULE_7__components_constantes_constantes__["a" /* ConstantesComponent */];
        this.existe = true;
        this.dadosAluno = {
            _id: "",
            nome: "",
            cpf: "",
            IMC: "",
            msg: "",
            idade: "",
            peso: "",
            massaMagra: "",
            massaGorda: "",
            altura: "",
            dataInicio: ""
        };
        this.evolucaoExiste = false;
        this.listaTreinos = { treino: {}, treinos: [] };
        this.evolucaoLista = [];
        this.foto = 'assets/imgs/logobrandao.png';
        this.apiUrl = this.Constantes.url;
        this.backgroundMode.enable();
        this.headers = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["c" /* HttpHeaders */]();
        this.token = localStorage.getItem("tokenAppPM");
        this.expires = localStorage.getItem("expiresAppPM");
        this.headers = this.headers.append('Authorization', this.token);
        if (new Date(this.expires) < new Date()) {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__login_login__["a" /* LoginPage */]);
        }
        this.idUsu = localStorage.getItem('idUsuaAppPM');
        this.buscaAluno();
        this.buscaEvolucao();
        this.buscaTreinos();
    }
    HistoricoPage.prototype.buscaAluno = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get(_this.apiUrl + 'alunos/' + _this.idUsu, { headers: _this.headers }).subscribe(function (res) {
                _this.dadosAluno = res;
            }, function (error) {
                console.log("error");
            });
        });
    };
    HistoricoPage.prototype.buscaTreinos = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get(_this.apiUrl + 'treinos/' + _this.idUsu, { headers: _this.headers }).subscribe(function (res) {
                _this.listaTreinos = res;
                if (_this.listaTreinos.length > 0) {
                    _this.data = res[0].data;
                    _this.existe = true;
                }
                else {
                    _this.existe = false;
                }
            }, function (error) {
                console.log("error");
            });
        });
    };
    HistoricoPage.prototype.buscaEvolucao = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get(_this.apiUrl + 'evolucaos/mobile/evolucao/' + _this.idUsu, { headers: _this.headers }).subscribe(function (res) {
                _this.evolucaoLista = res;
                if (_this.evolucaoLista.length > 0) {
                    _this.evolucaoExiste = true;
                }
                else {
                    _this.evolucaoExiste = false;
                }
            }, function (error) {
                console.log("error");
            });
        });
    };
    HistoricoPage.prototype.buscaTreino = function (id, treino, nomeTreino) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__mostra_historico_mostra_historico__["a" /* MostraHistoricoPage */], {
            id: id,
            treino: treino,
            nomeTreino: nomeTreino
        });
    };
    HistoricoPage.prototype.sair = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__login_login__["a" /* LoginPage */], {
            sair: '1'
        });
    };
    HistoricoPage.prototype.notificacaoAlert = function () {
        var alert = this.alertCtrl.create({
            title: 'Notificação',
            subTitle: this.notificacao,
            buttons: ['Fechar']
        });
        alert.present();
    };
    HistoricoPage.prototype.tirarFoto = function () {
        var _this = this;
        var options = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };
        this.camera.getPicture(options).then(function (imageData) {
            var base64Image = 'data:image/jpeg;base64,' + imageData;
            _this.foto = base64Image;
        }, function (err) {
            _this.toastCtrl.create({
                message: 'Não foi possível tirar a foto',
                duration: 2000,
                position: 'top'
            }).present();
        });
    };
    HistoricoPage.prototype.removeFoto = function () {
        this.foto = 'assets/imgs/logobrandao.png';
    };
    HistoricoPage.prototype.receive = function () {
        var _this = this;
        this.socket.on('notificacao', function (notificacao, id) {
            if (JSON.stringify(id) === JSON.stringify(_this.idUsu)) {
                _this.notificacao = notificacao;
                _this.notificacaoAlert();
                _this.buscaTreinos();
            }
        });
    };
    HistoricoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-historico',template:/*ion-inline-start:"/home/lisatecnologia/teste2/teste/src/pages/historico/historico.html"*/'<ion-content class="fundo">\n  <div>\n\n\n    <ion-menu side="left" [content]="mycontent">\n      <ion-content>\n        <ion-list>\n\n          <img class="tamanhofoto" [hidden]="!foto" src="{{foto}}">\n          <h5 class="nome nomepaciente barralateral italico">{{ dadosAluno.nome }}</h5>\n          <div *ngIf="!evolucaoExiste">\n            <p class="marge barralateral italico"> Peso: {{ dadosAluno.peso }}kg </p>\n            <p class="marge barralateral italico"> Massa Magra: {{ dadosAluno.massaMagra }}kg </p>\n            <p class="marge barralateral italico"> Massa Gorda: {{ dadosAluno.massaGorda }}kg </p>\n            <p class="marge barralateral italico"> Cintura: {{ dadosAluno.cintura }}cm </p>\n            <p class="marge barralateral italico linha"> IMC: {{ dadosAluno.IMC }} </p>\n            <p class="marge barralateral italico linha"> {{ dadosAluno.msg }} </p>\n          </div>\n\n          <div *ngIf="evolucaoExiste">\n            <p class="marge barralateral italico"> Peso: {{ evolucaoLista[0].peso }}kg </p>\n            <p class="marge barralateral italico"> Massa Magra: {{ evolucaoLista[0].massaMagra }}kg </p>\n            <p class="marge barralateral italico"> Massa Gorda: {{ evolucaoLista[0].massaGorda }}kg </p>\n            <p class="marge barralateral italico"> Cintura: {{ evolucaoLista[0].cintura }}cm </p>\n            <p class="marge barralateral italico linha"> IMC: {{ evolucaoLista[0].IMC }} </p>\n            <p class="marge barralateral italico linha"> {{ dadosAluno.msg }} </p>\n          </div>\n          <br>\n          <button class="final" ion-button block (click)="sair()">Sair </button>\n        </ion-list>\n      </ion-content>\n    </ion-menu>\n\n\n    <ion-menu side="right" [content]="mycontent">\n      <ion-content>\n        <ion-list>\n\n\n          <h1 class="nome nomepaciente barralateral italico">Evolução</h1>\n          <hr>\n          <div *ngIf="evolucaoExiste">\n            <div *ngFor="let item of evolucaoLista">\n              <p class="marge barralateral italico"> Data: {{ item.dataAvaliacao }} </p>\n              <p class="marge barralateral italico"> Peso: {{ item.peso }}kg </p>\n              <p class="marge barralateral italico"> Massa Magra: {{ item.massaMagra }}kg </p>\n              <p class="marge barralateral italico"> Massa Gorda: {{ item.massaGorda }}kg </p>\n              <p class="marge barralateral italico"> Cintura: {{ item.cintura }}cm </p>\n              <p class="marge barralateral italico"> IMC: {{ item.IMC }} </p>\n              <hr>\n            </div>\n          </div>\n        </ion-list>\n      </ion-content>\n    </ion-menu>\n\n    <ion-nav #mycontent [root]="rootPage"></ion-nav>\n\n\n\n\n\n\n\n\n\n\n\n\n    <img class="tamanhofoto" [hidden]="!foto" src="{{foto}}">\n    <h2 class="nome nomepaciente">{{ dadosAluno.nome }}</h2>\n\n    <p class="margem cordehistoricotexto" [innerHTML]="listaTreinos.treino.descricao">\n    </p>\n\n    <ion-list>\n      <button class="borda" ion-item *ngFor="let item of listaTreinos.treinos" (click)="buscaTreino(item._id, item, item.nome)">\n        <p class="titulomenu italico">{{ item.nome }}</p>\n      </button>\n    </ion-list>\n\n  </div>\n\n\n\n\n</ion-content>'/*ion-inline-end:"/home/lisatecnologia/teste2/teste/src/pages/historico/historico.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"], __WEBPACK_IMPORTED_MODULE_5__ionic_native_background_mode__["a" /* BackgroundMode */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ToastController"]])
    ], HistoricoPage);
    return HistoricoPage;
}());

//# sourceMappingURL=historico.js.map

/***/ }),

/***/ 115:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 115;

/***/ }),

/***/ 156:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/mostra-historico/mostra-historico.module": [
		283,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 156;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 199:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DadosPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var DadosPage = /** @class */ (function () {
    function DadosPage(modalCtrl) {
        this.modalCtrl = modalCtrl;
    }
    DadosPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-home',template:/*ion-inline-start:"/home/lisatecnologia/teste2/teste/src/pages/login/login.html"*/'\n<ion-content padding>\n\n  <div class="centro">\n  <ion-list>\n    <img class="logo" src="assets/imgs/logops.png">\n    <ion-list>\n      <div class="mensagem" role="alert">\n         <p> {{ mensagem }}\n      </div>\n\n<form #loginForm="ngForm">\n  <ion-item>\n    <ion-label floating>CPF</ion-label>\n    <ion-input type="text" [(ngModel)]="cpf" (blur)="cpf_cnpj = format(cpf_cnpj)" name="cpf_cnpj"></ion-input>\n  </ion-item>\n</form>\n      <ion-item>\n        <ion-label floating>Senha</ion-label>\n        <ion-input type="password" [(ngModel)]="senha"></ion-input>\n      </ion-item>\n\n\n    </ion-list>\n\n    <button ion-button full class="botaologin botaologin1" (click)="logar()">Entrar  <i id="entrar" class="fa fa-sign-in fa-lg" aria-hidden="true"></i></button>\n\n\n\n  </ion-list>\n\n</div>\n\n</ion-content>\n'/*ion-inline-end:"/home/lisatecnologia/teste2/teste/src/pages/login/login.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ModalController"]])
    ], DadosPage);
    return DadosPage;
}());

//# sourceMappingURL=dados.js.map

/***/ }),

/***/ 200:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MostraHistoricoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login__ = __webpack_require__(41);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




//import * as io from 'socket.io-client';
/**
 * Generated class for the MostraHistoricoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MostraHistoricoPage = /** @class */ (function () {
    function MostraHistoricoPage(navCtrl, navParams, http, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.dadoHistorico = {
            historico: ""
        };
        this.headers = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["c" /* HttpHeaders */]();
        this.token = localStorage.getItem("tokenAppPM");
        this.expires = localStorage.getItem("expiresAppPM");
        this.headers = this.headers.append('Authorization', this.token);
        if (new Date(this.expires) < new Date()) {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__login_login__["a" /* LoginPage */]);
        }
        this.id = navParams.get('id');
        this.treino = navParams.get('treino');
        this.nomeTreino = navParams.get('nomeTreino');
        this.idUsu = localStorage.getItem('idUsuaAppPM');
    }
    MostraHistoricoPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MostraHistoricoPage');
    };
    MostraHistoricoPage.prototype.sair = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__login_login__["a" /* LoginPage */], {
            sair: '1'
        });
    };
    MostraHistoricoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-mostra-historico',template:/*ion-inline-start:"/home/lisatecnologia/teste2/teste/src/pages/mostra-historico/mostra-historico.html"*/'\n<ion-content #popoverContent class="popover-page">\n <div class="fundo1">\n \n\n  <h3 class="tituloconsulta italico "><br>{{nomeTreino}}</h3>\n  \n\n  <p class="margem fundo2" [innerHTML]="treino.treino">\n  </p>\n\n</div>\n\n</ion-content>\n'/*ion-inline-end:"/home/lisatecnologia/teste2/teste/src/pages/mostra-historico/mostra-historico.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"]])
    ], MostraHistoricoPage);
    return MostraHistoricoPage;
}());

//# sourceMappingURL=mostra-historico.js.map

/***/ }),

/***/ 203:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConstantesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

/**
 * Generated class for the ConstantesComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var ConstantesComponent = /** @class */ (function () {
    function ConstantesComponent() {
        //url: string = 'http://localhost:3000/api/v1/';
        this.url = 'http://162.243.161.30:3016/api/v1/';
    }
    ConstantesComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'constantes',template:/*ion-inline-start:"/home/lisatecnologia/teste2/teste/src/components/constantes/constantes.html"*/'<!-- Generated template for the ConstantesComponent component -->\n<div>\n  {{text}}\n</div>\n'/*ion-inline-end:"/home/lisatecnologia/teste2/teste/src/components/constantes/constantes.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], ConstantesComponent);
    return ConstantesComponent;
}());

//# sourceMappingURL=constantes.js.map

/***/ }),

/***/ 204:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(225);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 225:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(267);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_splash_screen__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pluritech_ion_mask__ = __webpack_require__(282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pluritech_ion_mask___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__pluritech_ion_mask__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_common_http__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_historico_historico__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_login_login__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_mostra_historico_mostra_historico__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_login_dados__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_background_mode__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_camera__ = __webpack_require__(202);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};















var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_10__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_historico_historico__["a" /* HistoricoPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_mostra_historico_mostra_historico__["a" /* MostraHistoricoPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_login_dados__["a" /* DadosPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_8__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["IonicModule"].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {
                    backButtonText: 'Voltar'
                }, {
                    links: [
                        { loadChildren: '../pages/mostra-historico/mostra-historico.module#MostraHistoricoPageModule', name: 'MostraHistoricoPage', segment: 'mostra-historico', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_7__pluritech_ion_mask__["IonMaskModule"].forRoot(),
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["IonicApp"]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_9__pages_historico_historico__["a" /* HistoricoPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_mostra_historico_mostra_historico__["a" /* MostraHistoricoPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_login_dados__["a" /* DadosPage */],
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_13__ionic_native_background_mode__["a" /* BackgroundMode */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ErrorHandler"], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["IonicErrorHandler"] },
                __WEBPACK_IMPORTED_MODULE_14__ionic_native_camera__["a" /* Camera */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 267:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_login_login__ = __webpack_require__(41);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





//import { TabsPage } from '../pages/tabs/tabs';
var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, alertCtrl) {
        this.alertCtrl = alertCtrl;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_login_login__["a" /* LoginPage */];
        platform.ready().then(function () {
            /*
                  firebase.getToken().then(token => console.log(token)).catch(err=> console.log(err));
                   firebase.onNotificationOpen().subscribe(data=>{
                     console.log(data);
                     console.log(data.name);
                   }, err=> console.log(err));
            */
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/home/lisatecnologia/teste2/teste/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/home/lisatecnologia/teste2/teste/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Platform"], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 281:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__historico_historico__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_login__ = __webpack_require__(41);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TabsPage = /** @class */ (function () {
    function TabsPage() {
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_2__login_login__["a" /* LoginPage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_1__historico_historico__["a" /* HistoricoPage */];
    }
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/home/lisatecnologia/teste2/teste/src/pages/tabs/tabs.html"*/'\n<ion-tabs>\n\n  <ion-tab [root]="tab1Root" tabTitle="" tabIcon="">  </ion-tab>\n\n</ion-tabs>\n\n'/*ion-inline-end:"/home/lisatecnologia/teste2/teste/src/pages/tabs/tabs.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 41:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__dados__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__historico_historico__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__ = __webpack_require__(280);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_constantes_constantes__ = __webpack_require__(203);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var LoginPage = /** @class */ (function () {
    function LoginPage(modalCtrl, alertCtrl, menu, navCtrl, http, navParams, toastCtrl) {
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.menu = menu;
        this.navCtrl = navCtrl;
        this.http = http;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.Constantes = new __WEBPACK_IMPORTED_MODULE_6__components_constantes_constantes__["a" /* ConstantesComponent */];
        this.cpf_cnpj = '';
        this.DECIMAL_SEPARATOR = ".";
        this.GROUP_SEPARATOR = ",";
        this.retornoLogin = new __WEBPACK_IMPORTED_MODULE_3__dados__["a" /* DadosPage */](this.modalCtrl);
        this.apiUrl = this.Constantes.url;
        this.sair = navParams.get('sair');
        if (this.sair) {
            this.logout();
        }
        this.expires = localStorage.getItem("expiresAppPM");
        if (new Date(this.expires) > new Date() && this.expires != '') {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__historico_historico__["a" /* HistoricoPage */]);
        }
    }
    LoginPage.prototype.ionViewDidEnter = function () {
        this.menu.swipeEnable(false);
    };
    LoginPage.prototype.ionViewWillLeave = function () {
        this.menu.swipeEnable(true);
    };
    LoginPage.prototype.logar = function () {
        var _this = this;
        this.http.post(this.apiUrl + 'login', { cpf: this.cpf, senha: this.senha, usuario: 'Aluno' })
            .subscribe(function (data) {
            _this.retornoLogin = data;
            localStorage.setItem('tokenAppPM', _this.retornoLogin.token);
            localStorage.setItem('expiresAppPM', _this.retornoLogin.expires);
            localStorage.setItem('idUsuaAppPM', _this.retornoLogin.user);
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__historico_historico__["a" /* HistoricoPage */]);
        }, function (err) {
            _this.toastCtrl.create({
                message: 'CPF ou Senha Incorretos',
                duration: 2000,
                position: 'top',
            }).present();
            console.log("CPF ou Senha Incorretos");
        });
    };
    LoginPage.prototype.logout = function () {
        localStorage.removeItem('tokenAppPM');
        localStorage.removeItem('expiresAppPM');
        localStorage.removeItem('idUsuaAppPM');
    };
    LoginPage.prototype.format = function (valString) {
        if (!valString) {
            return '';
        }
        var val = valString.toString();
        var parts = this.unFormat(val).split(this.DECIMAL_SEPARATOR);
        this.pureResult = parts;
        if (parts[0].length <= 11) {
            this.maskedId = this.cpf_mask(parts[0]);
            return this.maskedId;
        }
        else {
            this.maskedId = this.cnpj(parts[0]);
            return this.maskedId;
        }
    };
    ;
    LoginPage.prototype.unFormat = function (val) {
        if (!val) {
            return '';
        }
        val = val.replace(/\D/g, '');
        if (this.GROUP_SEPARATOR === ',') {
            return val.replace(/,/g, '');
        }
        else {
            return val.replace(/\./g, '');
        }
    };
    ;
    LoginPage.prototype.cpf_mask = function (v) {
        v = v.replace(/\D/g, ''); //Remove tudo o que não é dígito
        v = v.replace(/(\d{3})(\d)/, '$1.$2'); //Coloca um ponto entre o terceiro e o quarto dígitos
        v = v.replace(/(\d{3})(\d)/, '$1.$2'); //Coloca um ponto entre o terceiro e o quarto dígitos
        //de novo (para o segundo bloco de números)
        v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); //Coloca um hífen entre o terceiro e o quarto dígitos
        return v;
    };
    LoginPage.prototype.cnpj = function (v) {
        v = v.replace(/\D/g, ''); //Remove tudo o que não é dígito
        v = v.replace(/^(\d{2})(\d)/, '$1.$2'); //Coloca ponto entre o segundo e o terceiro dígitos
        v = v.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3'); //Coloca ponto entre o quinto e o sexto dígitos
        v = v.replace(/\.(\d{3})(\d)/, '.$1/$2'); //Coloca uma barra entre o oitavo e o nono dígitos
        v = v.replace(/(\d{4})(\d)/, '$1-$2'); //Coloca um hífen depois do bloco de quatro dígitos
        return v;
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-home',template:/*ion-inline-start:"/home/lisatecnologia/teste2/teste/src/pages/login/login.html"*/'\n<ion-content padding>\n\n  <div class="centro">\n  <ion-list>\n    <img class="logo" src="assets/imgs/logops.png">\n    <ion-list>\n      <div class="mensagem" role="alert">\n         <p> {{ mensagem }}\n      </div>\n\n<form #loginForm="ngForm">\n  <ion-item>\n    <ion-label floating>CPF</ion-label>\n    <ion-input type="text" [(ngModel)]="cpf" (blur)="cpf_cnpj = format(cpf_cnpj)" name="cpf_cnpj"></ion-input>\n  </ion-item>\n</form>\n      <ion-item>\n        <ion-label floating>Senha</ion-label>\n        <ion-input type="password" [(ngModel)]="senha"></ion-input>\n      </ion-item>\n\n\n    </ion-list>\n\n    <button ion-button full class="botaologin botaologin1" (click)="logar()">Entrar  <i id="entrar" class="fa fa-sign-in fa-lg" aria-hidden="true"></i></button>\n\n\n\n  </ion-list>\n\n</div>\n\n</ion-content>\n'/*ion-inline-end:"/home/lisatecnologia/teste2/teste/src/pages/login/login.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ModalController"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["MenuController"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"],
            __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ToastController"]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ })

},[204]);
//# sourceMappingURL=main.js.map