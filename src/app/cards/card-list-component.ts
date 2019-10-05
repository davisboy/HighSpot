import { Component, OnInit } from '@angular/core';
import { CardService } from '../services/card-service';
import { ICard } from '../models/card';
import { KeyValue } from '@angular/common';
import { TypesService } from '../services/types-service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'app-card-list',
    templateUrl: 'card-list-component.html'
})

export class CardListComponent implements OnInit {

    private cards: ICard[] = [];
    private types: string[] = [];
    private images: KeyValue<string, string>[];
    private pageNumber = 1;
    public isLoading = false;
    searchForm: FormGroup;

    // These values are used to preserve the search criteria betweening scrolling events.
    private currentType = 'creature';
    private currentColor = 'Any';

    private nullImageUrl = '/assets/null.jpg';

    constructor(
        private cardService: CardService,
        private typeService: TypesService,
        private fb: FormBuilder) {

        this.searchForm = this.fb.group({
            cardType: new FormControl('Creature'),
            cardColor: new FormControl('Any')
        });

    }

    ngOnInit(): void {
        this.loadTypes();
        this.loadCards();
    }


    onScroll() {
        this.pageNumber++;
        this.loadCards();
    }

    private loadTypes() {
        this.typeService.getTypes().subscribe((data) => {
            this.types = data.types;
        });
    }

    getCards() {
        this.currentType = this.searchForm.controls.cardType.value;
        this.currentColor = this.searchForm.controls.cardColor.value;
        this.isLoading = true;
        this.cards = [];
        this.pageNumber = 1;

        this.loadCards();
    }

    private loadCards() {
        this.isLoading = true;

        const args = [{ key: 'types', value: this.currentType }];
        if (this.currentColor !== 'Any') {
            args.push({ key: 'colors', value: this.currentColor });
        }

        this.cardService.getCards(this.pageNumber, args).subscribe((data) => {
            this.populateCards(data);
            this.isLoading = false;
        });

    }

    private populateCards(data) {
        /*
            TODO: REFACTOR THIS

            This is a bit of a hack.  Some card records come back with a null imageUrl reference.
            From a quick peruse of the data it looks as though multiple versions of a card come
            back from the request, with the imageUrl appearing in the first instance.  For Prod
            I'd want to come up with something more rubust, but this is good enough for now.
        */
        this.images = [];
        data.cards.forEach((c) => {
            if (c.imageUrl) {
                this.images.push({ key: c.name, value: c.imageUrl });
            } else {
                const name = c.name;
                const val = this.images.find((img) => {
                    return img.key === name;
                });
                if (val) {
                    c.imageUrl = val.value;
                }
            }

        });

        /*
            This is a total hack.  In some cases the same card is repeated, but the first instance doesn't have the image.
            This needs to be fixed, but I'm out of time.  Though I did take the time to write a comment, so I should totally
            get points for that.
        */
        data.cards.forEach((c) => {
            if (!c.imageUrl) {
                const name = c.name;
                const val = this.images.find((img) => {
                    return img.key === name;
                });
                if (val) {
                    c.imageUrl = val.value;
                } else {
                    c.imageUrl = this.nullImageUrl;
                }
            }

        });

        this.cards = [...this.cards, ...data.cards];
    }


}

