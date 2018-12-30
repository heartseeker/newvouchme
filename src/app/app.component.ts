import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  form: FormGroup;

  picture: File;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      file: ['', [Validators.required]]
    });
  }

  submit() {
    const fd = new FormData();
    if (this.picture) {
      fd.append('picture', this.picture, this.picture.name);
    }

    this.http.post('http://localhost:8000/api/users/upload', fd).subscribe((res) => {
      console.log('response', res);
    })
    console.log(this.form);
  }

  onFileChange(event) {
    this.picture = event.target.files[0];
    console.log('this.picture', this.picture);
  }

}
