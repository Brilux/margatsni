import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { PostsModel } from '../../models/posts.model';
import { UserSearchModel } from '../../models/user-search.model';
import { TagsModel } from '../../models/tags.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  public getUsersForSearchByUsername(username, page): Observable<UserSearchModel> {
    return this.http.get<UserSearchModel>(`/users/?page=${page}&username_query=${username}`).pipe(
      map(response => new UserSearchModel(response)),
      catchError(err => throwError(err)));
  }

  public getTagByName(tagName): Observable<TagsModel> {
    return this.http.get<TagsModel>(`/posts/tags?name_query=${tagName}`).pipe(
      map(response => new TagsModel(response)),
      catchError(err => throwError(err)));
  }

  public getPostsWithTag(tagName): Observable<PostsModel> {
    return this.http.get<PostsModel>(`/posts/tags/${tagName}`).pipe(
      map(response => new PostsModel(response)),
      catchError(err => throwError(err)));
  }
}
