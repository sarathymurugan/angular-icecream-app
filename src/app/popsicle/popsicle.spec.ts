import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Popsiclecomponent } from './popsicle';

describe('Popsicle', () => {
  let component: Popsiclecomponent;
  let fixture: ComponentFixture<Popsiclecomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Popsiclecomponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Popsiclecomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

