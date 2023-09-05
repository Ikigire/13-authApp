import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, map, tap } from 'rxjs';
import { environment } from 'src/app/environments/environments';

@Injectable({ providedIn: 'root' })
export class EmailAvailabilityValidator implements AsyncValidator {
    

    private http = inject(HttpClient);
    constructor() { }
       

    validate(control: AbstractControl<any, any>): Observable<ValidationErrors | null> {
        const email = control.value;
        const baseUrl = environment.baseUrl;

        // TODO: preparar backend para revisar la disponibilidad del correo

        //  Para peticiones a un endpoint la estructura siguiente es la correcta
        return this.http.get<{email:string}[]>(`${ baseUrl }/auth/check-email?email=${ email }`)
            .pipe(
                map( resp => {
                    return (resp.length === 0)
                        ? null
                        : { emailTaken: true }
                })
            );
        // const httpCallObservable = new Observable<ValidationErrors | null>((subscriber) => {
        //     // console.log(email)

        //     if (email === 'yael@gmail.com') {
        //         subscriber.next({ emailTaken: true }),
        //             subscriber.complete();
        //     }

        //     subscriber.next(null);
        //     subscriber.complete()
        // });

        // return httpCallObservable;
    }
}