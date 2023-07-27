import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginRequestBody } from '../model/auth.model';
import { environment } from 'src/environments/environment.development';



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = environment.API;

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
      client_secret: environment.API_KEY,
      username,
      password,
      scope: '*'
    };
  }
}
