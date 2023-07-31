import { Component, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Modal } from 'flowbite';
import type { ModalOptions, ModalInterface } from 'flowbite';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  private modal!: ModalInterface;

  constructor(private elRef: ElementRef){

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

  toggle() {
    this.modal.toggle();
  }
}
