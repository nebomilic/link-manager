import { Component, Input } from '@angular/core'

@Component({
    selector: 'app-no-collections-state',
    templateUrl: './no-collections-state.component.html',
    styleUrls: ['./no-collections-state.component.scss'],
})
export class NoCollectionsStateComponent {
    @Input() description = ''
    @Input() hint = ''
}
