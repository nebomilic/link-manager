import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageFrameComponent } from './page-frame.component';

describe('PageFrameComponent', () => {
  let component: PageFrameComponent;
  let fixture: ComponentFixture<PageFrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageFrameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
