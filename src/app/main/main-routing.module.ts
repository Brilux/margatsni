import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { FeedComponent } from './components/feed/feed.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { UserProfileEditComponent } from './components/user-profile-edit/user-profile-edit.component';
import { ProfileComponent } from './components/profile/profile.component';


const mainRoutes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: FeedComponent
      },
      {
        path: 'post-create',
        component: CreatePostComponent
      },
      {
        path: 'user-profile/:id',
        component: UserProfileComponent
      },
      {
        path: 'edit-profile',
        component: UserProfileEditComponent
      },
      {
        path: 'profile/:id',
        component: ProfileComponent
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
