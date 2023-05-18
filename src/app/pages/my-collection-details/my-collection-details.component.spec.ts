import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCollectionDetailsComponent } from './my-collection-details.component';

describe('MyCollectionDetailsComponent', () => {
  let component: MyCollectionDetailsComponent;
  let fixture: ComponentFixture<MyCollectionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyCollectionDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyCollectionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
