import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { NavComponent } from './components/nav/nav.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FeedComponent } from './components/feed/feed.component';

@NgModule({
  declarations: [
    MainComponent,
    NavComponent,
    ProfileComponent,
    FeedComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule
  ],
  bootstrap: [MainComponent]
})
export class MainModule { }
