import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginRequestBody } from '../model/auth.model';



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'https://api-cbella-01.azurewebsites.net';

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    const requestBody = this.buildLoginRequestBody(username, password);
    return this.http.post(`${this.apiUrl}/oauth/token/`, requestBody)
  }

  private buildLoginRequestBody(username: string, password: string): LoginRequestBody {
    console.log('CHEGOU aqui', username, password);
    return {
      grant_type: 'password',
      client_id: '2',
      client_secret: 'IfQNgVFKgNb5aj9I9k8XIj5niAx7Koqnii8tBM7y',
      username,
      password,
      scope: '*'
    };
  }
}
