import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    // console.log(postData);
    this.http.post(
      'https://http-start-46ee6-default-rtdb.firebaseio.com/posts.json',
      postData
    ).subscribe(responseData => {
      console.log(responseData);
    })
  }

  onFetchPosts() {
    // Send Http request
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPosts() {
    this.http.get(
      "https://http-start-46ee6-default-rtdb.firebaseio.com/posts.json"
    )
    .pipe(
      map(responseData => {
        const postArray = [];
        for(const key in responseData) {
          postArray.push({ ...responseData[key], id: key })
        }
        return postArray;
      })
    )
    .subscribe(posts => {
      console.log(posts);
    })
  }
}
