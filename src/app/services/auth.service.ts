import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginRequestBody } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  base_url = environment.url;

  constructor(private http: HttpClient) {}

  login(dados: any): Promise<any> {
    const requestBody = this.buildLoginRequestBody(dados.email, dados.password);
    return lastValueFrom(this.http.post(`${this.base_url}/oauth/token`, requestBody));
  }

  getUserByToken(queryParams: any = {}): Promise<any> {
    return lastValueFrom(
      this.http.post(`${this.base_url}/v1/me`, { params: queryParams })
    );
  }

  resetPassword(email: string) {
    return this.http.post(`${this.base_url}/v1/forgot-password`, { email });
  }

  private buildLoginRequestBody(
    email: string,
    password: string
  ): LoginRequestBody {
    return {
      grant_type: 'password',
      client_id: '2',
      client_secret: environment.api_key,
      username: email,
      password: password,
      scope: '*',
    };
  }
}
