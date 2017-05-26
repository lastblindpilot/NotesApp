import { Validator, AbstractControl, NG_ASYNC_VALIDATORS } from "@angular/forms";
import { Http } from "@angular/http";
import { Directive } from "@angular/core";
import { URLSearchParams } from '@angular/http';

@Directive({
    selector:   '[userUniqueValid][formControlName],[userUniqueValid][ngModel]',
    providers: [
            {   provide: NG_ASYNC_VALIDATORS, 
                useExisting: UserUniqueValidator, 
                multi: true }]
})
export class UserUniqueValidator implements Validator {

    constructor( private http: Http) {}

    validate(c: AbstractControl): Promise<{[key: string]: any}> {
        const user = c.value;
        const params: URLSearchParams = new URLSearchParams();
        params.set('user', user);

        return new Promise(resolve =>
                this.http.get("checkUserUnique", { search:params })
                .map(response => response.json())
                .subscribe(res => res?resolve(null):resolve({userUniqueValid:false})));
    }
    registerOnValidatorChange(fn: () => void): void {
        return null;
    }
}
