import { Component, ViewEncapsulation, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GlobalState } from '../../../../global.state';

import { CONSTANT } from '../../../../utils/constant';
import { Utils } from '../../../../utils/utils';
import { RouteService } from '../../../../service/route';
import { UserService } from '../../../../service/user';

@Component({
  selector: 'user-list',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./list.scss'],
  templateUrl: './list.html',
})
export class UserList implements OnInit, AfterViewInit {

  queryForm: FormGroup;
  queryModel: any = { keywords: '', read: 'false' };
  statusMap: Array<any> = CONSTANT.EntityDisabled;

  models: any;
  collectionSize: number = 0;
  page: number = 1;
  pageSize: number = 6;

  constructor(private _routeService: RouteService, private _state: GlobalState, private fb: FormBuilder, private el: ElementRef,
              private userService: UserService) {
  }

  ngOnInit() {
    this.queryForm = this.fb.group(
      {
        'disabled': ['', []],
        'keywords': ['', []],
      }, {},
    );

    this.loadData();
  }

  ngAfterViewInit() {
    this.queryForm.valueChanges.debounceTime(CONSTANT.DebounceTime).subscribe(values => this.queryChange(values));
  }

  // create(): void {
  //   this._routeService.navTo('/pages/org-admin/user/edit/null');
  // }
  invite(): void {
    this._routeService.navTo('/pages/org-admin/user/invite');
  }

  queryChange(values: any): void {
    this.loadData();
  }
  pageChange(event: any): void {
    this.loadData();
  }

  edit($event: any): void {
    console.log($event);
  }
  delete($event: any): void {
    console.log($event);
  }

  loadData() {
    this.userService.list(this.queryModel, this.page, this.pageSize).subscribe((json: any) => {
      this.collectionSize = json.total;
      this.models = json.data;
    });
  }

}
