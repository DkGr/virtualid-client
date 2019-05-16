import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverModule, WavesModule } from 'angular-bootstrap-md'

@Component({
  selector: 'app-virtualidhost',
  templateUrl: './virtualidhost.component.html',
  styleUrls: ['./virtualidhost.component.scss']
})
export class VirtualidhostComponent implements OnInit {
  public html: string = '<span class="btn btn-danger">Your HTML here</span>';
  constructor(private router: Router) { }

  ngOnInit() {
    if(!this.hasToken()){
      this.router.navigateByUrl('');
    }
  }

  hasToken() {
    const token = localStorage.getItem("id_token");
    return token != null;
  }

}
