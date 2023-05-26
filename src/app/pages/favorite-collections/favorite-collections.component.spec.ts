import { ComponentFixture, TestBed } from '@angular/core/testing'

import { FavoriteCollectionsComponent } from './favorite-collections.component'

describe('DiscoveredCollectionsComponent', () => {
    let component: FavoriteCollectionsComponent
    let fixture: ComponentFixture<FavoriteCollectionsComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FavoriteCollectionsComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(FavoriteCollectionsComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
