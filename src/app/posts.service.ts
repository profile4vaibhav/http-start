import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

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
    let myParams = new HttpParams();
    myParams = myParams.append('print', 'pretty');
    myParams = myParams.append('custom', 'key');
    // below block returns this sample data
      // -sdf34r54-sdcs-dfsdfsd
      // title: 'dsfsd'
      // content: 'sdfgsdf'
      return this.http.get<{ [key: string]: Post }>(
        "https://http-start-46ee6-default-rtdb.firebaseio.com/posts.json",
        {
          headers: new HttpHeaders({ 'Custom-Header': 'Hello' }),
          params: myParams
        }
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
      );
  }

  deletePosts() {
    return this.http.delete('https://http-start-46ee6-default-rtdb.firebaseio.com/posts.json');
  }
}
