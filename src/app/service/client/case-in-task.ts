import * as _ from 'lodash';

import { Injectable } from '@angular/core';

import { CONSTANT } from '../../utils/constant';
import { RequestService } from '../request';

@Injectable()
export class CaseInTaskService {
  constructor(private _reqService: RequestService) {
  }

  _apiBase = 'client/caseInTask/';

  query(taskId: number) {
    return this._reqService.post(this._apiBase + 'query', { taskId: taskId });
  }

  get(id: number) {
    const model = { id: id };
    return this._reqService.post(this._apiBase + 'get', model).map(json => {
      this.toFlat(json.data);
      return json;
    });
  }

  setResult(modelId: number, caseId: number, result: string, nextId: number, status: string) {
    const data = { id: modelId, caseId: caseId, result: result, nextId: nextId, status: status };
    return this._reqService.post(this._apiBase + 'setResult', data);
  }

  rename(taskId: number, model: any) {
    _.merge(model, { taskId: taskId });
    return this._reqService.post(this._apiBase + 'rename', model);
  }
  delete(id: number, entityId: number) {
    const model = { id: id, entityId: entityId };
    return this._reqService.post(this._apiBase + 'delete', model);
  }
  move(taskId: number, data: any) {
    _.merge(data, { taskId: taskId });

    return this._reqService.post(this._apiBase + 'move', data);
  }

  toFlat(model) {
    _.merge(model, model.jsonProp);
    model.jsonProp = null;

    // console.log('===', model);
  }

}
