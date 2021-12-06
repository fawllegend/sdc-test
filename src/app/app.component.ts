import { Component, OnInit } from '@angular/core';
import { AppStore } from './_app-store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AppStore]
})
export class AppComponent implements OnInit {
  title = 'sdc-test';
  data$ = this.appStore.entities$;

  constructor(private appStore: AppStore) {}

  ngOnInit() {}
}
