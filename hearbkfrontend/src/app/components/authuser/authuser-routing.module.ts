import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';
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
import { HistoryComponent } from './history/history.component';
import { AuthenticationGuard } from '../../components/shared/gaurds/authentication.guard';
import { InboxDashboardComponent } from './inbox-dashboard/inbox-dashboard.component';



const routes: Routes = [
  { path: '',component: DashboardComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    // canActivate: [AuthenticationGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    // canActivate: [AuthenticationGuard],
  },
  {
   path: 'search',
   component: SearchComponent
 },
 {
    path: 'previewprofile',
    component: PreviewprofileComponent ,
    // canActivate: [AuthenticationGuard],
  },
  {
    path: 'who-are-you',
    component: WhoAreYouComponent,
  },
  {
    path: 'fans-questions',
    component: FansQuestionsComponent,
  },
  {
    path: 'applicant-questions',
    component: ApplicantQuestionsComponent,
  },
  {
    path: 'bloggers',
    component: BloggersComponent,
  },
  {
    path: 'music-producers',
    component: MusicProducersComponent,
  },
  {
    path: 'influencers',
    component: InfluencersComponent,
  },
  {
    path: 'concert-goers',
    component: ConcertGoersComponent,
  },
  {
    path: 'radio-pros',
    component: RadioProsComponent,
  },
  {
    path: 'journalist',
    component: JournalistComponent,
  },
  {
    path: 'recording-artist',
    component: RecordingArtistComponent,
  },
  {
    path: 'publicists',
    component: PublicistsComponent,
  },
  {
    path: 'college-students',
    component: CollegeStudentComponent,
  },
  {
    path: 'dj',
    component: DjComponent,
  },
  {
    path: 'podcasters',
    component: PodcastersComponent,
  },
  {
    path: 'song-writers',
    component: SongWritersComponent,
  },
  {
    path: 'casting-agents',
    component: CastingAgentsComponent,
  },
  {
    path: 'super-fans',
    component: SuperFansComponent,
  },
  {
    path: 'stage-connects',
    component: StageConnectsComponent,
  },
  {
    path: 'inbox-dashboard',
    component: InboxDashboardComponent,
  },
  {
    path: 'history',
  component: HistoryComponent,
}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AuthuserRoutingModule { }
