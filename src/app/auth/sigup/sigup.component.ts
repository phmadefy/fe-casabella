import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-sigup',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './sigup.component.html',
  styleUrls: ['./sigup.component.scss'],
})
export class SigupComponent {
  constructor(private router: Router) {}

  registerDealer(): void {
    this.router.navigate(['/auth/register-dealer']);
  }

  registerCollaborator(): void {
    this.router.navigate(['/auth/register-collaborator']);
  }
}
