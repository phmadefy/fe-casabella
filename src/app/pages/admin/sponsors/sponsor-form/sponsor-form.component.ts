import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardComponent } from 'src/app/components/card/card.component';
import { InputFloatingComponent } from 'src/app/components/input-floating/input-floating.component';
import { ButtonCbComponent } from 'src/app/components/button-cb/button-cb.component';
import { RouterLink } from '@angular/router';
import { ImageSelectComponent } from 'src/app/components/image-select/image-select.component';
import { ApiService } from 'src/app/services/api.service';
import { AbstractForms } from 'src/app/shared/abstract-form';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
  selector: 'app-sponsor-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardComponent,
    InputFloatingComponent,
    ButtonCbComponent,
    RouterLink,
    ImageSelectComponent,
  ],
  providers: [ApiService],
  templateUrl: './sponsor-form.component.html',
  styleUrls: ['./sponsor-form.component.scss'],
})
export class SponsorFormComponent extends AbstractForms {
  dados: any = { active: true, balance: 0 };
  file!: File;

  constructor(service: ApiService, public tools: ToolsService) {
    service.path = 'v1/partners';
    super(service);
  }

  ngOnInit(): void {
    if (history.state?.sponsor_id) {
      this.getDados(history.state?.sponsor_id);
    }
  }

  getDados(id: any) {
    this.loading = true;
    this.service
      .show(id)
      .then((res) => {
        console.log('res', res);
        this.dados = res;
      })
      .finally(() => (this.loading = false));
  }

  override submit(): void {
    const formData = this.tools.generateFormData(this.dados);
    formData.append('image', this.file);

    if (this.dados.id) {
      this.update(formData, this.dados.id);
    } else {
      this.create(formData);
    }
  }
  override finish(result: any): void {
    // throw new Error('Method not implemented.');
    // this.getDados(result.id);
    this.tools.route.navigate(['/admin/sponsors'], {
      queryParams: { tab: 'active' },
    });
  }
}
