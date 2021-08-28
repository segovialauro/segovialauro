import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesRoutingModule } from './pages/pages.routing';
import { AuthRoutingModule } from './auth/auth.routing';

//component
import { NopagefoundComponent } from './nopagefound/nopagefound.component';

const ROUTES: Routes = [   
    { path:'', redirectTo:'/dashboard', pathMatch:'full' },
    { path: '**', component: NopagefoundComponent }
]

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forRoot(ROUTES),
        PagesRoutingModule,
        AuthRoutingModule
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }