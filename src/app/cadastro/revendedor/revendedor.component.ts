import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-revendedor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './revendedor.component.html',
  styleUrls: ['./revendedor.component.scss']
})
export class RevendedorComponent {

  currentStep = 1;
  fileToUpload: File | null = null;

  steps = Array(4).fill(0);


  nextStep(): void {
    if (this.currentStep < 4) {
      this.currentStep++;
    }
  }

  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  onFileSelected(event: any): void {
    this.fileToUpload = event.target.files.item(0);
  }

}
