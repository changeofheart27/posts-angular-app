import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile: any;

  constructor(public loginService: LoginService) { }

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo(): void {
    this.loginService.getUserInfo().subscribe(profile => this.profile = profile);
  }

}
