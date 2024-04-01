import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { CardComponent } from 'src/app/components/card/card.component';
import { ApiService } from 'src/app/services/api.service';
import { ComboboxComponent } from 'src/app/components/combobox/combobox.component';
import { InputFloatingComponent } from 'src/app/components/input-floating/input-floating.component';
import { SelectDefaultComponent } from 'src/app/components/select-default/select-default.component';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardComponent,
    ComboboxComponent,
    InputFloatingComponent,
    SelectDefaultComponent,
    SpinnerComponent,
  ],
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  providers: [ApiService],
})
export class ReportComponent {
  loading = false;

  dados: any = { returnReport: 'pdf' };
  optionsReport: any[] = [
    {
      key: 'rescue-floral',
      label: 'Florais Regatados',
    },
  ];

  optionsRescue: any[] = [
    {
      key: '',
      label: 'Todos',
    },
    {
      key: 'cash',
      label: 'Dinheiro',
    },
    {
      key: 'products',
      label: 'Produtos',
    },
  ];

  optionsReturnReport: any[] = [
    {
      key: 'pdf',
      label: 'PDF',
    },
    {
      key: 'excel',
      label: 'Excel',
    },
  ];

  constructor(private apiService: ApiService) {}

  showFilter(types: string) {
    const typesList: any[] = types.split(',');
    if (typesList.includes(this.dados.type)) {
      return true;
    }

    return false;
  }

  submit(form: NgForm) {
    console.log('submit', form);

    if (!form.valid) {
      return;
    }

    this.loading = true;

    // this.apiService
    //   .downloadBlobPost(
    //     this.apiService.baseUrl + `/v1/admin/reports/${this.dados.type}`,
    //     this.dados
    //   )
    //   .subscribe(
    //     (data: any) => {
    //       const blob = new Blob([data]);

    //       var downloadURL = window.URL.createObjectURL(blob);
    //       var link = document.createElement('a');
    //       link.href = downloadURL;
    //       link.download = `report.pdf`;
    //       link.click();
    //       link.remove();
    //       this.loading = false;
    //     },
    //     (err) => {
    //       this.loading = false;
    //     }
    //   );

    this.apiService
      .postCustom(`v1/admin/reports/${this.dados.type}`, this.dados)
      .then((res) => {
        console.log('reports', res);
        window.open(res, '_blank');
      })
      .finally(() => (this.loading = false));
  }
}
