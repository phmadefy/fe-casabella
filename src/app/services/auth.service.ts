import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  base_url = environment.url;

  constructor(private http: HttpClient) {}

  login(dados: any): Promise<any> {
    return lastValueFrom(this.http.post(`${this.base_url}/auth/login`, dados));
  }

  getUserByToken(queryParams: any = {}): Promise<any> {
    return lastValueFrom(
      this.http.get(`${this.base_url}/auth/profile`, { params: queryParams })
    );
  }
}
