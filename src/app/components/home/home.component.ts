import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
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

  loginForm: FormGroup;

  loginUser: User = new User();

  registerUser: User = new User();

  @ViewChild('generateKeysDialog') generateKeysDialog;

  @ViewChild('loggingInDialog') loggingInDialog;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    if(this.hasToken()){
      this.router.navigateByUrl('/virtualidhost');
    }

    this.registerForm = new FormGroup({
      registerUsername: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(15), Validators.pattern('[a-z0-9]*')]),
      registerEmail: new FormControl(null, [Validators.required, Validators.email]),
      registerPassword: new FormControl(null, [Validators.required, Validators.minLength(8)])
    });
    this.loginForm = new FormGroup({
      loginUsername: new FormControl(null, Validators.required),
      loginPassword: new FormControl(null, Validators.required)
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

  get loginUsernameInput() {
    return this.loginForm.get('loginUsername');
  }

  get loginPasswordInput() {
    return this.loginForm.get('loginPassword');
  }

  async onRegister() {
    this.generateKeysDialog.show();
    var options = {
        userIds: [{
          name: this.registerUser.username,
          email: "${this.user.username}@virtualid.fr"
        }],
        numBits: 4096,
        passphrase: this.registerUser.password
    };

    var keys = await openpgp.generateKey(options);
    this.registerUser.publicKey = keys.publicKeyArmored;
    this.registerUser.privateKey = keys.privateKeyArmored;

    this.userService.registerUser(this.registerUser)
      .subscribe(
        data => this.onRegisterSuccess(),
        error => this.onRegisterFailed(error)
      );
  }

  onRegisterSuccess() {
    this.generateKeysDialog.hide();
    this.registerUser = new User();
    this.registerForm.reset();
  }

  onRegisterFailed(error) {
    console.log(error);
    this.generateKeysDialog.hide();
  }

  async onLogin() {
    this.loggingInDialog.show();

    this.userService.loginUser(this.loginUser)
      .subscribe(
        data => this.onLoginSuccess(data),
        error => this.onLoginFailed(error)
      );
  }

  onLoginSuccess(data) {
    this.setSession(data);
    this.loggingInDialog.hide();
    this.loginUser = new User();
    this.loginForm.reset();
    this.router.navigateByUrl('/virtualidhost');
  }

  onLoginFailed(error) {
    console.log(error);
    this.loggingInDialog.hide();
  }

  private setSession(authResult) {
    localStorage.setItem('id_token', authResult.token);
  }

  logoutUser() {
    localStorage.removeItem("id_token");
  }

  public isLoggedIn() {
    return this.hasToken();
  }

  isLoggedOut() {
    return !this.hasToken();
  }

  hasToken() {
    const token = localStorage.getItem("id_token");
    return token != null;
  }

}
