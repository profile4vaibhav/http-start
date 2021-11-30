import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Post } from './post.model';

import { map } from 'rxjs/operators';

import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFetching = false;

  constructor(
    private http: HttpClient,
    private postsService: PostsService
  ) {}

  ngOnInit() {

  }

  onCreatePost(postData: Post) {
    this.postsService.createAndStorePost(postData);
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPosts() {
    this.isFetching = true;
    // below block returns this sample data
      // -sdf34r54-sdcs-dfsdfsd
      // title: 'dsfsd'
      // content: 'sdfgsdf'
    this.http.get<{ [key: string]: Post }>(
      "https://http-start-46ee6-default-rtdb.firebaseio.com/posts.json"
    )

    // below block returns this sample data
      // {
      //   id: '  -sdf34r54-sdcs-dfsdfsd',
      //   title: 'dfgdfsgdsfg',
      //   content: 'fsdfdsf'
      // }
    .pipe(
      map(responseData => {
        const postArray: Post[] = [];
        for(const key in responseData) {
          postArray.push({ ...responseData[key], id: key })
        }
        return postArray;
      })
    )
    .subscribe(posts => {
      this.isFetching = false;
      this.loadedPosts = posts;
    })
  }
}
