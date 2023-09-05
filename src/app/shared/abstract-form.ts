import { NgForm } from '@angular/forms';
import { ApiService } from '../services/api.service';

export abstract class AbstractForms {
  loading = false;

  constructor(public service: ApiService) {}

  abstract submit(): void;
  abstract finish(result: any): void;

  onSubmit(form: NgForm) {
    if (form.status == 'VALID') {
      this.submit();
    }
  }

  async create(dados: any) {
    this.loading = true;
    await this.service
      .create(dados)
      .then((res) => {
        this.finish(res);
      })
      .finally(() => (this.loading = false));
  }

  async update(dados: any, id: any) {
    this.loading = true;
    await this.service
      .update(dados, id)
      .then((res) => {
        this.finish(res);
      })
      .finally(() => (this.loading = false));
  }
}
