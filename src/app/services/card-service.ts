import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ICardResponse } from '../models/card-response';
import { ServiceUtils } from './service-utilty';
import { KeyValue } from '@angular/common';

@Injectable()
export class CardService {

    private baseUrl: string;
    // Since the API is pretty slow, set this to true if you don't need fresh data. It will pull data from json files in the assets folder.
    private isDev = false;
    private pageSize = '50';
    private orderBy = 'name';

    constructor(
        private http: HttpClient,
        private utils: ServiceUtils) {
    }
    // PageNumber defualts to 1.  Other search arguments can be passed as an array of KeyValue pairs.
    getCards(page: number = 1, args: KeyValue<string, string>[] = null): Observable<ICardResponse> {
        this.setUrl(page);
        args.push({ key: 'page', value: page.toString() });
        args.push({ key: 'pageSize', value: this.pageSize });
        args.push({ key: 'orderBy', value: this.orderBy });
        const cardUrl = this.utils.getUrl(this.baseUrl, args);
        console.log(cardUrl);
        return this.http.get<ICardResponse>(cardUrl)
            .pipe(catchError(this.utils.handleError<ICardResponse>('getCards')));
    }

    setUrl(page: number = 1) {
        if (this.isDev) {
            this.baseUrl = `/assets/cards${page}.json?`;
        } else {
            this.baseUrl = 'https://api.magicthegathering.io/v1/cards?';
        }
    }
}

