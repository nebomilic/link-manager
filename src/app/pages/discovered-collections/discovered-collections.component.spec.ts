import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoveredCollectionsComponent } from './discovered-collections.component';

describe('DiscoveredCollectionsComponent', () => {
  let component: DiscoveredCollectionsComponent;
  let fixture: ComponentFixture<DiscoveredCollectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscoveredCollectionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscoveredCollectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
