import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonsModule, WavesModule, DropdownModule, PopoverModule  } from 'angular-bootstrap-md'
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

import { Post, CreatePost } from '../../models/post';
import { PostService } from '../../services/post.service';
import { getDecodedAccessToken } from '../../auth.tools';

@Component({
  selector: 'app-virtualidhost',
  templateUrl: './virtualidhost.component.html',
  styleUrls: ['./virtualidhost.component.scss']
})
export class VirtualidhostComponent implements OnInit {

  sendPostForm: FormGroup;

  newPost: CreatePost = new CreatePost()

  allPosts: Post[];

  isLoadingPosts = false;

  constructor(private postService: PostService, private router: Router) { }

  ngOnInit() {
    if(!this.hasToken()){
      this.router.navigateByUrl('');
    }
    this.sendPostForm = new FormGroup({
      newPostContent: new FormControl(null, Validators.required)
    });
    this.getAllPosts();
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

  getAllPosts(): void {
    this.isLoadingPosts = true;
    this.postService.getAllPosts()
      .subscribe(posts => this.onGetAllPostsSuccess(posts),
                 error => this.onGetAllPostsFailed(error));
  }

  onGetAllPostsSuccess(posts){
    this.allPosts = posts
    this.isLoadingPosts = false;
  }

  onGetAllPostsFailed(error){
    this.isLoadingPosts = false;
  }

  sendNewPost(){
    let tokenInfo = getDecodedAccessToken();
    this.newPost.authorid = tokenInfo.id;
    this.newPost.date = new Date();
    this.postService.sendPost(this.newPost)
      .subscribe(
        data => this.onSendPostSuccess(),
        error => this.onSendPostFailed(error)
      );
    this.newPost = new CreatePost();
  }

  onSendPostSuccess() {
    this.newPost = new CreatePost();
    this.sendPostForm.reset();
    this.getAllPosts();
  }

  onSendPostFailed(error) {
    console.log(error);
  }

}
