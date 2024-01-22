import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { initFlowbite } from 'flowbite';
import { Dropdown } from 'flowbite';
import type { DropdownOptions, DropdownInterface } from 'flowbite';

@Component({
  selector: 'btn-like',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './btn-like.component.html',
  styleUrls: ['./btn-like.component.scss'],
})
export class BtnLikeComponent {
  @Input() id = 'btn-like';
  @Input() interaction = '';
  active = false;

  @Output() changeOption = new EventEmitter<any>();

  dropdown!: DropdownInterface;

  ngOnInit(): void {
    setTimeout(() => {
      this.startDropDown();
    }, 200);
  }

  startDropDown() {
    // set the dropdown menu element
    const $targetEl: HTMLElement | null = document.getElementById(
      'dropMenu' + this.id
    );

    // console.log('targetEl', $targetEl, 'dropMenu' + this.id);

    // set the element that trigger the dropdown menu on click
    const $triggerEl: HTMLElement | null = document.getElementById(
      'dropBtn' + this.id
    );

    // console.log('triggerEl', $triggerEl, 'dropBtn' + this.id);

    // options with default values
    const options: DropdownOptions = {
      placement: 'top',
      triggerType: 'click',
      offsetSkidding: 0,
      offsetDistance: 10,
      delay: 200,
      // onHide: () => {
      //   console.log('dropdown has been hidden');
      // },
      // onShow: () => {
      //   console.log('dropdown has been shown');
      // },
      // onToggle: () => {
      //   console.log('dropdown has been toggled');
      // },
    };

    // instance options object
    // const instanceOptions: InstanceOptions = {
    //   id: 'dropdownMenu',
    //   override: true,
    // };

    /*
     * targetEl: required
     * triggerEl: required
     * options: optional
     * instanceOptions: optional
     */
    this.dropdown = new Dropdown($targetEl, $triggerEl, options);

    // show the dropdown
    // dropdown.show();
  }
}
