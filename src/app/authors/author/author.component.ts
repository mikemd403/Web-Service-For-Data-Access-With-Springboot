import { Component, OnDestroy, OnInit } from '@angular/core';
import {Author} from '../../books/model/book';
import {ActivatedRoute} from '@angular/router';
import {AuthorsServiceService} from '../service/authors-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-authors',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit, OnDestroy {
  selectedAuthor: Author;
  private subscription: Subscription;

  constructor(private route: ActivatedRoute, private authorsService: AuthorsServiceService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params =>{
      const id = params.id;
      console.log(params);
      this.subscription = this.authorsService.getAuthor(id).subscribe(
        (data: Author) => {
          this.selectedAuthor = data;
          console.log(this.selectedAuthor);
        },
        (_:any) => {
          this.selectedAuthor = null;
        }
      );
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
