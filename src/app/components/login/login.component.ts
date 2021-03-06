import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from 'src/app/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.fb.group({
    email: new FormControl('', [Validators.required, Validators.email,]),
    password: new FormControl('', [Validators.required, Validators.minLength(8),])
  });

  constructor(private fb: FormBuilder, public loginService: LoginService) {}

  ngOnInit(): void {}

  login(): void {
    const val = this.loginForm.value;
    if (this.loginForm.valid) {
      // use this code if POST api call does not return any error
      // this.loginService.login(val.email, val.password).subscribe(res => {
      //   console.log(res);
      // });
      this.loginService.login().subscribe(res => console.log(res));
    }
  }
}
