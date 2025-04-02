import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageListeAnnoncesComponent } from './page-liste-annonces.component';

describe('PageListeAnnoncesComponent', () => {
  let component: PageListeAnnoncesComponent;
  let fixture: ComponentFixture<PageListeAnnoncesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageListeAnnoncesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageListeAnnoncesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
