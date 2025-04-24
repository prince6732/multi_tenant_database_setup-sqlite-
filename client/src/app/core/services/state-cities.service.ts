import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { City } from '../../shared/interface/interface';

const apiUrl = `${environment.apiUrl}/api/cities`;

@Injectable({
  providedIn: 'root',
})
export class StateCitiesService {
  constructor(private http: HttpClient) {}

  // get all cities by state id
  getAllCitiesByState(state_id: number): Observable<City[]> {
    return this.http.get<City[]>(`${apiUrl}/${state_id}`);
  }

  createCity(state_id: number, formData: FormData): Observable<City> {
    return this.http.post<City>(`${apiUrl}/${state_id}`, formData);
  }

  updateCity(id: number, formData: FormData): Observable<City> {
    return this.http.put<City>(`${apiUrl}/${id}`, formData);
  }

  deleteCity(id: number): Observable<City> {
    return this.http.delete<City>(`${apiUrl}/${id}`);
  }
}
