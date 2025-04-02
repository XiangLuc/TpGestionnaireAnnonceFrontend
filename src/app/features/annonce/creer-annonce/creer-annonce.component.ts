import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AnnonceService} from '../../../core/services/annonce.service';
import {Router} from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-creer-annonce',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './creer-annonce.component.html',
  styleUrl: './creer-annonce.component.css'
})
export class CreerAnnonceComponent {

  annonceForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private fb: FormBuilder, private annonceService: AnnonceService, private router: Router) {
    this.annonceForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      adress: ['', [Validators.required, Validators.maxLength(200)]],
      mail: ['', [Validators.required, Validators.email]]
    });
  }

  submitAnnonce(): void {
    if (this.annonceForm.valid) {
      const annonceData = this.annonceForm.value;

      this.annonceService.addAnnonce(annonceData).subscribe({
        next: (response) => {
          this.successMessage = 'Annonce créée avec succès!';
          this.router.navigate(['/annonces']);  // Rediriger vers la page des annonces
        },
        error: (err) => {
          this.errorMessage = 'Erreur lors de la création de l\'annonce.';
          console.error(err);
        }
      });
    } else {
      this.errorMessage = 'Veuillez remplir correctement tous les champs.';
    }
  }

  getErrorMessage(field: string): string {
    const control = this.annonceForm.get(field);
    if (control?.hasError('required')) {
      return `${field} est requis.`;
    } else if (control?.hasError('maxlength')) {
      return `${field} dépasse la longueur maximale autorisée.`;
    } else if (control?.hasError('email')) {
      return 'Veuillez entrer une adresse email valide.';
    }
    return '';
  }
}
