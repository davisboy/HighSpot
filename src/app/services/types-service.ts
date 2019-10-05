import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServiceUtils } from './service-utilty';
import { ITypesRespone } from '../models/types-response';
import { catchError } from 'rxjs/operators';


@Injectable()
export class TypesService {
    private url = 'https://api.magicthegathering.io/v1/types';
    private localUrl = '/assets/types.json';
    // The service is pretty slow, so set this to true to use a static list of types stored locally.  Mostly for iterating in Dev.
    private useLocal = true;
    constructor(
        private http: HttpClient,
        private utils: ServiceUtils) {
    }

    getTypes() {
        return this.http.get<ITypesRespone>(this.getUrl())
            .pipe(catchError(this.utils.handleError<ITypesRespone>('getCards')));
    }

    getUrl(): string {
        if (this.useLocal) {
            return this.localUrl;
        } else {
            return this.url;
        }
    }
}
