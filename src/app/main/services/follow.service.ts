import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FollowService {

  constructor() { }

  private followingCount = new BehaviorSubject(true);

  public changeFollowingCount(project: any) {
    this.followingCount.next(project);
  }

  public getFollowingCountSubscription(): Observable<any> {
    return this.followingCount.asObservable();
  }
}
