import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MedPageComponent } from './med-page/med-page.component';
import { LoginComponent } from './login/login.component';
import { InfoComponent } from './info/info.component';
import { DoctorTreatmentPageComponent } from './doctor-treatment-page/doctor-treatment-page.component';

export const routes: Routes = [
    {path: '', component:HomeComponent},
    {path: 'search/:searchTerm', component:HomeComponent},
    {path: 'tag/:tag', component:HomeComponent},
    {path: 'med/:id', component:MedPageComponent},
    {path: 'login', component:LoginComponent },
    {path: 'info', component:InfoComponent},
    { path: 'doctor/add-treatment', component: DoctorTreatmentPageComponent }
];