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
import { ToolsService } from 'src/app/services/tools.service';
import { ComboboxComponent } from 'src/app/components/combobox/combobox.component';
import { AvatarComponent } from 'src/app/components/avatar/avatar.component';

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
    ComboboxComponent,
    AvatarComponent,
  ],
  templateUrl: './colaborador.component.html',
  styleUrls: ['./colaborador.component.scss'],
})
export class ColaboradorComponent {
  currentStep = 0;
  fileToUpload: File | null = null;

  steps = Array(4).fill(0);

  dados: any = { address: {}, is_collaborator: true };

  files: File[] = [];

  optionsStates: any[] = [];
  optionsCities: any[] = [];

  loading = false;

  constructor(
    private router: Router,
    public tools: ToolsService,
    private service: ApiService
  ) {
    service.path = 'v1/register';
  }

  async ngOnInit() {
    this.optionsStates = await this.service.getStates();
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

  async changeAvatar(event: any) {
    this.dados.avatar = await this.tools.toBase64(event.target.files[0]);
    console.log('changeAvatar', this.dados);
  }

  finish(): void {
    const formData = new FormData();
    Object.keys(this.dados).forEach((key) => {
      if (typeof this.dados[key] == 'object') {
        formData.append(key, JSON.stringify(this.dados[key]));
      } else {
        formData.append(key, this.dados[key]);
      }
    });

    for (let file of this.files) {
      formData.append('attachments[]', file);
    }

    this.loading = true;
    this.service
      .create(formData)
      .then((res) => {
        this.nextStep();
      })
      .finally(() => (this.loading = false));
  }

  async getCities(uf: string) {
    this.optionsCities = await this.service.getCities(uf);
  }
}
