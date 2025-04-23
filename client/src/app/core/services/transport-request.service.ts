import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TransportRequest } from '../../shared/interface/interface';

const apiUrl = `${environment.apiUrl}/api/transport-requests`;
// /api/transport-requests/:request_id

@Injectable({
  providedIn: 'root',
})
export class TransportRequestService {
  constructor(private http: HttpClient) {}

  getTransportRequest(): Observable<TransportRequest[]> {
    return this.http.get<TransportRequest[]>(`${apiUrl}/fresh`);
  }

  getTPReqByReqId(request_id: string): Observable<TransportRequest[]> {
    return this.http.get<TransportRequest[]>(`${apiUrl}/${request_id}`);
  }
}
