import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { messages } from '../model/messages.model';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class AllusersService {
  private baseUrl = 'http://localhost:8000/allusers';

  constructor(private httpClient: HttpClient) {}

  loginUser(user: User): Observable<Object> {
    return this.httpClient.post(`${this.baseUrl + '/login'}`, user, {
      withCredentials: true,
    });
  }

  logoutUser(): Observable<Object> {
    return this.httpClient.get(`${this.baseUrl + '/logout'}`, {
      withCredentials: true,
    });
  }

  registerUser(user: User): Observable<Object> {
    return this.httpClient.post(`${this.baseUrl + '/register'}`, user, {
      withCredentials: true,
    });
  }

  contactAdmin(mssg: messages): Observable<Object> {
    return this.httpClient.post(`${this.baseUrl + '/contact'}`, mssg);
  }

  isAdmin(mail: string): Observable<Object> {
    return this.httpClient.get<boolean>(`${this.baseUrl + '/isadmin/' + mail}`);
  }

  exportReportMission(id: number): Observable<Object> {
    return this.httpClient.get(`${this.baseUrl + '/raportmission/' + id}`, {
      withCredentials: true,
    });
  }

  generateReport(id: number): Observable<Object> {
    return this.httpClient.get(`${this.baseUrl + '/raport/' + id}`, {
      withCredentials: true,
    });
  }
}
