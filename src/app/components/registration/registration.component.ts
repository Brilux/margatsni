import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../../services/registration.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private registrationService: RegistrationService) {
  }

  public registrationForm: FormGroup = new FormGroup({
    username: new FormControl(null, Validators.required),
    email: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  });

  public registration(): void {
    this.registrationService.sendRegistration(this.registrationForm.value.username,
    this.registrationForm.value.email,
    this.registrationForm.value.password).subscribe(response => {
      console.log(response);
    });
  }

  ngOnInit() {
  }

}
