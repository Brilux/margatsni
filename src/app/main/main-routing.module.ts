import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { FeedComponent } from './components/feed/feed.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { UserProfileEditComponent } from './components/user-profile-edit/user-profile-edit.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UserPostEditComponent } from './components/user-post-edit/user-post-edit.component';
import { PostReviewComponent } from './components/post-review/post-review.component';
import { MainGuard } from './main.guard';
import { TagComponent } from './components/tag/tag.component';


const mainRoutes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: FeedComponent,
        canActivate: [MainGuard]
      },
      {
        path: 'post-create',
        component: CreatePostComponent,
        canActivate: [MainGuard]
      },
      {
        path: 'post-review/:id',
        component: PostReviewComponent
      },
      {
        path: 'edit-profile',
        component: UserProfileEditComponent,
        canActivate: [MainGuard]
      },
      {
        path: 'edit-post/:id',
        component: UserPostEditComponent,
        canActivate: [MainGuard]
      },
      {
        path: 'user-profile/:id',
        component: UserProfileComponent,
        canActivate: [MainGuard]
      },
      {
        path: 'profile/:id',
        component: ProfileComponent
      },
      {
        path: 'tag/:name',
        component: TagComponent,
        canActivate: [MainGuard]
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(mainRoutes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
