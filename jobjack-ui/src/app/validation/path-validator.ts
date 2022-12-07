import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function CustomPathValidator(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {
        const value = control.value;

        if (!value) {
            return null;
        }

        const PATH_REGEXP = /^\/[a-zA-Z0-9]*$/;
    

        return PATH_REGEXP.test(value) ? null : {pathInvalid: true};
    }
}