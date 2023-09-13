import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from 'src/app/components/card/card.component';
import { InputFileComponent } from 'src/app/components/input-file/input-file.component';
import { ToolsService } from 'src/app/services/tools.service';
import { FormsModule } from '@angular/forms';
import { AbstractForms } from 'src/app/shared/abstract-form';
import { ApiService } from 'src/app/services/api.service';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';

@Component({
  selector: 'app-import-defaulters',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardComponent,
    InputFileComponent,
    SpinnerComponent,
  ],
  templateUrl: './import-defaulters.component.html',
  styleUrls: ['./import-defaulters.component.scss'],
})
export class ImportDefaultersComponent extends AbstractForms {
  constructor(service: ApiService, public tools: ToolsService) {
    super(service);
  }

  submit(): void {
    throw new Error('Method not implemented.');
  }
  finish(result: any): void {
    throw new Error('Method not implemented.');
  }
}
