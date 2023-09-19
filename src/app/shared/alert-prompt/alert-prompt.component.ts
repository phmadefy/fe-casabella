import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { DIALOG_DATA, DialogModule, DialogRef } from '@angular/cdk/dialog';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-alert-prompt',
  standalone: true,
  imports: [CommonModule, ModalComponent, DialogModule, FormsModule],
  templateUrl: './alert-prompt.component.html',
  styleUrls: ['./alert-prompt.component.scss'],
})
export class AlertPromptComponent {
  control: any;
  constructor(
    public dialogRef: DialogRef,
    @Inject(DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.control = this.data?.input?.value;
  }
}
