import { FormControl, FormGroupDirective, NgForm } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";

/** 
 * @description 
 * Determines if status of Form or Control is invalid when dirty, touched, or submitted. 
 * 
 * @see https://material.angular.io/components/input/overview
 * 
 * @publicApi
 * */
export class MaterialErrorStateMatcher implements ErrorStateMatcher {
    /** 
     * Determines if status of Form or Control is invalid when dirty, touched, or submitted. 
     * 
     * @return 'true' if invalid, otherwise 'false'
     * */
    public isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form?.submitted;
        return !!(control?.invalid && (control?.dirty || control?.touched || isSubmitted));
    }
}