import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { State } from '../../shared/interface/interface';
import { environment } from '../../../environments/environment';

const apiUrl = `${environment.apiUrl}/api/states`;

@Injectable({
  providedIn: 'root',
})
export class StateService {
  constructor(private http: HttpClient) {}

  createState(formData: FormData): Observable<State> {
    return this.http.post<State>(`${apiUrl}`, formData);
  }

  // get all states
  getAllStates(): Observable<State[]> {
    return this.http.get<State[]>(apiUrl);
  }

  updateState(id: number, formData: FormData): Observable<State> {
    return this.http.put<State>(`${apiUrl}/${id}`, formData);
  }

  deleteState(id: number): Observable<State> {
    return this.http.delete<State>(`${apiUrl}/${id}`);
  }
}
