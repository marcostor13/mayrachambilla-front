import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../interfaces/user';

export type CreateUserRequest = { displayName: string, password: string, email: string, role: string }
export type UpdateUserRequest = { uid: string } & CreateUserRequest

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  // private baseUrl = 'https://us-central1-mayra-chambilla.cloudfunctions.net/webApi/users'
  // private baseUrl = 'http://localhost:3000/users'
  private baseUrl = 'http://mayrachambilla.ml/users'

  constructor(
    private http: HttpClient
  ) { }

  
  get users$(): Observable<User[]> {
    return this.http.get<{ users: User[] }>(`${this.baseUrl}`).pipe(
      map(result => {
        return result.users
      })
    )
  }

  user$(id: string): Observable<User> {
    return this.http.get<{ user: User }>(`${this.baseUrl}/${id}`).pipe(
      map(result => {
        return result.user
      })
    )
  }

  create(user: CreateUserRequest) {
    return this.http.post(`${this.baseUrl}`, user)
  }

  edit(user: UpdateUserRequest) {
    return this.http.patch(`${this.baseUrl}/${user.uid}`, user)
  }

  delete(uid) {
    return this.http.delete(`${this.baseUrl}/${uid}`)
  }


}
