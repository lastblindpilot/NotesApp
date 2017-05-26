import { Component } from "@angular/core";
import { LoginUser, LoginService } from "./services/LoginService";
import { Router } from "@angular/router";
import { Http } from "@angular/http";

@Component({
    selector: 'login-form',
    templateUrl: 'app/login-form.component.html'
})
export class LoginFormComponent {
    userForm: LoginUser = new LoginUser();
    failedLogin: boolean;

    constructor(private loginService: LoginService, private router: Router, private http: Http) {
         this.loginService.userLogin$.subscribe(user=>this.userForm=user || new LoginUser());
    }

    get loggedIn() {
        return this.loginService.loggedIn;
    }

    login() {
        this.loginService.login(this.userForm)
            .subscribe(res=>res?this.onSuccessLogin():this.onFailLogin());
    }

    logout() {
        this.loginService.logout().subscribe(res=>this.onLogout());
    }

    onSuccessLogin() {
        this.router.navigateByUrl("/");
    }

    onFailLogin() {
        this.failedLogin = true;
        setTimeout(() => this.failedLogin = false, 1000);
    }

    onLogout() {
        this.router.navigateByUrl("/");
    }
}
