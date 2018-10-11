import { Component, ViewEncapsulation, OnInit, AfterViewInit } from '@angular/core';

import { GlobalState } from '../../../../global.state';
import { CONSTANT } from '../../../../utils/constant';
import { Utils } from '../../../../utils/utils';
import { RouteService } from '../../../../service/route';
import { CaseService } from '../../../../service/client/case';

@Component({
  selector: 'report-list',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./list.scss'],
  templateUrl: './list.html',
})
export class ReportList implements OnInit, AfterViewInit {
  models: any[];
  query: any = { keywords: '', status: '' };

  constructor(private _routeService: RouteService, private _state: GlobalState,
              private _caseService: CaseService) {
  }

  ngOnInit() {
    const that = this;
    that.loadData();
  }

  ngAfterViewInit() {

  }

  create(): void {
    const that = this;

    that._routeService.navTo('/pages/event/edit/null/property');
  }

  statusChange(e: any): void {
    const that = this;
    that.query.status = e;
    that.loadData();
  }

  delete(id: string): void {
  }

  loadData() {
    const that = this;
    // that._caseService.query(that.query).subscribe((json:any) => {
    //   that.models = json.data;
    // });
  }

}

