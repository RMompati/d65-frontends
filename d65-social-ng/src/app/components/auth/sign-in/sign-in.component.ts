import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import { SigninRequest } from 'src/app/interface/signin-request';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  signInForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  onSubmit() {
    console.log("Form Submition");
    console.log(`Username :: ${this.signInForm.get("username")?.value}`);
    console.log(`Password :: ${this.signInForm.get("password")?.value}`);
    console.log(this.signInForm.valid);
    
    this.signInForm.value.password
    
    // this.signInForm.reset();
  }

  getUsername() {
    return this.signInForm.value.username!!;
  }

  getPassword() {
    return this.signInForm.value.password!!
  }

  getLoginReqest() {
    return this.signInForm.value as SigninRequest
  }
}
