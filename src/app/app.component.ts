import { Component, ViewChild } from '@angular/core';
import { SidenavComponent } from './components/sidenav/sidenav.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('sidenav') sidenavComponent!: SidenavComponent;
  constructor() {
  }
  title = 'libreria';

  public menu(){
    this.sidenavComponent.sidenavfunction();
  }
}
