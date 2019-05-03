import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../rest/auth/login/login.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { TokenModel } from '../../rest/auth/token.model';

const emailValidateRegex = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginError: string;
  public loading: boolean;

  constructor(private loginService: LoginService,
              private authService: AuthService,
              private router: Router) { }

  public loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(emailValidateRegex)]),
    password: new FormControl('', Validators.required),
  });

  public login(): void {
    this.loading = true;
    this.loginService.sendAuthorization(
      this.loginForm.value.email,
      this.loginForm.value.password).subscribe(response => {
      this.authService.LocalStorageSaveToken(new TokenModel(response));
      this.router.navigate(['']);
    }, err => {
      const errorMessage = Object.keys(err.error.errors);
      this.loginError = `${errorMessage[0]} ${err.error.errors[errorMessage[0]]}`;
      this.loading = false;
    });
  }

  ngOnInit() {
  }

}
