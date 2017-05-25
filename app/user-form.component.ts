import { Component } from '@angular/core';
import { User } from "./model/User";

@Component({
    selector: 'user-form',
    templateUrl: 'app/user-form.component.html'
})
export class UserFormComponent {
    user: User;
}