import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Popsicle } from './popsicle';

describe('Popsicle', () => {
  let component: Popsicle;
  let fixture: ComponentFixture<Popsicle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Popsicle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Popsicle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
