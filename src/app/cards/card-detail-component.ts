import { Component, Input } from '@angular/core';
import { ICard } from '../models/card';

@Component({
    selector: 'app-card-detail',
    templateUrl: './card-detail-component.html'
})

export class CardDetailComponent {
    @Input() card: ICard;
}
