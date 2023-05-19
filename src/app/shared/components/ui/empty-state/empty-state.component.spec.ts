import { ComponentFixture, TestBed } from '@angular/core/testing'

import { NoCollectionsStateComponent } from './empty-state.component'

describe('NoCollectionsStateComponent', () => {
    let component: NoCollectionsStateComponent
    let fixture: ComponentFixture<NoCollectionsStateComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [NoCollectionsStateComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(NoCollectionsStateComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
