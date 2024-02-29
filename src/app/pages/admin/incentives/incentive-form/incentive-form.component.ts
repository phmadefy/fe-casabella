import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardComponent } from 'src/app/components/card/card.component';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';
import { ApiService } from 'src/app/services/api.service';
import { AbstractForms } from 'src/app/shared/abstract-form';
import { CheckboxComponent } from 'src/app/components/checkbox/checkbox.component';
import { NgxCurrencyDirective } from 'ngx-currency';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { EditorConfig } from '@ckeditor/ckeditor5-core';
import { ImageSelectComponent } from 'src/app/components/image-select/image-select.component';
import { CardChooseComponent } from 'src/app/components/card-choose/card-choose.component';
import { InputFloatingComponent } from 'src/app/components/input-floating/input-floating.component';
import { Status } from 'src/app/shared/properties';
import { SelectDefaultComponent } from 'src/app/components/select-default/select-default.component';
import { RouterLink } from '@angular/router';
import { ToolsService } from 'src/app/services/tools.service';
import { MessageService } from 'src/app/services/message.service';
import { EditorComponent } from 'src/app/components/editor/editor.component';
import { Dialog } from '@angular/cdk/dialog';
import { ModalMediaUploadComponent } from 'src/app/shared/modal-media-upload/modal-media-upload.component';
import { ModalViewDocComponent } from 'src/app/shared/modal-view-doc/modal-view-doc.component';
import { ModalViewSubscribeIncentiveComponent } from 'src/app/shared/modal-view-subscribe-incentive/modal-view-subscribe-incentive.component';

@Component({
  selector: 'app-incentive-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardComponent,
    CheckboxComponent,
    SpinnerComponent,
    NgxCurrencyDirective,
    CKEditorModule,
    ImageSelectComponent,
    CardChooseComponent,
    InputFloatingComponent,
    SelectDefaultComponent,
    RouterLink,
    EditorComponent,
  ],
  providers: [ApiService],
  templateUrl: './incentive-form.component.html',
  styleUrls: ['./incentive-form.component.scss'],
})
export class IncentiveFormComponent extends AbstractForms {
  dados: any = {
    editorData: '',
    public: [],
    segments_participate: [],
    segments_view: [],
    cities: [],
  };

  status = Status;

  constructor(
    service: ApiService,
    public tools: ToolsService,
    private messageService: MessageService,
    private dialog: Dialog
  ) {
    service.path = 'v1/incentives';
    super(service);
  }

  async ngOnInit() {
    if (history.state?.incentive_id) {
      console.log('history', history);
      this.getDados(history.state?.incentive_id);
    }
  }

  getDados(id: any) {
    this.loading = true;
    this.service
      .show(id)
      .then((res) => {
        console.log('res', res);
        this.dados = res;
        this.dados.nfts = this.tools.getPropertiesPivot(
          this.dados.nfts,
          'nft_id'
        );
        this.dados.public = this.getPublicSelected();
        this.dados.segments_participate = this.getSegmentParticipateSelected();
        this.dados.segments_view = this.getSegmentViewSelected();
        this.dados.cities = this.getCities();
      })
      .finally(() => (this.loading = false));
  }

  override async submit() {
    // console.log('IncentiveFormComponent', this.dados);

    const formData = this.tools.generateFormData(this.dados);

    if (!this.dados.id) {
      this.create(formData);
    } else {
      // this.update(formData, this.dados.id);
      this.loading = true;
      await this.service
        .postCustom(`v1/incentives/${this.dados.id}`, formData)
        .then((res) => {
          this.finish(res);
        })
        .finally(() => (this.loading = false));
    }
  }
  override finish(result: any): void {
    // throw new Error('Method not implemented.');
    this.tools.route.navigate(['/admin/incentives'], {
      queryParams: { tab: 'all' },
    });
  }

  async deleteItem() {
    this.messageService
      .presentAlertConfirm(
        'Você está <b>EXCLUINDO</b> esta campanha. A exclusão é irreversível, deseja continuar ?'
      )
      .closed.subscribe((res) => {
        if (res) {
          this.delete(this.dados.id);
        }
      });
  }

  getPublicSelected() {
    return this.dados?.public?.map((f: any) => f?.pivot?.person_type_id);
  }

  getSegmentParticipateSelected() {
    return this.dados?.segments_participate?.map(
      (f: any) => f?.pivot?.segment_id
    );
  }

  getSegmentViewSelected() {
    const data = this.dados?.segments_view?.map(
      (f: any) => f?.pivot?.segment_id
    );
    return data;
  }

  getCities() {
    return this.dados?.cities?.map((f: any) => f?.pivot?.city_id);
  }

  openParticipants() {
    const dialogRef = this.dialog.open<any>(
      ModalViewSubscribeIncentiveComponent,
      {
        width: '95%',
        maxWidth: '950px',
        maxHeight: '90%',
        data: { id: this.dados.id },
      }
    );
  }

  openRanking() {
    const dialogRef = this.dialog.open<any>(ModalViewDocComponent, {
      width: '95%',
      maxWidth: '700px',
      maxHeight: '90%',
      data: {
        file_url: this.dados.image_ranking_url,
        path: this.dados.image_ranking,
      },
    });
  }

  updateRanking() {
    const dialogRef = this.dialog.open<any>(ModalMediaUploadComponent, {
      width: '95%',
      maxWidth: '550px',
      maxHeight: '90%',
      data: {
        endpoint: `v1/incentives/${this.dados.id}/ranking`,
        inputFileName: 'image_ranking',
        accept: 'image/*',
        multipleFiles: false,
      },
    });

    dialogRef.closed.subscribe((res) => {
      this.getDados(this.dados.id);
    });
  }
}
