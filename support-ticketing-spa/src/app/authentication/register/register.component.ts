import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpAuthService } from 'src/app/core/http/authentication/http-auth.service';
import { CreateAccountRequest } from 'src/app/core/models/authenticate/createAccountRequest.model';
import { MaterialErrorStateMatcher } from 'src/app/core/utilities/MaterialErrorStateMatcher';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public createAccountFormGroup: FormGroup = new FormGroup({
    email: new FormControl('', { validators: [Validators.required, Validators.email], updateOn: "blur" }),
    password: new FormControl('', { validators: [Validators.required, Validators.minLength(8), Validators.maxLength(100)], updateOn: "blur" }),
    firstName: new FormControl('', { validators: [Validators.required, Validators.minLength(2), Validators.maxLength(100)], updateOn: "blur" }),
    lastName: new FormControl('', { validators: [Validators.required, Validators.minLength(2), Validators.maxLength(100)], updateOn: "blur" })
  });
  public matcher = new MaterialErrorStateMatcher();

  get email(): any { return this.createAccountFormGroup.get('email'); }
  get password(): any { return this.createAccountFormGroup.get('password'); }
  get firstName(): any { return this.createAccountFormGroup.get('firstName'); }
  get lastName(): any { return this.createAccountFormGroup.get('lastName'); }

  constructor(
    private title: Title,
    private spinner: NgxSpinnerService,
    private httpAuthService: HttpAuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Create Account');
  }

  public onSubmit() {
    debugger;
    const createAccountRequest: CreateAccountRequest = {
      email: this.email.value,
      password: this.password.value,
      firstName: this.firstName.value,
      lastName: this.lastName.value
    };

    this.spinner.show('primary');
    this.httpAuthService.createAccount(createAccountRequest).subscribe({
      next: () => {
        // Redirect user to Support page
        this.router.navigate(['/support']);
      },
      error: (err: any) => {
        this.spinner.hide('primary');
      },
      complete: () => {
        this.spinner.hide('primary');
      }
    });
  }

  public onLogin() {
    // Navigate to login page
    this.router.navigate(['/login']);
  }
}
