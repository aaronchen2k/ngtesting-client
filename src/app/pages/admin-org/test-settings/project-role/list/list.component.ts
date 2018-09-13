import { Component, ViewEncapsulation, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GlobalState } from '../../../../../global.state';

import { CONSTANT } from '../../../../../utils/constant';
import { Utils } from '../../../../../utils/utils';
import { RouteService } from '../../../../../service/route';
import { ProjectRoleService } from '../../../../../service/project-role';

@Component({
  selector: 'role-list',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./list.scss'],
  templateUrl: './list.html',
})
export class ProjectRoleList implements OnInit, AfterViewInit {

  queryForm: FormGroup;
  queryModel: any = { keywords: '', disabled: 'false' };
  statusMap: any = CONSTANT.EntityDisabled;

  models: any;

  constructor(private _routeService: RouteService, private _state: GlobalState, private fb: FormBuilder, private el: ElementRef,
              private projectRoleService: ProjectRoleService) {
  }

  ngOnInit() {
    const that = this;

    that.queryForm = that.fb.group(
      {
        'disabled': ['', []],
        'keywords': ['', []],
      }, {},
    );

    that.loadData();
  }

  ngAfterViewInit() {
    const that = this;

    this.queryForm.valueChanges.debounceTime(CONSTANT.DebounceTime).subscribe(values => this.queryChange(values));
  }

  create(): void {
    const that = this;

    that._routeService.navTo('/pages/org-admin/org-settings/project-role/edit/null');
  }

  queryChange(values: any): void {
    const that = this;

    that.loadData();
  }

  edit($event: any): void {
    const that = this;

    console.log($event);
  }
  delete($event: any): void {
    const that = this;

    console.log($event);
  }

  loadData() {
    const that = this;

    that.projectRoleService.list(that.queryModel).subscribe((json: any) => {
      that.models = json.data;
    });
  }

}
