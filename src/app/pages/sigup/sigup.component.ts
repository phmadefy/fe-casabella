import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sigup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sigup.component.html',
  styleUrls: ['./sigup.component.scss']
})
export class SigupComponent {

  constructor(private router: Router) { }

  registerDealer(): void {
    this.router.navigate(['/register-dealer'])
  }
  
  registerCollaborator(): void {
    this.router.navigate(['/register-collaborator'])
  }
}
