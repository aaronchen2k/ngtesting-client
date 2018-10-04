import * as _ from 'lodash';

import { Component, Input, OnInit, AfterViewInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';

import { CONSTANT } from '../../../utils/constant';

import { TqlConditionService } from './tql-condition.service';

@Component({
  selector: 'tql-condition',
  templateUrl: './tql-condition.html',
  styleUrls: ['./styles.scss'],
})
export class TqlConditionComponent implements OnInit, AfterViewInit {
  form: FormGroup;

  @Input() filter: boolean = true;
  @Input() title: string;
  @Input() items: any[];
  @Output() selected = new EventEmitter<any>();

  constructor(private fb: FormBuilder, private tqlConditionService: TqlConditionService) {
    this.form = this.fb.group({});
  }

  ngOnInit(): any {
    _.forEach(this.items, (item: any, index: number) => {
      this.form.addControl('menu-item-' + item.id, new FormControl('', []));
    });
  }
  ngAfterViewInit() {
    this.form.valueChanges.debounceTime(CONSTANT.DebounceTime).subscribe(values => this.change(values));
  }

  change(values: any) {
    let selectedItems = '';
    _.forEach(this.items, (item: any, index: number) => {
      if (item.selected) {
        if (selectedItems != '') {
          selectedItems += ',';
        }

        selectedItems += item.id;
      }
    });

    this.selected.emit({ type: 'project', data: selectedItems });
  }

  clickMenu($event): any {
    $event.stopPropagation();
  }
  selectItem(item): any {
    item.selected = !item.selected;
  }

}