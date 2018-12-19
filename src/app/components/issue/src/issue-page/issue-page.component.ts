import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';

import { ToastyService } from 'ng2-toasty';

import { GlobalState } from '../../../../global.state';

import { RouteService } from '../../../../service/route';

import { PrivilegeService } from '../../../../service/privilege';
import { IssueService } from '../../../../service/client/issue';
import { IssueOptService } from '../../../../service/client/issue-opt';
import { IssueWatchService } from '../../../../service/client/issue-watch';

import { IssueEditPopupService } from '../issue-edit/issue-edit.service';
import { IssueAssignPopupService } from '../issue-assign/issue-assign.service';
import { IssueWatchPopupService } from '../issue-watch/issue-watch.service';
import { IssueTagPopupService } from '../issue-tag/issue-tag.service';
import { IssueLinkPopupService } from '../issue-link/issue-link.service';

import { PopDialogComponent } from '../../../pop-dialog';
import {CONSTANT} from "../../../../utils";

declare var jQuery;

@Component({
  selector: 'issue-page',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./style.scss', '../../../comments/comment-edit/src/styles.scss'],
  templateUrl: './issue-page.html',
})
export class IssuePage implements OnInit, AfterViewInit, OnDestroy {
  eventCode: string = 'IssuePage';
  canEdit: boolean;

  form: any;
  tab: string = 'comments';

  issueEditModal: any;
  issueAssignModal: any;
  issueWatchModal: any;
  issueTagModal: any;
  issueLinkModal: any;

  @ViewChild('deleteModalWrapper') deleteModalWrapper: PopDialogComponent;

  @Input() page: any = {};
  @Input() issuePropMap: any = {};
  @Input() issueTransMap: any = {};
  @Output() optEvent = new EventEmitter<any>();

  _issue: any = {};
  @Input() set issue(val) {
    this._issue = val;
    this.dealwithLinks();
  }

  get issue() {
    return this._issue;
  }

  constructor(private _routeService: RouteService, private _route: ActivatedRoute, private _state: GlobalState,
              private fb: FormBuilder, private toastyService: ToastyService, private privilegeService: PrivilegeService,

              private issueService: IssueService,
              private issueOptService: IssueOptService,
              private issueWatchService: IssueWatchService,

              private issueEditPopupService: IssueEditPopupService,
              private issueWatchPopupService: IssueWatchPopupService,
              private issueAssignPopupService: IssueAssignPopupService,
              private issueTagPopupService: IssueTagPopupService,
              private issueLinkPopupService: IssueLinkPopupService ) {

    this.canEdit = this.privilegeService.hasPrivilege('issue-maintain');

    this.buildForm();
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
  }

  saveField($event: any) {
    this.issueService.updateField(this._issue.id, $event.data).subscribe((json: any) => {
      if (json.code == 1) {
        $event.deferred.resolve();
      }
    });
  }

  statusTran(tran) {
    this.issueOptService.statusTran(this._issue.id, tran.dictStatusId).subscribe((json: any) => {
      if (json.code == 1) {
        this.optEvent.emit({ act: 'tran' });
      }
    });
  }

  tabChange(event: any) {
    this.tab = event.nextId;
  }

  edit() {
    this.issueEditModal = this.issueEditPopupService.genPage(this._issue.id);

    this.issueEditModal.result.then((result) => {
      console.log('result', result);
      if (result.success) {
        this.optEvent.emit(result);
      }
    }, (reason) => {
      console.log('reason', reason);
    });
  }

  assign() {
    this.issueAssignModal = this.issueAssignPopupService.genPage(this._issue, this.issuePropMap.assigneeId);

    this.issueAssignModal.result.then((result) => {
      console.log('result', result);
      if (result.success) {
        this.optEvent.emit(result);
      }
    }, (reason) => {
      console.log('reason', reason);
    });
  }

  watch() {
    this.issueWatchService.watch(this._issue.id, !this._issue.watched).subscribe((json: any) => {
      if (json.code == 1) {
        this._issue.watched = !this._issue.watched;
        this.optEvent.emit({ act: 'watch' });
      }
    });
  }

  watchList() {
    this.issueWatchModal = this.issueWatchPopupService.genPage(this._issue);

    this.issueWatchModal.result.then((result) => {
      console.log('result', result);
      if (result.success) {
        this.optEvent.emit(result);
      }
    }, (reason) => {
      console.log('reason', reason);
    });
  }

  tag() {
    this.issueTagModal = this.issueTagPopupService.genPage(this._issue);

    this.issueTagModal.result.then((result) => {
      console.log('result', result);
      if (result.success) {
        this.optEvent.emit(result);
      }
    }, (reason) => {
      console.log('reason', reason);
    });
  }

  link() {
    this.issueLinkModal = this.issueLinkPopupService.genPage(this._issue);

      this.issueLinkModal.result.then((result) => {
      console.log('result', result);
      if (result.success) {
        this.optEvent.emit(result);
      }
    }, (reason) => {
      console.log('reason', reason);
    });
  }

  showDeleteModal() {
    this.deleteModalWrapper.showModal();
  }

  delete() {
    this.issueService.delete(this._issue.id).subscribe((json: any) => {
      if (json.code == 1) {
        this.deleteModalWrapper.closeModal();
        this.optEvent.emit({ act: 'delete' });
      }
    });
  }

  uploadedEvent(event: any) {
    this.issueOptService.saveAttachment(this._issue.id, event.data.name, event.data.path)
      .subscribe((json: any) => {
        this._issue.attachments = json.attachments;
        this._issue.histories = json.histories;
        event.deferred.resolve();
      });
  }
  removeAttachment(item: any) {
    this.issueOptService.removeAttachment(this._issue.id, item.id).subscribe((json: any) => {
      this._issue.attachments = json.attachments;
      this._issue.histories = json.histories;
    });
  }

  dealwithLinks() {
    if (!this._issue.links) {
      return;
    }
    let reasonId = -1;
    this._issue.links.forEach(link => {
      if (reasonId == link.reasonId) {
        link.reasonName = '';
      } else {
        reasonId = link.reasonId;
      }
    });
  }

  viewLink(item) {
    const url = '#/pages/org/' + CONSTANT.CURR_ORG_ID + '/prj/' + CONSTANT.CURR_PRJ_ID + '/issue/'
      + item.id + '/view';
    return url;
  }

  ngOnDestroy(): void {

  }

  buildForm() {
    this.form = this.fb.group({});
  }

}
