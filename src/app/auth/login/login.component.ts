import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../rest/auth/login/login.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { TokenModel } from '../../rest/auth/token.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginError: string;

  constructor(private loginService: LoginService,
              private authService: AuthService,
              private router: Router) {}

  public loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required),
  });

  public login(): void {
    this.loginService.sendAuthorization(this.loginForm.value.email,
      this.loginForm.value.password).subscribe(response => {
        this.authService.LocalStorageSaveToken(new TokenModel(response));
        this.router.navigate(['']);
    }, err => this.loginError = err.error);
  }

  ngOnInit() {
  }

}
