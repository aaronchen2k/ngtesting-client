import * as _ from 'lodash';

import { Injectable } from '@angular/core';

import { RequestService } from '../request';

@Injectable()
export class IssueWorkflowService {
  constructor(private _reqService: RequestService) { }
  _apiBase = 'admin/issue_workflow/';

  list() {
    return this._reqService.post(this._apiBase + 'list', {});
  }

  get(id: number) {
    const model = { id: id };
    return this._reqService.post(this._apiBase + 'get', model);
  }

  save(model: any, statuses: any[]) {
    const statusIds: number[] = statuses
      .filter(function (item) { return item.selected; })
      .map(function (item) {
        return item.id;
      });

    return this._reqService.post(this._apiBase + 'save', { model: model, statusIds: statusIds });
  }

  delete(id: number) {
    const model = { id: id };
    return this._reqService.post(this._apiBase + 'delete', model);
  }

  setDefault(id: number) {
    const model = { id: id };
    return this._reqService.post(this._apiBase + 'setDefault', model);
  }
  changeOrder(id: number, act: string) {
    const model = { id: id, act: act };
    return this._reqService.post(this._apiBase + 'changeOrder', model);
  }

}

