import { Routes } from '@angular/router';
import { DemoComponent } from './demo.component';

export default [
    {
        path: '',
        component: DemoComponent,
        children: [
            {
                path: 'styles',
                loadChildren: () => import('./pages/styles/styles-routing')
            },
            {
                path: 'shared',
                loadChildren: () => import('./pages/shared/shared-routing')
            }
        ]
    }
] as Routes;

