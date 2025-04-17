import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { City } from '../../shared/interface/interface';

const apiUrl = `${environment.apiUrl}/api/states`;

@Injectable({
  providedIn: 'root',
})
export class StateCitiesService {
  constructor(private http: HttpClient) {}

  // get all cities by state id
  getAllCitiesByState(state_id: number): Observable<City[]> {
    return this.http.get<City[]>(`${apiUrl}/${state_id}/cities`);
  }
}
