import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SubscriptionTypes } from '../../shared/interface/interface';

const apiUrl = `${environment.apiUrl}/api/subscription-types`;

@Injectable({
  providedIn: 'root',
})
export class SubscriptionTypesService {
  constructor(private http: HttpClient) {}

  createSubscriptionType(formData: FormData): Observable<SubscriptionTypes> {
    return this.http.post<SubscriptionTypes>(`${apiUrl}`, formData);
  }

  getAllSubscriptionTypes(): Observable<SubscriptionTypes[]> {
    return this.http.get<SubscriptionTypes[]>(`${apiUrl}`);
  }

  updateSubscriptionType(
    id: number,
    formData: FormData
  ): Observable<SubscriptionTypes> {
    return this.http.put<SubscriptionTypes>(`${apiUrl}/${id}`, formData);
  }

  deleteSubscriptionType(id: number): Observable<SubscriptionTypes> {
    return this.http.delete<SubscriptionTypes>(`${apiUrl}/${id}`);
  }
}
