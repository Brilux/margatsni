import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FeedComponent } from './components/feed/feed.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';


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
        path: 'profile/:id',
        component: ProfileComponent
      },
      {
        path: 'edit-profile',
        component: ProfileEditComponent
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
