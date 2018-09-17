import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SearchComponent } from './search/search.component';
import { AuthService } from './services/auth.service';

const appRoutes: Routes = [
    { path: '', component: LoginComponent, canActivate: [AuthService] },
    { path: 'login', component: LoginComponent },
    { path: 'search', component: SearchComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);