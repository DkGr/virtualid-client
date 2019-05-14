import { Component, OnInit, ViewChild } from '@angular/core';
import { ButtonsModule, WavesModule, CollapseModule, ModalModule, TooltipModule, PopoverModule } from 'angular-bootstrap-md'
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

import * as openpgp from 'openpgp';

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

  @ViewChild('generateKeysDialog') generateKeysDialog;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  async onRegister() {
    this.generateKeysDialog.show();
    var options = {
        userIds: [{
          name: this.user.username,
          email: "${this.user.username}@virtualid.fr"
        }],
        numBits: 4096,
        passphrase: this.user.password
    };

    var keys = await openpgp.generateKey(options);
    this.user.publicKey = keys.publicKeyArmored;
    this.user.privateKey = keys.privateKeyArmored;

    this.userService.registerUser(this.user)
      .subscribe(
        data => this.onRegisterSuccess(data),
        error => this.onRegisterFailed(error)
      );
  }

  onRegisterSuccess(data) {
    console.log(data);
    this.generateKeysDialog.hide();
    this.user = new User();
  }

  onRegisterFailed(error) {
    console.log(error);
    this.generateKeysDialog.hide();
  }

}
