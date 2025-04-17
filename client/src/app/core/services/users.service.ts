import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from '../../shared/interface/interface';
import { environment } from '../../../environments/environment';

const apiUrl = `${environment.apiUrl}/api/users`;

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  // create user
  createUser(formData: FormData): Observable<Users> {
    return this.http.post<Users>(apiUrl, formData);
  }

  // get user by id
  getUserById(userId: number): Observable<Users> {
    return this.http.get<Users>(`${apiUrl}/${userId}`);
  }

  // get all users
  getAllUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(apiUrl);
  }

  // update user
  updateUser(userId: number, data: FormData): Observable<Users> {
    return this.http.put<Users>(`${apiUrl}/${userId}`, data);
  }

  // delete user
  deleteUser(userId: number): Observable<Users> {
    return this.http.delete<Users>(`${apiUrl}/${userId}`);
  }
}
