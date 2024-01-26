import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from 'src/app/components/card/card.component';
import { AbstractForms } from 'src/app/shared/abstract-form';
import { FormsModule } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToolsService } from 'src/app/services/tools.service';
import { InputFloatingComponent } from 'src/app/components/input-floating/input-floating.component';
import { ButtonCbComponent } from 'src/app/components/button-cb/button-cb.component';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { EditorConfig } from '@ckeditor/ckeditor5-core';

@Component({
  selector: 'app-terms-of-use-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardComponent,
    InputFloatingComponent,
    ButtonCbComponent,
    RouterModule,
    CKEditorModule,
  ],
  providers: [ApiService],
  templateUrl: './terms-of-use-form.component.html',
  styleUrls: ['./terms-of-use-form.component.scss'],
})
export class TermsOfUseFormComponent extends AbstractForms {
  dados: any = {};

  Editor = ClassicEditor;
  config: EditorConfig = {
    language: 'pt-br',
  };
  back_url: any = {};

  constructor(
    service: ApiService,
    private activateRoute: ActivatedRoute,
    private route: Router,
    public tools: ToolsService
  ) {
    service.path = 'v1/terms';
    super(service);
    this.dados = { type: 'incentives' };
  }

  async ngOnInit() {
    if (history.state?.termsData) {
      this.dados = history.state?.termsData;
      // this.getDados(history.state?.termsData);
    }
    if (history.state?.back_url) {
      this.back_url = history.state?.back_url;
    }
  }

  getDados(id: any) {
    this.loading = true;
    this.service
      .listing({ id })
      .then((res) => {
        console.log('res', res);
        this.dados = res;
      })
      .finally(() => (this.loading = false));
  }

  submit(): void {
    if (!this.dados.id) {
      this.create(this.dados);
    } else {
      this.update(this.dados, this.dados.id);
      // this.loading = true;
      // this.service
      //   .postCustom(`v1/terms/` + this.dados.id, this.dados)
      //   .then((res) => {
      //     this.finish(res);
      //   })
      //   .finally(() => (this.loading = false));
    }
  }

  finish(result: any): void {
    this.route.navigate([this.back_url.url], {
      queryParams: this.back_url.params,
    });
  }
}
