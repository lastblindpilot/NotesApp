import { Component } from '@angular/core';
import { User } from "./model/User";

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

    constructor() {
        this.user = new User();
    }
}