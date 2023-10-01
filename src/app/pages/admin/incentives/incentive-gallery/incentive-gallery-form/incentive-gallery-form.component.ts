import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputFloatingComponent } from 'src/app/components/input-floating/input-floating.component';
import { CardComponent } from 'src/app/components/card/card.component';
import { FormsModule } from '@angular/forms';
import { ButtonCbComponent } from 'src/app/components/button-cb/button-cb.component';
import { CardChooseComponent } from 'src/app/components/card-choose/card-choose.component';
import { ImageSelectComponent } from 'src/app/components/image-select/image-select.component';
import { AbstractForms } from 'src/app/shared/abstract-form';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-incentive-gallery-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardComponent,
    InputFloatingComponent,
    ButtonCbComponent,
    CardChooseComponent,
    ImageSelectComponent,
  ],
  providers: [ApiService],
  templateUrl: './incentive-gallery-form.component.html',
  styleUrls: ['./incentive-gallery-form.component.scss'],
})
export class IncentiveGalleryFormComponent extends AbstractForms {
  dados: any = { editorData: '' };

  constructor(service: ApiService) {
    super(service);
  }

  override submit(): void {
    throw new Error('Method not implemented.');
  }
  override finish(result: any): void {
    throw new Error('Method not implemented.');
  }
}
