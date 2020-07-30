import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { PageRequest } from './models/page-request';
import { PageResponse } from './models/page-response';
import { PostsService } from './services/posts.service';
import { Post } from './models/post';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'swr-tutorial';

  posts$: Observable<PageResponse<Post>>;
  pageRequest = new PageRequest(0, 10);
  formGroup = new FormGroup({
    pageSize: new FormControl(10),
  });

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.fetchPosts();
  }

  fetchPosts() {
    this.posts$ = this.postsService.getPosts(this.pageRequest);
  }

  prevPage(): void {
    if (this.pageRequest.page > 0) {
      this.pageRequest.page -= 1;
      this.fetchPosts();
    }
  }

  nextPage(): void {
    this.pageRequest.page = (this.pageRequest.page || 0) + 1;
    this.fetchPosts();
  }

  changePageSize(): void {
    this.pageRequest.size = this.formGroup.value?.pageSize;
    this.fetchPosts();
  }
}
