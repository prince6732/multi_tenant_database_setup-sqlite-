import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transport } from '../../shared/interface/interface';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

const apiUrl = `${environment.apiUrl}/api/create-transport`;

@Injectable({
  providedIn: 'root',
})
export class CreateTransportService {
  constructor(private http: HttpClient) {}

  createTransport(
    request_id: string,
    FormData: FormData
  ): Observable<Transport> {
    return this.http.post<Transport>(`${apiUrl}/${request_id}`, FormData);
  }
}
