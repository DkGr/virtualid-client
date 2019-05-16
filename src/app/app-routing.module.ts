import { HomeComponent } from './components/home/home.component';
import { VirtualidhostComponent } from './components/virtualidhost/virtualidhost.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'virtualidhost',
        component: VirtualidhostComponent
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
