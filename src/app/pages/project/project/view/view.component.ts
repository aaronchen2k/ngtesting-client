import { Component, ViewEncapsulation, ViewChild, QueryList, Query } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgModule, Pipe, OnInit, AfterViewInit, OnDestroy }      from '@angular/core';

import { CONSTANT } from '../../../../utils/constant';
import { ProjectService } from '../../../../service/client/project';
import { VerService } from '../../../../service/client/ver';
import { EnvService } from '../../../../service/client/env';
import { UserService } from '../../../../service/client/user';

import { ReportService } from '../../../../service/client/report';

declare var jQuery;

@Component({
  selector: 'project-view',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./view.scss'],
  templateUrl: './view.html',
})
export class ProjectView implements OnInit, AfterViewInit, OnDestroy {
  orgId: number;
  prjId: number;

  id: number;
  tab: string = 'ver';

  project: any = {};
  plans: any[] = [];
  histories: any = {};
  vers: any[] = [];
  envs: any[] = [];
  users: any[] = [];

  testChartData: any = {};
  issueChartData: any = {};

  routeSub: any;

  constructor(private _route: ActivatedRoute,
              private _verService: VerService, private _envService: EnvService, private _userService: UserService,
              private _projectService: ProjectService, private _reportService: ReportService) {
    this.orgId = CONSTANT.CURR_ORG_ID;
  }
  ngOnInit() {
    this.prjId = CONSTANT.CURR_PRJ_ID; // 注意：可能和下面的不同，this.id有可能是项目组的id

    this.routeSub = this._route.pathFromRoot[5].params.subscribe(params => {
      if (this.id != +params['prjId']) {
        this.id = +params['prjId'];
        this.loadData();
      }
    });
  }
  ngAfterViewInit() {

  }

  loadData() {
    if (!this.id) {
      return;
    }
    this._projectService.view(this.id).subscribe((json: any) => {
      this.project = json.project;
      this.plans = json.plans;
      this.histories = json.histories;

      if (json.project.type == 'project') {
        CONSTANT.CURR_PRJ_ID = this.project.id;
        CONSTANT.CURR_PRJ_NAME = this.project.name;
      }
    });

    this._reportService.projectTestReport(this.id).subscribe((json: any) => {
      this.testChartData = json.data;
    });
    this._reportService.projectIssueReport(this.id).subscribe((json: any) => {
      this.issueChartData = json.data;
    });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

}

