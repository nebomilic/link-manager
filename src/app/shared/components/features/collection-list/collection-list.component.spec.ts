import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { CollectionListComponent } from './collection-list.component';
import { Collection } from 'src/app/types';
import { EmptyStateComponent } from '../../ui/empty-state/empty-state.component';
import { InfoBannerComponent } from '../../ui/info-banner/info-banner.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireModule } from '@angular/fire/compat';

@Component({
  selector: 'app-collection-list',
  template: '',
})
class MockCollectionListComponent {
  @Input() collections: Collection[] | null = [];
  @Input() emptyDescription = '';
  @Input() emptyHint = '';
}

const EMPTY_STATE_DESCRIPTION = 'No collections found';
const EMPTY_STATE_HINT = 'Create a new collection to get started';
const COLLECTIONS_MOCK: Collection[] = [
  {
    id: '1',
    authorId:  '1',
    title: 'Collection 1',
    description: 'Description 1',
    public: true,
    views: 0,
    likes: 0,
    links: [],
  },
  {
    id: '2',
    authorId:  '2',
    title: 'Collection 2',
    description: 'Description 2',
    public: true,
    views: 0,
    likes: 0,
    links: [],
  },
];



describe('CollectionListComponent', () => {
  let component: CollectionListComponent;
  let fixture: ComponentFixture<CollectionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CollectionListComponent, MockCollectionListComponent, EmptyStateComponent, InfoBannerComponent],
      imports: [MatIconModule, MatCardModule, MatListModule, RouterModule, RouterTestingModule, AngularFireModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display empty hint and description when collections is empty', () => {
    component.collections = [];
    component.emptyDescription = EMPTY_STATE_DESCRIPTION;
    component.emptyHint = EMPTY_STATE_HINT;
    fixture.detectChanges();
    const emptyHintElement = fixture.nativeElement.querySelector('.info-banner-text');
    const emptyDescriptionElement = fixture.nativeElement.querySelector('.info-text');
    expect(emptyHintElement.textContent).toContain(EMPTY_STATE_HINT);
    expect(emptyDescriptionElement.textContent).toContain(EMPTY_STATE_DESCRIPTION);
  });
  
  it('should not display empty hint and description when collections is not empty', () => {
    component.collections = COLLECTIONS_MOCK;
    component.emptyDescription = EMPTY_STATE_DESCRIPTION;
    component.emptyHint = EMPTY_STATE_HINT;
    fixture.detectChanges();
    const emptyHintElement = fixture.nativeElement.querySelector('.info-banner-text');
    const emptyDescriptionElement = fixture.nativeElement.querySelector('.info-text');
    expect(emptyHintElement).toBeNull();
    expect(emptyDescriptionElement).toBeNull();
  });
  

  it('should display collection list when collections is not empty', () => {
    component.collections = COLLECTIONS_MOCK;
    component.emptyDescription = EMPTY_STATE_DESCRIPTION;
    component.emptyHint = EMPTY_STATE_HINT;
    fixture.detectChanges();
    const listElements = fixture.nativeElement.querySelector('.collection-item-container');
    expect(listElements).not.toBeNull();
  });
  

  it('should not display collection list when collections is empty', () => {
    component.collections = [];
    component.emptyDescription = EMPTY_STATE_DESCRIPTION;
    component.emptyHint = EMPTY_STATE_HINT;
    fixture.detectChanges();
    const listElements = fixture.nativeElement.querySelector('.collection-item-container');
    expect(listElements).toBeNull();
  });

});

