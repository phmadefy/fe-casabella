import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginRequestBody, ResetRequestBody } from '../models/auth.model';
import { ColaboradorFormData } from '../models/signup.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.url;

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    const requestBody = this.buildLoginRequestBody(email, password);
    return this.http.post(`${this.apiUrl}/oauth/token`, requestBody);
  }

  resetPassword(email: string) {
    const requestBody = this.buildResetRequestBody(email);
    return this.http.post(`${this.apiUrl}/v1/forgot-password`, requestBody);
  }

  signupFormColab(formData: any) {
    const requestBody = this.buildFormColab(formData);
    return this.http.post(`${this.apiUrl}/v1/register`, requestBody);
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

  private buildResetRequestBody(email: string): ResetRequestBody {
    return {
      email: email,
    };
  }

  private buildFormColab(formData: ColaboradorFormData) {
    return {
      name: formData.name,
      cpf: formData.cpf,
      dataNasc: formData.dataNasc,
      email: formData.email,
      phone: formData.telefone,
      cidade: formData.cidade,
      uf: formData.uf,
      setor: formData.setor,
      cargo: formData.cargo,
    };
  }
}
