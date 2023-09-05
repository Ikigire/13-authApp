import { Directive, ElementRef, Input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[AuthFormErrorMessages]'
})
export class FormErrorMessagesDirective {

  private htmlElement?: ElementRef<HTMLElement>;
  private _color: string = 'red';
  private _fieldName: string = 'Este campo';
  private _errors?: ValidationErrors | null | undefined;

  @Input() set fieldName( value: string ) {
    this._fieldName = value;
    this.setErrorMessage();
  }

  @Input() set errors( values: ValidationErrors | null | undefined ) {
    this._errors = values;
    this.setErrorMessage();
  }
  constructor(
    private el: ElementRef<HTMLElement>
  ) { 
    this.htmlElement = el;
    this.setStyle();
  }

  setStyle(): void {
    if ( !this.htmlElement ) return;

    this.htmlElement!.nativeElement.style.color = this._color;
  }

  setErrorMessage(): void {
    if ( !this.htmlElement ) return;

    if ( this.fieldName === 'verPassword' )
      console.log(this._errors);
    
    if ( !this._errors ) {
      // this.htmlElement.nativeElement.innerText = 'No hay errores';
      this.htmlElement.nativeElement.innerText = '';
      return;
    }

    this.htmlElement.nativeElement.innerText = '';
    const errors = Object.keys( this._errors );

    if ( errors.includes('required') ){
      this.htmlElement.nativeElement.innerText += `${ this._fieldName } es requerido`
    }
    if ( errors.includes('minlength') ){
      const {requiredLength, actualLength} = this._errors['minlength'];
      
      this.htmlElement.nativeElement.innerText.length ? 
      this.htmlElement.nativeElement.innerText += `\n${ this._fieldName } requiere mínimo ${ actualLength }/${ requiredLength } caractéres` 
      : this.htmlElement.nativeElement.innerText += `${ this._fieldName } requiere mínimo ${ actualLength }/${ requiredLength } caractéres`;
    }
    if ( errors.includes('pattern') ){
      this.htmlElement.nativeElement.innerText.length ?
      this.htmlElement.nativeElement.innerText += '\nIngrese un email válido' 
      : this.htmlElement.nativeElement.innerText += 'Ingrese un email válido'
    }
    if ( errors.includes('notEqual') ){
      this.htmlElement.nativeElement.innerText.length ?
      this.htmlElement.nativeElement.innerText += '\nLas contraseñas no coinciden' 
      : this.htmlElement.nativeElement.innerText += 'Las contraseñas no coinciden'
    }
    if ( errors.includes('emailTaken') ){
      this.htmlElement.nativeElement.innerText.length ?
      this.htmlElement.nativeElement.innerText += '\nEl correo ya fue registrado' 
      : this.htmlElement.nativeElement.innerText += 'El correo ya fue registrado'
    }
  }

}
