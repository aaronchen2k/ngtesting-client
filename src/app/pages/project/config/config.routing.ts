import { Routes, RouterModule }  from '@angular/router';

import { ProjectConfig } from './config.component';

import { ProjectEditMember } from './member/member.component';

import { ProjectModuleList } from './module/list.component';
import { ProjectModuleEdit } from './module/edit.component';

import { ProjectVerList } from './ver/list.component';
import { ProjectVerEdit } from './ver/edit.component';

import { ProjectEnvList } from './env/list.component';
import { ProjectEnvEdit } from './env/edit.component';

import { ProjectTypeEdit } from './type/edit.component';
import { ProjectPriorityEdit } from './priority/edit.component';
import { ProjectPageEdit } from './page/edit.component';
import { ProjectWorkflowEdit } from './workflow/edit.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: ProjectConfig,
    children: [
      { path: 'module/list', component: ProjectModuleList },
      { path: 'module/:id', component: ProjectModuleEdit },

      { path: 'ver/list', component: ProjectVerList },
      { path: 'ver/:id', component: ProjectVerEdit },

      { path: 'env/list', component: ProjectEnvList },
      { path: 'env/:id', component: ProjectEnvEdit },

      { path: 'member', component: ProjectEditMember },

      { path: 'type/edit', component: ProjectTypeEdit },
      { path: 'priority/edit', component: ProjectPriorityEdit },
      { path: 'page/edit', component: ProjectPageEdit },
      { path: 'workflow/edit', component: ProjectWorkflowEdit },

    ],
  },
];

export const routing = RouterModule.forChild(routes);
