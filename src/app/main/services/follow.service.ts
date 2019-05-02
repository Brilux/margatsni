import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FollowService {

  private followingCount = new BehaviorSubject(NaN);

  public changeFollowingCount(project: number) {
    this.followingCount.next(project);
  }

  public getFollowingCountSubscription(): Observable<number> {
    return this.followingCount.asObservable();
  }
}
