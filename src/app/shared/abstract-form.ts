import { NgForm } from '@angular/forms';
import { ApiService } from '../services/api.service';

export abstract class AbstractForms {
  loading = false;

  constructor(public service: ApiService) {}

  abstract submit(form:NgForm): void;
  abstract finish(result: any): void;

  onSubmit(form: NgForm) {
    console.log('onSubmit', form);

    if (form.status == 'VALID') {
      this.submit(form);
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

  async delete(id: any) {
    this.loading = true;
    await this.service
      .delete(id)
      .then((res) => {
        this.finish(res);
      })
      .finally(() => (this.loading = false));
  }
}
