import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AnnonceService {
  private readonly API = environment.apiUrl;
  private readonly endpoint = 'api/annonce';

  constructor(private httpClient: HttpClient, private router: Router) {}

  getListAnnonces(): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.httpClient.get(`${this.API}/${this.endpoint}`, { headers });
  }

  addAnnonce(annonce: any): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.httpClient.post(`${this.API}/${this.endpoint}`, annonce, { headers });
  }

  deleteAnnonceById(id: number): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.httpClient.delete(`${this.API}/${this.endpoint}/${id}`, { headers });
  }

  getAnnonceById(id: number): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.httpClient.get(`${this.API}/${this.endpoint}/${id}`, { headers });
  }

  private createAuthorizationHeader(): HttpHeaders {
    const authToken = sessionStorage.getItem('auth');
    return authToken ? new HttpHeaders({ Authorization: `Basic ${authToken}` }) : new HttpHeaders();
  }
}
