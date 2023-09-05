import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class FormsValiatorService {
    public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
    
    constructor() { }

    public isValidField( form: FormGroup, field: string ): boolean | null {
        return form.controls[field].errors && form.controls[field].touched;   
    }

    public arePasswordsEquals( field1: string, field2: string ) {
        
        return ( form: FormGroup): ValidationErrors | null => {
            const fieldValue1 = form.controls[field1]?.value;
            const fieldValue2 = form.controls[field2]?.value;

            if (fieldValue1 !== fieldValue2){
                form.get(field2)?.setErrors( { notEqual: true } );
                return {notEqual: true};
            }
            
            form.get(field2)?.setErrors( null );
            return null;
        }
    }
}