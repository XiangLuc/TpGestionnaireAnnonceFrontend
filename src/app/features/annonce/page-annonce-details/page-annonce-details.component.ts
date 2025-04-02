import {Component, OnInit} from '@angular/core';
import {AnnonceService} from '../../../core/services/annonce.service';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-page-annonce-details',
  standalone: true,
  imports: [
    RouterLink,
    NgIf
  ],
  templateUrl: './page-annonce-details.component.html',
  styleUrl: './page-annonce-details.component.css'
})
export class PageAnnonceDetailsComponent implements OnInit{

  annonce: any = null;
  errorMessage: string = '';

  constructor(private route: ActivatedRoute, private annonceService: AnnonceService) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;

    this.annonceService.getAnnonceById(id).subscribe({
      next: (data) => {
        this.annonce = data;
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors de la récupération des détails de l\'annonce.';
        console.error(err);
      }
    });
  }
}
