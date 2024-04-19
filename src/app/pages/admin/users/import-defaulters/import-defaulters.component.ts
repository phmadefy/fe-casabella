import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from 'src/app/components/card/card.component';
import { InputFileComponent } from 'src/app/components/input-file/input-file.component';
import { ToolsService } from 'src/app/services/tools.service';
import { FormsModule, NgForm } from '@angular/forms';
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
  providers: [ApiService],
})
export class ImportDefaultersComponent {
  loading = false;
  selectedFile!: File;
  constructor(public service: ApiService, public tools: ToolsService) {}

  selectFile(event: any[]) {
    this.selectedFile = event[0];
  }

  save(form: NgForm) {
    const data = new FormData();
    data.append('csvfile', this.selectedFile);

    this.loading = true;
    this.service
      .postCustom('v1/users/import/status', data)
      .then(() => {
        form.resetForm();
      })
      .finally(() => (this.loading = false));
  }
}
