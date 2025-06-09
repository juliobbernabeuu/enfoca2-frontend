import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FotoDetalleComponent } from './foto-detalle.component';

describe('FotoDetalleComponent', () => {
  let component: FotoDetalleComponent;
  let fixture: ComponentFixture<FotoDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FotoDetalleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FotoDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
