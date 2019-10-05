import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ICard } from '../models/card';

@Component({
    selector: 'app-my-cards',
    templateUrl: './cards-component.html'
})

export class CardsComponent implements OnInit, OnDestroy {

    @Input() cards: ICard[] = [];
    @Input() options = {};
    @Output() scrolled = new EventEmitter();
    @ViewChild('anchor') anchor: ElementRef<HTMLElement>;

    private observer: IntersectionObserver;

    constructor(private host: ElementRef) { }

    get element() {
        return this.host.nativeElement;
    }

    ngOnInit(): void {

        const options = {
            root: this.isHostScrollable() ? this.host.nativeElement : null,
            ...this.options
        };

        this.observer = new IntersectionObserver(([entry]) => {
            entry.isIntersecting && this.scrolled.emit();
        }, options);

        this.observer.observe(this.anchor.nativeElement);

    }

    private isHostScrollable() {
        const style = window.getComputedStyle(this.element);

        return style.getPropertyValue('overflow') === 'auto'
            || style.getPropertyValue('overflow-y') === 'scroll';
    }

    ngOnDestroy(): void {
        this.observer.disconnect();
    }
}
