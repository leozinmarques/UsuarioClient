import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Escolaridade } from '../models/escolaridade';

const baseUrl = 'https://localhost:44346/api/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  public Escolaridade: Escolaridade[] = [
    { escolaridade: 1, descricao: 'Infantil'},
    { escolaridade: 2, descricao: 'Fundamental'},
    { escolaridade: 3, descricao: 'Médio'},
    { escolaridade: 4, descricao: 'Superior'}
  ]

  protected headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = this.HeadersAuthorization();
   }

  getAll(): Observable<any> {
    return this.http.get(baseUrl, {headers: this.headers});
  }

  get(id): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`, {headers: this.headers});
  }

  create(data): Observable<any> {
    return this.http.post(baseUrl, data, {headers: this.headers});
  }

  update(data): Observable<any> {
    return this.http.put(baseUrl, data, {headers: this.headers});
  }

  delete(id): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`, {headers: this.headers});
  }

  protected HeadersAuthorization(): HttpHeaders {
      const headers = new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      });
      return headers;
  }
}
