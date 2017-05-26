"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var LoginService_1 = require("./services/LoginService");
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
var LoginFormComponent = (function () {
    function LoginFormComponent(loginService, router, http) {
        var _this = this;
        this.loginService = loginService;
        this.router = router;
        this.http = http;
        this.userForm = new LoginService_1.LoginUser();
        this.loginService.userLogin$.subscribe(function (user) { return _this.userForm = user || new LoginService_1.LoginUser(); });
    }
    Object.defineProperty(LoginFormComponent.prototype, "loggedIn", {
        get: function () {
            return this.loginService.loggedIn;
        },
        enumerable: true,
        configurable: true
    });
    LoginFormComponent.prototype.login = function () {
        var _this = this;
        this.loginService.login(this.userForm)
            .subscribe(function (res) { return res ? _this.onSuccessLogin() : _this.onFailLogin(); });
    };
    LoginFormComponent.prototype.logout = function () {
        var _this = this;
        this.loginService.logout().subscribe(function (res) { return _this.onLogout(); });
    };
    LoginFormComponent.prototype.onSuccessLogin = function () {
        this.router.navigateByUrl("/");
    };
    LoginFormComponent.prototype.onFailLogin = function () {
        var _this = this;
        this.failedLogin = true;
        setTimeout(function () { return _this.failedLogin = false; }, 1000);
    };
    LoginFormComponent.prototype.onLogout = function () {
        this.router.navigateByUrl("/");
    };
    return LoginFormComponent;
}());
LoginFormComponent = __decorate([
    core_1.Component({
        selector: 'login-form',
        templateUrl: 'app/login-form.component.html'
    }),
    __metadata("design:paramtypes", [LoginService_1.LoginService, router_1.Router, http_1.Http])
], LoginFormComponent);
exports.LoginFormComponent = LoginFormComponent;
//# sourceMappingURL=login-form.component.js.map