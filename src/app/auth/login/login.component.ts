import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../rest/auth/login/login.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService,
              private authService: AuthService,
              private router: Router) { }

  public loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  });

  public login(): void {
    this.loginService.sendRegistration(this.loginForm.value.email,
      this.loginForm.value.password).subscribe(response => {
        this.authService.LocalStorageSaveToken(response);
        this.authService.login();
        this.router.navigate(['']);
    });
  }

  ngOnInit() {
  }

}
