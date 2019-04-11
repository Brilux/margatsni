import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../../rest/auth/registration/registration.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { TokenModel } from '../../rest/auth/token.model';

const emailValidateRegex = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  public registrationError: string;

  constructor(private registrationService: RegistrationService,
              private authService: AuthService,
              private router: Router) {}

  public registrationForm: FormGroup = new FormGroup({
    username: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email, Validators.pattern(emailValidateRegex)]),
    password: new FormControl(null, Validators.required),
  });

  public registration(): void {
    this.registrationService.sendRegistration(this.registrationForm.value.username,
    this.registrationForm.value.email,
    this.registrationForm.value.password).subscribe(response => {
      this.authService.LocalStorageSaveToken(new TokenModel(response));
      this.router.navigate(['']);
    }, err => {
      this.registrationError = err.error.errors[0];
    });
  }

  ngOnInit() {
  }

}
