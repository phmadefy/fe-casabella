import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractForms } from 'src/app/shared/abstract-form';
import { ApiService } from 'src/app/services/api.service';
import { ToolsService } from 'src/app/services/tools.service';
import { FormsModule } from '@angular/forms';
import { CardComponent } from 'src/app/components/card/card.component';
import { InputFileComponent } from 'src/app/components/input-file/input-file.component';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';

@Component({
  selector: 'app-import-users',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardComponent,
    InputFileComponent,
    SpinnerComponent,
  ],
  templateUrl: './import-users.component.html',
  styleUrls: ['./import-users.component.scss'],
})
export class ImportUsersComponent extends AbstractForms {
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
