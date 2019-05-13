import { Component, OnInit, ViewChild } from '@angular/core';
import { ButtonsModule, WavesModule, CollapseModule, ModalModule, TooltipModule, PopoverModule } from 'angular-bootstrap-md'
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  signupFormModalName = new FormControl('', Validators.required);
  signupFormModalEmail = new FormControl('', Validators.email);
  signupFormModalPassword = new FormControl('', Validators.required);

  constructor() { }

  ngOnInit() {
  }

}
