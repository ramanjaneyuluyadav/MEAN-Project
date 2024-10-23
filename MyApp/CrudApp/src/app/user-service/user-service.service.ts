import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private url = 'http://localhost:2000/api/'

  constructor(private http: HttpClient) {
  }

  getUserlist() {
    return this.http.get(this.url + 'users')
  }

  createUser(body: any) {
    return this.http.post(this.url + 'users', body)
  }

  updateUser(body: any) {
    return this.http.put(this.url + 'users', body)
  }

  deleteUser(userId: string) {
    return this.http.delete(this.url + 'users/' + userId);
  }
}
