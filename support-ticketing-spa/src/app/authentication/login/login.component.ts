import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/core/guards/auth.service';
import { LoginRequest } from 'src/app/core/models/authenticate/loginRequest.model';
import { MaterialErrorStateMatcher } from 'src/app/core/utilities/materialErrorStateMatcher';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // Form
  public loginFormGroup: FormGroup = new FormGroup({
    email: new FormControl('', { validators: [Validators.required, Validators.email], updateOn: "submit" }),
    password: new FormControl('', { validators: [Validators.required, Validators.minLength(8), Validators.maxLength(100)], updateOn: "submit" })
  });

  // Props
  public hide = true;
  public get email(): any { return this.loginFormGroup.get('email'); }
  public get password(): any { return this.loginFormGroup.get('password'); }

  constructor(
    private title: Title,
    private router: Router,
    private authService: AuthService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Login');

    // If the user is already logged in, redirect to support page
    if (this.authService.isLoggedIn) {
      this.router.navigate(['/support']);
    }
  }

  public onSubmit() {
    const loginRequest: LoginRequest = {
      email: this.email.value,
      password: this.password.value
    };

    this.spinner.show('primary');
    this.authService.authenticate(loginRequest).subscribe({
      next: (isLoggedIn: boolean) => {
        if (isLoggedIn) {
          // Redirect user to Support page
          this.router.navigate(['/support']);
        }
      },
      error: (err: any) => {
        this.spinner.hide('primary');
      },
      complete: () => {
        this.spinner.hide('primary');
      }
    });
  }
}
