import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotContextMenuDirective } from 'src/app/directives/not-context-menu.directive';
import { PDFSource, PdfViewerModule } from 'ng2-pdf-viewer';
import { ApiService } from 'src/app/services/api.service';
import { ToolsService } from 'src/app/services/tools.service';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-modal-view-doc',
  standalone: true,
  imports: [
    CommonModule,
    // ModalComponent,
    NotContextMenuDirective,
    PdfViewerModule,
    SpinnerComponent,
  ],
  templateUrl: './modal-view-doc.component.html',
  styleUrls: ['./modal-view-doc.component.scss'],
})
export class ModalViewDocComponent {
  loading = false;

  pdfData: any;

  constructor(
    public service: ApiService,
    public tools: ToolsService,
    public dialogRef: DialogRef,
    @Inject(DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    // if (this.tools.isFileType('pdf', this.data.path)) {
    //   this.service.downloadPdf(this.data.file_url).subscribe((res) => {
    //     console.log('res', res);
    //     this.pdfData = res;
    //   });
    // }
  }
}
