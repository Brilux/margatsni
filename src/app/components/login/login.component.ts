import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  public loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  });

  public login(): void {
    this.loginService.sendRegistration(this.loginForm.value.email,
      this.loginForm.value.password).subscribe(response => {
      console.log(response);
    });
  }

  ngOnInit() {
  }

}
