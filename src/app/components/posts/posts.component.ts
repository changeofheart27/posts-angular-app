import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Post } from 'src/app/post';
import { PostService } from 'src/app/post.service';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];
  orderHeader: string = '';
  isDescOrder: boolean = true;
  searchTerm!: string;
  filter = new FormControl('');
  
  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.getPosts();
  }

  sort(headerName: string): void {
    this.orderHeader = headerName;
    this.isDescOrder = !this.isDescOrder;
  }

  getPosts(): void {
    this.postService.getPosts().subscribe((posts) => (this.posts = posts));
  }

  deletePost(post: Post): void {
    this.posts = this.posts.filter(p => p !== post);
    this.postService.deletePost(post.id).subscribe();
  }
}
