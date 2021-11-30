import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Post } from "./post.model";

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(
    private http: HttpClient,
  ) {

  }

  createAndStorePost(receivedPostData: Post) {
    const postData: Post = receivedPostData;

    this.http.post<{ name: string }>(
      'https://http-start-46ee6-default-rtdb.firebaseio.com/posts.json',
      postData
    ).subscribe(responseData => {
      console.log(responseData);
    })
  }

  fetchPosts() {

  }
}
