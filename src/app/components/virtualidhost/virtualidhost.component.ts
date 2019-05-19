import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonsModule, WavesModule, DropdownModule, PopoverModule  } from 'angular-bootstrap-md'

import { Post } from '../../models/post';

@Component({
  selector: 'app-virtualidhost',
  templateUrl: './virtualidhost.component.html',
  styleUrls: ['./virtualidhost.component.scss']
})
export class VirtualidhostComponent implements OnInit {
  public html: string = '<span class="btn btn-danger">Your HTML here</span>';

  newPost: Post = new Post()

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

  setNewPostPublic(){
    this.newPost.visibility = 'public'
  }

  setNewPostFriends(){
    this.newPost.visibility = 'friends'
  }

}
