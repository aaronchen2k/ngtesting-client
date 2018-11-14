import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../../../theme/nga.module';

import { routing }       from './issue-workflow.routing';

import { NgbModalModule, NgbPaginationModule, NgbDropdownModule,
  NgbTabsetModule, NgbButtonsModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

import { PipeModule } from '../../../../pipe/pipe.module';
import { DirectiveModule } from '../../../../directive/directive.module';
import { PopDialogModule } from '../../../../components/pop-dialog';

import { RouteService } from '../../../../service/route';
import { RequestService } from '../../../../service/request';
import { DatetimePickerService } from '../../../../service/datetime-picker';

import { IssueWorkflowService } from '../../../../service/admin/issue-workflow';
import { IssueWorkflowSolutionService } from '../../../../service/admin/issue-workflow-solution';

import { IssueWorkflow } from '.';
import { IssueWorkflowList } from './workflow-list';
import { IssueWorkflowEdit } from './workflow-edit';
import { IssueWorkflowDesign } from './workflow-design';
import { IssueWorkflowSolutionList } from './workflow-solution-list';
import { IssueWorkflowSolutionEdit } from './workflow-solution-edit';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    NgaModule,
    routing,

    NgbModalModule, NgbPaginationModule, NgbDropdownModule,
    NgbTabsetModule, NgbButtonsModule, NgbCollapseModule,

    PipeModule, DirectiveModule, PopDialogModule,
  ],
  declarations: [
    IssueWorkflow,
    IssueWorkflowList,
    IssueWorkflowEdit,
    IssueWorkflowDesign,
    IssueWorkflowSolutionList,
    IssueWorkflowSolutionEdit,
  ],
  providers: [
    RouteService,
    RequestService,
    DatetimePickerService,
    IssueWorkflowService,
    IssueWorkflowSolutionService,
  ],
})
export class IssueWorkflowModule {}