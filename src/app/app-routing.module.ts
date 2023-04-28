import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomepageComponent } from './pages/static/homepage/homepage.component';

import { LoginComponent } from "./pages/login/login.component";
// import { SharedComponent } from './pages/demo/shared/shared.component';


const routes: Routes = [
  { path: '', component: HomepageComponent },
  // {
  //   path: 'shared',
  //   component: SharedComponent,
  // },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: 'classroom',
    loadChildren: () => import('./pages/classroom/classroom.module').then(m => m.ClassroomModule)
  },
  { path: '**', component: HomepageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
