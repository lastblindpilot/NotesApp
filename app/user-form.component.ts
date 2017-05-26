import { Component } from '@angular/core';
import { User } from "./model/User";
import { Http } from "@angular/http";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: 'user-form',
    templateUrl: 'app/user-form.component.html',
    styles: [`
        input.ng-touched.ng-invalid {
            background-color: #ffe8f1;
        }`]
})
export class UserFormComponent {
    user: User;

    constructor(private http: Http, private router: Router) {
        this.user = new User();
    }

    onSubmit() {
        this.http.post("users", this.user).subscribe(res=>{
            this.router.navigateByUrl("");
        });
    }
}