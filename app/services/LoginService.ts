import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/do';
import { Subject } from "rxjs/Subject";

@Injectable()
export class LoginService {
    private loginUrl = 'login';  // URL to web api
    private logoutUrl = 'logout';  // URL to web api
    loggedIn: boolean = false;
    private userLoginSource = new Subject<LoginUser>();
    userLogin$ = this.userLoginSource.asObservable();

    constructor(private http: Http) { }

    login(user: LoginUser): Observable<boolean> {
        return this.http.post(this.loginUrl, user)
            .map(response => response.json() as boolean)
            .do(res => { if (res) this.userLogin(user) });
    }

    logout() {
        return this.http.get(this.logoutUrl)
        .do(res => this.userLogout());
    }

    userLogin(user: LoginUser) {
        this.loggedIn = true;
        this.userLoginSource.next(user);
    }

    userLogout() {
        this.loggedIn = false;
        this.userLoginSource.next(null);
    }
}

export class LoginUser {
    name: string;
    password: string;
}