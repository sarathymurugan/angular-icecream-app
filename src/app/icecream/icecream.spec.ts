import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IcecreamComponent } from './icecream';

describe('Icecream', () => {
  let component: IcecreamComponent;
  let fixture: ComponentFixture<IcecreamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IcecreamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IcecreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

