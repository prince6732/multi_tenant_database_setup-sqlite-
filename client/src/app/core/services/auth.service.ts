import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../shared/models/user.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

const apiUrl = `${environment.apiUrl}/api/auth/`;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  // user login
  login(formData: FormData): Observable<{ user: User; accessToken: string }> {
    return this.http.post<{ user: User; accessToken: string }>(
      apiUrl + 'login',
      formData,
      httpOptions
    );
  }
}
