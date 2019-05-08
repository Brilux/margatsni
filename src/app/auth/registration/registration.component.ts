import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../../rest/auth/registration/registration.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { TokenModel } from '../../rest/auth/token.model';

const loginValidateRegex = '^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$';
const emailValidateRegex = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-z]{2,4}$';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  public registrationError: string;
  public loading: boolean;

  constructor(private registrationService: RegistrationService,
              private authService: AuthService,
              private router: Router) {}

  public registrationForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.pattern(loginValidateRegex)]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern(emailValidateRegex)]),
    password: new FormControl('', Validators.required),
    passwordConfirm: new FormControl('', Validators.required)
  }, {
    validators: (validator) => {
      if (validator.value.password !== validator.value.passwordConfirm) {
        return {
          'passwordError' : true
        };
      }
      return null;
    }
  });

  public registration(): void {
    this.loading = true;
    this.registrationService.sendRegistration(this.registrationForm.value.username,
    this.registrationForm.value.email,
    this.registrationForm.value.password).subscribe(response => {
      this.authService.LocalStorageSaveToken(new TokenModel(response));
      this.router.navigate(['']);
    }, err => {
      const errorMessage = Object.keys(err.error.errors);
      this.registrationError = `${errorMessage[0]} ${err.error.errors[errorMessage[0]]}`;
      this.loading = false;
    });
  }

  ngOnInit() {
  }

}
