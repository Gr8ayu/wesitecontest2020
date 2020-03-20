import { Component, OnInit, ViewChild } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ApiService } from '../api.service'

@Component({
  selector: 'app-newpost',
  templateUrl: './newpost.component.html',
  styleUrls: ['./newpost.component.css']
})
export class NewpostComponent implements OnInit {
  public Editor = ClassicEditor;
  @ViewChild("myEditor") myEditor: any;
  data: string;
  content: string;
  title: string;
  type: string;

  config = {
    placeholder: "Start typing here"
  };

  constructor(private api: ApiService) { }

  ngOnInit() { }

  onBlogSubmit() {
    this.data = this.myEditor.editorInstance.getData();
    this.api.addBlogPost("title", "content", "Notice").subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error)
    });
  }

}
