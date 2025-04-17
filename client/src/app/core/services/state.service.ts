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

  // get all states
  getAllStates(): Observable<State[]> {
    return this.http.get<State[]>(apiUrl);
  }
}
