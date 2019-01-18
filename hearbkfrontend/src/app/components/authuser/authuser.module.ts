import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthuserRoutingModule } from './authuser-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { UserfilterPipe } from '../shared/pipes/userfilter.pipe';
import { TagsInputModule } from 'ngx-tags-input/dist';
import { PreviewprofileComponent } from './previewprofile/previewprofile.component';
import { WhoAreYouComponent } from './who-are-you/who-are-you.component';
import { FansQuestionsComponent } from './fans-questions/fans-questions.component';
import { ApplicantQuestionsComponent } from './applicant-questions/applicant-questions.component';
import { BloggersComponent } from './bloggers/bloggers.component';
import { MusicProducersComponent } from './music-producers/music-producers.component';
import { InfluencersComponent } from './influencers/influencers.component';
import { ConcertGoersComponent } from './concert-goers/concert-goers.component';
import { RadioProsComponent } from './radio-pros/radio-pros.component';
import { JournalistComponent } from './journalist/journalist.component';
import { RecordingArtistComponent } from './recording-artist/recording-artist.component';
import { PublicistsComponent } from './publicists/publicists.component';
import { CollegeStudentComponent } from './college-student/college-student.component';
import { DjComponent } from './dj/dj.component';
import { PodcastersComponent } from './podcasters/podcasters.component';
import { SongWritersComponent } from './song-writers/song-writers.component';
import { CastingAgentsComponent } from './casting-agents/casting-agents.component';
import { SuperFansComponent } from './super-fans/super-fans.component';
import { StageConnectsComponent } from './stage-connects/stage-connects.component';
import { AuthuserComponent } from './authuser.component';
import { HistoryComponent } from './history/history.component';
import { InboxDashboardComponent } from './inbox-dashboard/inbox-dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgMultiSelectDropDownModule,
    AuthuserRoutingModule,
    TagsInputModule,
  ],
  declarations: [
    DashboardComponent,
    ProfileComponent,
    SearchComponent,
    UserfilterPipe,
    PreviewprofileComponent,
    WhoAreYouComponent,
    FansQuestionsComponent,
    ApplicantQuestionsComponent,
    BloggersComponent,
    MusicProducersComponent,
    InfluencersComponent,
    ConcertGoersComponent, 
    RadioProsComponent,
    JournalistComponent,
    RecordingArtistComponent,
    PublicistsComponent,
    CollegeStudentComponent,
    DjComponent,
    PodcastersComponent,
    SongWritersComponent,
    CastingAgentsComponent,
    SuperFansComponent,
    StageConnectsComponent,
    AuthuserComponent,
    HistoryComponent,
    InboxDashboardComponent
  ]
})
export class AuthuserModule { }
