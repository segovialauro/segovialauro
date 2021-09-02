import { Routes, RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { MedidaFormComponent } from './medida-form/medida-form.component';

export const routes: Routes = [
    {
        path: 'dashboard', 
        component: PagesComponent,
        children: [
            { path: '', component: DashboardComponent, data:{ titulo: 'dashboard'} },
            { path: 'progress', component: ProgressComponent, data:{ titulo: 'progress'} },
            { path: 'grafica1', component: Grafica1Component, data:{ titulo: 'grafica1'} },
            { path: 'account-settings', component: AccountSettingsComponent, data:{ titulo: 'account-settings'} },
            { path: 'medida-form', component: MedidaFormComponent, data:{ titulo: 'medida-form'} }
        ]
    },
];

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class PagesRoutingModule { }

