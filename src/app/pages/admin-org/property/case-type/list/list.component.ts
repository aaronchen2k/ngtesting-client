import { Component, ViewEncapsulation, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GlobalState } from '../../../../../global.state';

import { CONSTANT } from '../../../../../utils/constant';
import { Utils } from '../../../../../utils/utils';
import { RouteService } from '../../../../../service/route';
import { CaseTypeService } from '../../../../../service/case-type';

@Component({
  selector: 'case-type-list',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./list.scss'],
  templateUrl: './list.html',
})
export class CaseTypeList implements OnInit, AfterViewInit {
  models: any[];

  constructor(private _routeService: RouteService, private _state: GlobalState, private fb: FormBuilder, private el: ElementRef,
              private caseTypeService: CaseTypeService) {
  }

  ngOnInit() {
    const that = this;

    that.loadData();
  }

  ngAfterViewInit() {

  }

  edit(item: any): void {
    this._state.notifyDataChanged(CONSTANT.EVENT_PROPERTY_STATUS, 'edit');
    this._routeService.navTo('/pages/org-admin/property/case-type/edit/' + item.id);
  }

  delete($event: any): void {
    const that = this;

    console.log($event);
  }
  setDefault(item: any): void {
    this.caseTypeService.setDefault(item.id).subscribe((json: any) => {
      if (json.code == 1) {
        this.models = json.data;
      }
    });
  }

  loadData() {
    const that = this;

    that.caseTypeService.list().subscribe((json: any) => {
      that.models = json.data;
    });
  }

  up(item: any) {
    this.caseTypeService.changeOrder(item.id, 'up').subscribe((json: any) => {
      if (json.code == 1) {
        this.models = json.data;
      }
    });
  }
  down(item: any) {
    this.caseTypeService.changeOrder(item.id, 'down').subscribe((json: any) => {
      if (json.code == 1) {
        this.models = json.data;
      }
    });
  }

}
