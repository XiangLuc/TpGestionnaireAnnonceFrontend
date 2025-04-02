import {Component, OnInit} from '@angular/core';
import {AnnonceService} from '../../../core/services/annonce.service';
import {NgForOf, NgIf} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-page-liste-annonces',
  standalone: true,
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './page-liste-annonces.component.html',
  styleUrl: './page-liste-annonces.component.css'
})
export class PageListeAnnoncesComponent implements OnInit {

  annonces: any[] = [];
  errorMessage: string = '';

  constructor(private annonceService: AnnonceService, private router: Router) {}

  ngOnInit(): void {
    this.fetchAnnonces();
  }

  fetchAnnonces(): void {
    this.annonceService.getListAnnonces().subscribe({
      next: (data) => {
        this.annonces = data;
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors de la récupération des annonces.';
        console.error(err);
      }
    });
  }

  viewAnnonce(id: number) {
    this.router.navigate([`/annonces/${id}`]);
  }

  deleteAnnonce(id: number) {
    const confirmDelete = confirm('Êtes-vous sûr de vouloir supprimer cette annonce ?');
    if (confirmDelete) {
      this.annonceService.deleteAnnonceById(id).subscribe({
        next: () => {
          this.fetchAnnonces();
        },
        error: (err) => {
          this.errorMessage = 'Erreur lors de la suppression de l\'annonce.';
          console.error(err);
        }
      });
    }
  }
}
