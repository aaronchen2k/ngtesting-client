import { Component, OnDestroy, AfterViewInit, OnChanges, Input, Output, EventEmitter, ElementRef } from '@angular/core';

import 'tinymce';
import 'tinymce/themes/modern';

import 'tinymce/plugins/table';
import 'tinymce/plugins/link';

declare var tinymce: any;

@Component({
  selector: 'tiny-mce',
  templateUrl: './tiny-mce.html',
  styleUrls: ['./tiny-mce.scss']
})
export class TinyMCEComponent implements OnDestroy, AfterViewInit, OnChanges {
  @Input() elemId: string = 'mceEditor';

  @Output() changed = new EventEmitter<any>();
  @Input() height: string;
  contentModel: string;
  @Input() set content(cont: string) {
    if (!cont) {
      this.contentModel = '';
    } else {
      this.contentModel = cont;
    }
  }

  sel: string;

  constructor(private host: ElementRef) { }

  ngAfterViewInit() {
    const that = this;
    this.sel = 'textarea#'+this.elemId;
    if (!$(this.sel)) {
      return;
    }

    tinymce.init({
      document_base_url: '/assets/vendor/tinymce',
      selector: that.sel,
      plugins: ['link', 'table'],
      skin_url: 'skins/lightgray',
      language : "zh_CN",
      language_url : "assets/vendor/tinymce/langs/zh_CN.js",
      setup: editor => {
        editor.on('change', () => {
          this.changed.emit(editor.getContent());
        });
      },
      height: that.height
    }).then(function(editors) {
      that.updateContent();
    });
  }

  ngOnChanges() {
    this.updateContent();
  }

  ngOnDestroy() {
    console.log("tinymce ngOnDestroy");
    if ($(this.sel) && tinymce.get(this.elemId)) {
      tinymce.get(this.elemId).remove();
    }
  }

  updateContent() {
    this.contentModel = this.contentModel?this.contentModel:'';
    let editor = tinymce.get(this.elemId);
    if (editor) {editor.setContent(this.contentModel);}
  }

}
