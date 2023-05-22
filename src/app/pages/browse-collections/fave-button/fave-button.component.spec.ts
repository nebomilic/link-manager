import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaveButtonComponent } from './fave-button.component';

describe('FaveButtonComponent', () => {
  let component: FaveButtonComponent;
  let fixture: ComponentFixture<FaveButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaveButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaveButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
