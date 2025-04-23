import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { City, State } from '../../shared/interface/interface';
import { environment } from '../../../environments/environment';

const apiUrl = `${environment.apiUrl}/api/transport`;

@Injectable({
  providedIn: 'root',
})
export class TransportManagementService {
  constructor(private http: HttpClient) {}

  // get all states
  getAllStates(): Observable<State[]> {
    return this.http.get<State[]>(`${apiUrl}/states`);
  }

  // get all transport cities
  getAllTransportCities(state_id: number): Observable<City[]> {
    return this.http.get<City[]>(`${apiUrl}/${state_id}/cities`);
  }

  // get tenants by city id
  getTenantsByCity(city_id: number): Observable<City[]> {
    return this.http.get<City[]>(`${apiUrl}/tenants/${city_id}`);
  }
}
