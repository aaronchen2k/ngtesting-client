import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgModule, Pipe, OnInit, AfterViewInit }      from '@angular/core';

import { NgbModalModule, NgbPaginationModule, NgbDropdownModule,
  NgbTabsetModule, NgbButtonsModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';

import { GlobalState } from '../../../../../global.state';

import { CONSTANT } from '../../../../../utils/constant';
import { Utils } from '../../../../../utils/utils';
import { ValidatorUtils, PhoneValidator } from '../../../../../validator';
import { RouteService } from '../../../../../service/route';

import { IssueStatusService } from '../../../../../service/admin/issue-status';
import { PopDialogComponent } from '../../../../../components/pop-dialog';

declare var jQuery;

@Component({
  selector: 'issue-status-edit',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./edit.scss'],
  templateUrl: './edit.html',
})
export class IssueStatusEdit implements OnInit, AfterViewInit {

  id: number;

  model: any = {};
  categories: any[] = [];
  form: FormGroup;

  @ViewChild('modalWrapper') modalWrapper: PopDialogComponent;

  constructor(private _state: GlobalState, private _routeService: RouteService, private _route: ActivatedRoute,
              private fb: FormBuilder, private issueStatusService: IssueStatusService) {

  }
  ngOnInit() {
    this._route.params.forEach(params => {
      this.id = +params['id'];
    });

    this.loadData();
    this.buildForm();
  }
  ngAfterViewInit() {}

  buildForm(): void {
    this.form = this.fb.group(
      {
        'label': ['', [Validators.required]],
        /*'value': ['', [Validators.required]],*/
        'categoryId': ['', [Validators.required]],
        'descr': ['', []],
      }, {},
    );

    this.form.valueChanges.debounceTime(CONSTANT.DebounceTime).subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }
  onValueChanged(data?: any) {
    const that = this;
    that.formErrors = ValidatorUtils.genMsg(that.form, that.validateMsg, []);
  }

  formErrors = [];
  validateMsg = {
    'label': {
      'required': '标签不能为空',
    },
    /*'value': {
      'required': '取值不能为空',
    },*/
  };

  loadData() {
    const that = this;
    that.issueStatusService.get(that.id).subscribe((json: any) => {
      that.model = json.data;
      this.categories = json.categories;
    });
  }

  create(): void {
    this._routeService.navTo('/pages/org-admin/issue-settings/issue-status/edit/null');
  }

  save() {
    const that = this;

    that.issueStatusService.save(that.model).subscribe((json: any) => {
      if (json.code == 1) {

        that.formErrors = ['保存成功'];
        that._routeService.navTo('/pages/org-admin/issue-settings/issue-status/list');
      } else {
        that.formErrors = [json.msg];
      }
    });
  }

  delete() {
    const that = this;

    that.issueStatusService.delete(that.model.id).subscribe((json: any) => {
      if (json.code == 1) {
        this.modalWrapper.closeModal();
        that.formErrors = ['删除成功'];
        that._routeService.navTo('/pages/org-admin/issue-settings/issue-status/list');
      } else {
        that.formErrors = ['删除失败'];
      }
    });
  }

  back() {
    this._routeService.navTo('/pages/org-admin/issue-settings/issue-status/list');
  }

  showModal(): void {
    this.modalWrapper.showModal();
  }

}

