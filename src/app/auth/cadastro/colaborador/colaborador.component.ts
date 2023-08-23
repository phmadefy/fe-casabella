import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from 'src/app/services/api.service';
import { StepperComponent } from 'src/app/components/stepper/stepper.component';
import { InputFloatingComponent } from 'src/app/components/input-floating/input-floating.component';
import { DropzoneComponent } from 'src/app/components/dropzone/dropzone.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-colaborador',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StepperComponent,
    InputFloatingComponent,
    DropzoneComponent,
  ],
  templateUrl: './colaborador.component.html',
  styleUrls: ['./colaborador.component.scss'],
})
export class ColaboradorComponent {
  currentStep = 0;
  steps = Array(4).fill(0);

  dados: any = {};

  files: File[] = [];

  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit() {}

  submitForm(): void {
    // const formData = this.colabForm.value;
    // console.log('test form', formData);
    // this.apiService.signupFormColab(formData).subscribe(
    //   (response) => {
    //     console.log('Resposta da API:', response);
    //   },
    //   (error) => {
    //     console.error('Erro ao enviar os dados para a API:', error);
    //   }
    // );
  }

  nextStep(): void {
    if (this.currentStep < 4) {
      this.currentStep++;
    }
  }

  previousStep(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
    } else {
      this.router.navigate(['/auth']);
    }
  }

  onFileSelected(event: any): void {
    this.files.push(...event);
    console.log('onFileSelected', this.files);
  }

  finish(): void {
    this.submitForm();
  }
}
