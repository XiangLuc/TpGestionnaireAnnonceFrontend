import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAnnonceDetailsComponent } from './page-annonce-details.component';

describe('PageAnnonceDetailsComponent', () => {
  let component: PageAnnonceDetailsComponent;
  let fixture: ComponentFixture<PageAnnonceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageAnnonceDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageAnnonceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
