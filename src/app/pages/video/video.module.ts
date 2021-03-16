import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VideoPageRoutingModule } from './video-routing.module';

import { VideoPage } from './video.page';

import { YoutubeVideoPlayer } from "@ionic-native/youtube-video-player/ngx";
import { Ng2SearchPipeModule } from "ng2-search-filter";
@NgModule({
  imports: [
    CommonModule,
    Ng2SearchPipeModule,
    FormsModule,
    IonicModule,
    VideoPageRoutingModule,
  ],
  providers: [YoutubeVideoPlayer],
  declarations: [VideoPage],
})
export class VideoPageModule {}
