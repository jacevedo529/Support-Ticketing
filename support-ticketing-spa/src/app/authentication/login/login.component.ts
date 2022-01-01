import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpAuthService } from 'src/app/core/http/authentication/http-auth.service';
import { AuthRequest } from 'src/app/core/models/authenticate/authRequest.model';
import { AuthResponse } from 'src/app/core/models/authenticate/authResponse.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginFormGroup: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(100)])
  });

  get username(): any { return this.loginFormGroup.get('username'); }
  get password(): any { return this.loginFormGroup.get('password'); }

  constructor(
    private router: Router,
    private httpAuthService: HttpAuthService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {

  }

  public onCreateAccount() {
    this.router.navigate(['/register'])
  }

  public onSubmit() {
    const authRequest: AuthRequest = {
      username: this.username.value,
      password: this.password.value
    }

    this.spinner.show('primary');
    this.httpAuthService.authenticate(authRequest).subscribe({
      next: (value: AuthResponse) => {
        // Redirect user to Support page
      },
      error: (err: any) => {

      }
    })
  }
}
