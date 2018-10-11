import * as _ from 'lodash';

import { Injectable } from '@angular/core';

import { RequestService } from '../request';

@Injectable()
export class OrgGroupService {
  constructor(private _reqService: RequestService) { }
  _apiBase = 'admin/org_group/';

  list(query: any, page: number, pageSize: number) {
    _.merge(query, { page: page, pageSize: pageSize });
    return this._reqService.post(this._apiBase + 'list', query);
  }

  get(id: number) {
    const model = { id: id };
    return this._reqService.post(this._apiBase + 'get', model);
  }

  save(group: any, users: any[]) {
    return this._reqService.post(this._apiBase + 'save', { group: group, relations: users });
  }

  delete(id: number) {
    const model = { id: id };
    return this._reqService.post(this._apiBase + 'delete', model);
  }

  listByUser(id: number) {
    return this._reqService.post(this._apiBase + 'listByUser', { userId: id });
  }
  saveByUser(userId: number, models: any) {
    return this._reqService.post(this._apiBase + 'saveByUser', { userId: userId, models: models });
  }
}

