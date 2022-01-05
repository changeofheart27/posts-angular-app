import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Post } from 'src/app/post';
import { PostService } from 'src/app/post.service';


@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  post: Post | undefined;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private postService: PostService
  ) { }

  ngOnInit(): void {
    this.getPost();
  }

  getPost(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.postService.getPost(id).subscribe(post => this.post = post);
  }

  goBack(): void {
    this.location.back();
  }

}
