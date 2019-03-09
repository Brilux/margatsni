import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../rest/auth/login/login.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService,
              private authService: AuthService) { }

  public loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  });

  public login(): void {
    this.loginService.sendRegistration(this.loginForm.value.email,
      this.loginForm.value.password).subscribe(response => {
        this.authService.LocalStorageSaveToken(response);
    });
  }

  ngOnInit() {
  }

}
