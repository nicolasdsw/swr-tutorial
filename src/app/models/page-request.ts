import { HttpParams } from '@angular/common/http';

export class PageRequest {
  page: number;
  size: number;
  sort: string[];

  constructor(page?: number, size?: number, sort?: string[]) {
    this.page = page;
    this.size = size;
    this.sort = sort;
  }

  toHttpParams() {
    const pageParams = { ...this };
    if (pageParams.page === 0) {
      delete pageParams.page;
    }
    return new HttpParams({
      fromObject: Object.entries(pageParams).reduce(
        (a, [k, v]) => (v === undefined || v === null || v === '' ? a : ((a[k] = v), a)),
        {},
      ),
    });
  }
}
