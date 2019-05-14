import { Component, OnInit, ViewChild } from '@angular/core';
import { ButtonsModule, WavesModule, CollapseModule, ModalModule, TooltipModule, PopoverModule } from 'angular-bootstrap-md'
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

import * as openpgp from 'openpgp';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  registerForm: FormGroup;

  user: User = new User();

  @ViewChild('generateKeysDialog') generateKeysDialog;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      registerUsername: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(15), Validators.pattern('[a-z0-9]*')]),
      registerEmail: new FormControl(null, [Validators.required, Validators.email]),
      registerPassword: new FormControl(null, [Validators.required, Validators.minLength(8)])
    });
  }

  get registerUsernameInput() {
    return this.registerForm.get('registerUsername');
  }

  get registerEmailInput() {
    return this.registerForm.get('registerEmail');
  }

  get registerPasswordInput() {
    return this.registerForm.get('registerPassword');
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
        data => this.onRegisterSuccess(),
        error => this.onRegisterFailed(error)
      );
  }

  onRegisterSuccess() {
    this.generateKeysDialog.hide();
    this.user = new User();
    this.registerForm.reset();
  }

  onRegisterFailed(error) {
    console.log(error);
    this.generateKeysDialog.hide();
  }

}
