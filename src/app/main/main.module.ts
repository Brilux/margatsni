import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { NavComponent } from './components/nav/nav.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { FeedComponent } from './components/feed/feed.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatDialogModule, MatDividerModule,
  MatFormFieldModule, MatIconModule,
  MatInputModule,
  MatProgressSpinnerModule
} from '@angular/material';
import { UserProfileEditComponent } from './components/user-profile-edit/user-profile-edit.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SearchComponent } from './components/search/search.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UserPostEditComponent } from './components/user-post-edit/user-post-edit.component';
import { PostReviewComponent } from './components/post-review/post-review.component';
import { FollowersComponent } from './components/followers/followers.component';
import { FollowingComponent } from './components/following/following.component';

@NgModule({
  declarations: [
    MainComponent,
    NavComponent,
    UserProfileComponent,
    FeedComponent,
    CreatePostComponent,
    UserProfileEditComponent,
    SearchComponent,
    ProfileComponent,
    UserPostEditComponent,
    PostReviewComponent,
    FollowersComponent,
    FollowingComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatProgressSpinnerModule,
    InfiniteScrollModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    MatAutocompleteModule
  ],
  entryComponents: [FollowersComponent, FollowingComponent]
})
export class MainModule { }
