import { Routes, RouterModule }  from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { PrjResolve } from './prj.resolve';
import { Prj } from './prj.component';

import { ProjectView } from '../../../project/project/view/view.component';

// noinspection TypeScriptValidateTypes

export const routes: Routes = [
  {
    path: ':prjId',
    component: Prj,
    canActivate: [PrjResolve],
    children: [
      { path: 'view', component: ProjectView },

      { path: 'design', loadChildren: '../../../design/design.module#DesignModule' },
      { path: 'implement', loadChildren: '../../../implement/implement.module#ImplementModule' },

      { path: 'issue', loadChildren: '../../../issue/issue.module#IssueModule' },
      { path: 'issue-query', loadChildren: '../../../issue-query/issue-query.module#IssueQueryModule' },
    ],
  },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
