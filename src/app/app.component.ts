import { Component } from '@angular/core';

import { Post } from './post.model';

import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loadedPosts: Post[] = [];
  isFetching = false;
  error = null;

  constructor(
    private postsService: PostsService
  ) {}


  onCreatePost(postData: Post) {
    this.postsService.createAndStorePost(postData);
  }

  onFetchPosts() {
    this.isFetching = true;
    this.postsService.fetchPosts().subscribe(posts => {
      this.isFetching = false;
      this.loadedPosts = posts;
    }, error => {
      this.isFetching = false;
      this.error = error.message;
      console.log(error);
    } );
  }

  onHandleError() {
    this.error = null;
  }

  onClearPosts() {
    this.postsService.deletePosts().subscribe(() => {
      this.loadedPosts = [];
    })
  }

}
