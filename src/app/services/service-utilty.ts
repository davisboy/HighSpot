import { KeyValue } from '@angular/common';
import { Observable, of } from 'rxjs';

export class ServiceUtils {

    public getUrl(path: string, args: KeyValue<string, string>[] = null): string {
        let returnValue = path;

        if (args) {
            args.forEach(el => {
                returnValue += `&${el.key}=${el.value}`;
            });
        }
        return returnValue;
    }

    public handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.log(error);
            console.error(`Error on ${operation}: ${JSON.stringify(error)}`);
            return of(result as T);
        };
    }
}
