import { Directive, Attribute } from '@angular/core';
import { NG_VALIDATORS, AbstractControl } from "@angular/forms";

@Directive({
    selector: '[validateEqual][ngModel]',
    providers: [
            {   provide: NG_VALIDATORS, 
                useExisting: EqualToValidator, 
                multi: true 
            }]
})
export class EqualToValidator {
    constructor( @Attribute("validateEqual") public validateEqual: string ) {}

    validate(c: AbstractControl): {[key: string]: any} {
        let v = c.value;
        let e = c.root.get(this.validateEqual);
        if (e && v !== e.value) return { validateEqual: false };
        
        // subscribe to future changes in password
        e.valueChanges.subscribe((val:string)=> {
            if (val != v) c.setErrors({validateEqual: false});
                else c.setErrors(null);
            }
        );

        return null;
    }

    
}