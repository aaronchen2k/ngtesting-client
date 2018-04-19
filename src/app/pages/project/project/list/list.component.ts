import { Component, ViewEncapsulation, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';

import { GlobalState } from '../../../../global.state';

import { CONSTANT } from '../../../../utils/constant';
import { WS_CONSTANT } from '../../../../utils/ws-constant';
import { Utils } from '../../../../utils/utils';
import { RouteService } from '../../../../service/route';
import { ProjectService } from '../../../../service/project';

@Component({
  selector: 'project-list',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./list.scss', '../../../../components/table-tree/src/styles.scss'],
  templateUrl: './list.html',
})
export class ProjectList implements OnInit, AfterViewInit, OnDestroy {
  eventCode: string = 'ProjectList';
  orgId: number;
  @ViewChild('#tree')tree: ElementRef;

  queryForm: FormGroup;
  queryModel: any = { keywords: '', disabled: 'false' };

  projects: any;
  maxLevel: number;
  statusMap: Array<any> = CONSTANT.EntityDisabled;

  isInit: boolean = false;

  constructor(private _route: ActivatedRoute, private router: Router, private _routeService: RouteService,
              private _state: GlobalState,
              private fb: FormBuilder, private el: ElementRef, private _projectService: ProjectService) {

    this._route.pathFromRoot[3].params.subscribe(params => {
      this.loadData();
    });

    this.queryForm = this.fb.group(
      {
        'disabled': ['', []],
        'keywords': ['', []],
      }, {},
    );
  }

  ngOnInit() {
    this.isInit = false;
    this.loadData();
  }

  ngAfterViewInit() {
    this.queryForm.valueChanges.debounceTime(CONSTANT.DebounceTime).subscribe(values => this.queryChange(values));
  }

  create(type: string): void {
    this._routeService.navTo('/pages/org/' + CONSTANT.CURR_ORG_ID + '/prjs/null/edit/' + type + '/info');
  }

  queryChange(values: any): void {
    this.loadData();
  }
  loadData() {
    this._projectService.list(this.queryModel).subscribe((json: any) => {
      this.projects = json.data;
      this.isInit = true;
    });
  }
  ngOnDestroy(): void {
    this._state.unsubscribe(WS_CONSTANT.WS_RECENT_PROJECTS, this.eventCode);
  };
}
