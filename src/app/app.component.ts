import * as path from 'path';
import { Component } from '@angular/core';

@Component({
  selector: 'app',
  templateUrl: path.join(__dirname, 'app.component.html')
})
export class AppComponent {
  msg: string = ' ';

  onRecorded(dataURL: string) {
    // this.msg = dataURL;
    this.msg = 'hahahahaa';
    console.log(this.msg);
  }
}
