import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  path = '';

  constructor(private http: HttpClient) {}

  getBaseUrl() {
    return `${environment.url}/${this.path}`;
  }

  listing(queryParams: any = {}): Promise<any> {
    return lastValueFrom(
      this.http.get(`${this.getBaseUrl()}`, { params: queryParams })
    );
  }
  create(data: any): Promise<any> {
    return lastValueFrom(this.http.post(`${this.getBaseUrl()}`, data));
  }
  show(id: any): Promise<any> {
    return lastValueFrom(this.http.get(`${this.getBaseUrl()}/${id}`));
  }
  update(data: any, id: any): Promise<any> {
    return lastValueFrom(this.http.put(`${this.getBaseUrl()}/${id}`, data));
  }
  delete(id: any): Promise<any> {
    return lastValueFrom(this.http.delete(`${this.getBaseUrl()}/${id}`));
  }

  getCustom(path: string, dados: any = {}): Promise<any> {
    return lastValueFrom(
      this.http.get(`${environment.url}/${path}`, { params: dados })
    );
  }

  postCustom(path: string, dados: any = {}): Promise<any> {
    return lastValueFrom(this.http.post(`${environment.url}/${path}`, dados));
  }
  updateCustom(path: string, dados: any = {}): Promise<any> {
    return lastValueFrom(this.http.put(`${environment.url}/${path}`, dados));
  }
  deleteCustom(path: string, dados: any = {}): Promise<any> {
    return lastValueFrom(this.http.delete(`${environment.url}/${path}`, dados));
  }

  async getByCep(cep: string) {
    if (cep.length < 8) {
      return;
    }
    cep = cep.replace(/\D/g, '');
    const result = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    return await result.json();
  }

  async getSegments(dados: any = {}): Promise<any> {
    const result: any = await lastValueFrom(
      this.http.get(`${environment.url}/v1/segments`, { params: dados })
    );
    return result.data;
  }

  async getDepartments(dados: any = {}): Promise<any> {
    const result: any = await lastValueFrom(
      this.http.get(`${environment.url}/v1/departments`, { params: dados })
    );
    return result.data;
  }

  async getRoles(dados: any = {}): Promise<any> {
    const result: any = await lastValueFrom(
      this.http.get(`${environment.url}/v1/roles`, { params: dados })
    );
    return result.data;
  }

  async getAccessGroups(dados: any = {}): Promise<any> {
    const result: any = await lastValueFrom(
      this.http.get(`${environment.url}/v1/groups`, { params: dados })
    );
    return result.data;
  }

  getStates(dados: any = {}): Promise<any> {
    return lastValueFrom(
      this.http.get(`${environment.url}/v1/states`, { params: dados })
    );
  }
  getCities(uf: string, dados: any = {}): Promise<any> {
    return lastValueFrom(
      this.http.get(`${environment.url}/v1/cities/${uf}`, { params: dados })
    );
  }
}
