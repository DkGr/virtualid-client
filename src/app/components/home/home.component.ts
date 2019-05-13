import { Component, OnInit, ViewChild } from '@angular/core';
import { ButtonsModule, WavesModule, CollapseModule, ModalModule, TooltipModule, PopoverModule } from 'angular-bootstrap-md'
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  signupFormModalName = new FormControl('', Validators.required);
  signupFormModalEmail = new FormControl('', Validators.email);
  signupFormModalPassword = new FormControl('', Validators.required);

  user: User = new User();

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  onRegister() {
    this.userService.registerUser(this.user)
      .subscribe(data => console.log(data), error => console.log(error));
    this.user = new User();
  }

}
