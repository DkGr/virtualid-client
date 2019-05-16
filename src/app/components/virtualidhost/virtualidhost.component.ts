import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-virtualidhost',
  templateUrl: './virtualidhost.component.html',
  styleUrls: ['./virtualidhost.component.scss']
})
export class VirtualidhostComponent implements OnInit {

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
