import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { NavComponent } from './components/nav/nav.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FeedComponent } from './components/feed/feed.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatProgressSpinnerModule } from '@angular/material';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';

@NgModule({
  declarations: [
    MainComponent,
    NavComponent,
    ProfileComponent,
    FeedComponent,
    CreatePostComponent,
    ProfileEditComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatProgressSpinnerModule
  ],
  bootstrap: [MainComponent]
})
export class MainModule { }
