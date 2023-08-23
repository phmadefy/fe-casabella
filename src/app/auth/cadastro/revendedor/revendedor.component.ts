import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { StepperComponent } from 'src/app/components/stepper/stepper.component';
import { InputFloatingComponent } from 'src/app/components/input-floating/input-floating.component';
import { DropzoneComponent } from 'src/app/components/dropzone/dropzone.component';

@Component({
  selector: 'app-revendedor',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    StepperComponent,
    InputFloatingComponent,
    DropzoneComponent,
  ],
  templateUrl: './revendedor.component.html',
  styleUrls: ['./revendedor.component.scss'],
})
export class RevendedorComponent {
  dealerForm: FormGroup = new FormGroup({
    email: new FormControl(null),
    password: new FormControl(null),
  });

  currentStep = 0;
  fileToUpload: File | null = null;

  steps = Array(4).fill(0);

  dados: any = {};

  files: File[] = [];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.dealerForm = this.formBuilder.group({
      name: [null],
      cpf: [null],
      dataNasc: [null],
      email: [null],
      telefone: [null],
      cidade: [null],
      uf: [null],
    });
  }

  submitForm(): void {
    const formData = this.dealerForm.value;
    console.log('test form', formData);
    this.apiService.signupFormColab(formData).subscribe(
      (response) => {
        console.log('Resposta da API:', response);
      },
      (error) => {
        console.error('Erro ao enviar os dados para a API:', error);
      }
    );
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
