import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Icecream } from './icecream';

describe('Icecream', () => {
  let component: Icecream;
  let fixture: ComponentFixture<Icecream>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Icecream]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Icecream);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
