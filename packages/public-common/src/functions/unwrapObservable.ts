import { Observable } from 'rxjs';

export function unwrapObservable<T>(promiseResolvedWithObservable: Promise<Observable<T>>): Observable<T> {
  return new Observable((observer) => {
    promiseResolvedWithObservable.then((observable) => observable.subscribe(observer));
  });
}
