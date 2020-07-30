import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SwrService {
  private cache = new Map<string, Subject<any>>();
  private cacheCountUpdates = new Map<string, number>();

  constructor(private http: HttpClient) {}

  get<T>(
    url,
    options?: {
      params?: HttpParams;
    },
  ): Observable<T> {
    let requestCode = url;
    if (options?.params) {
      requestCode += options.params.toString();
    }

    if (!this.cache.get(requestCode)) {
      this.cache.set(requestCode, new BehaviorSubject(null));
    }

    this.http
      .get(url, options)
      .pipe(
        take(1),
        tap((res: any) => {
          const cacheCount = (this.cacheCountUpdates.get(requestCode) || 0) + 1;
          this.cacheCountUpdates.set(requestCode, cacheCount);
          this.cache.get(requestCode).next({ ...res, cacheCount });
        }),
      )
      .subscribe();

    return this.cache.get(requestCode).asObservable();
  }
}
