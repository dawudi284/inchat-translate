import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  doesUserExist(userId: string) {
    const postUrl = "https://us-central1-inchat-tranlsate.cloudfunctions.net/doesUserExist";
    let postData = {
      'userId': userId
    };

    let response = null;
    const myObservable = this.http.post(postUrl, postData);

    const myObserver = {
      next: data => {
        const object = data;
        response = object.reponse;

        console.log(response);
      },
      error: err => console.error("Error on doesUserExist: " + err),
      complete: () => {
        console.log("doesUserExist complete.");
      }
    };

    return response;
  }

  deleteUser(userId: string) {
    const postUrl = "https://us-central1-inchat-tranlsate.cloudfunctions.net/deleteUser";
    let postData = {
      'userId': userId
    };

    let response = null;
    const myObservable = this.http.post(postUrl, postData);

    const myObserver = {
      next: data => {
        const object = data;
        response = object.reponse;

        console.log(response);
      },
      error: err => console.error("Error on deleteUser: " + err),
      complete: () => {
        console.log("deleteUser complete.");
      }
    };

    return response;
  }
}
