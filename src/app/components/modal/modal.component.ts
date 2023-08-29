import { Component, ElementRef, AfterViewInit, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Modal } from 'flowbite';
import type { ModalOptions, ModalInterface } from 'flowbite';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { ModalSuccessComponent } from '../modal-success/modal-success.component';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  private modal!: ModalInterface;
  private modalSuccess!: ModalInterface;

  resetForm: FormGroup = new FormGroup({
    email: new FormControl(null),
    password: new FormControl(null)
  });

  constructor(
    private apiService: ApiService,
    private router: Router,
    private elRef: ElementRef,
    private formBuilder: FormBuilder,
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef
    ){

  }

  ngOnInit() {
    this.resetForm = this.formBuilder.group({
      email: [null],
      password: [null]
    })
  }

  onSubmit(){

    const emailReset = this.resetForm.get('email')?.value;

    // this.apiService.resetPassword(emailReset).subscribe(
    //   response => {
    //     alert('Login successful');
    //     console.log('Acesso Realizado com sucesso!', response);
    //   },
    //   error => {
    //     console.error('Email não encontrado!', error);
    //     alert('Não foi possivel resetar a senha!');
    //   }
    // );
  }

  ngAfterViewInit() {
    const modalOptions: ModalOptions = {
      backdrop: 'dynamic',
      backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
      closable: true,
      onHide: () => {
        console.log('modal is hidden');
      },
      onShow: () => {
        console.log('modal is shown');
      },
      onToggle: () => {
        console.log('modal has been toggled');
      }
    };

    this.modal = new Modal(this.elRef.nativeElement.querySelector('#authentication-modal'), modalOptions);
  }

  show() {
    this.modal.show();
  }

  hide() {
    this.modal.hide();
  }


  showSuccessModal() {
    const factory = this.componentFactoryResolver.resolveComponentFactory(ModalSuccessComponent);
    this.viewContainerRef.clear();
    const componentRef = this.viewContainerRef.createComponent(factory);
    this.modalSuccess = new Modal(componentRef.location.nativeElement, {});
    this.modalSuccess.show();
  }
}
