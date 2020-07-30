import { Injectable } from '@angular/core';
import { PageRequest } from '../models/page-request';
import { PageResponse } from '../models/page-response';
import { Post } from '../models/post';
import { SwrService } from './swr.service';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private swrService: SwrService) {}

  getPosts(pageRequest: PageRequest) {
    return this.swrService.get<PageResponse<Post>>('http://localhost:8080/api/posts', {
      params: pageRequest?.toHttpParams(),
    });
  }
}
