import { Component, OnInit } from '@angular/core';
import { SibarbarService } from 'src/app/services/sibarbar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  menuItems: any[] = [];
  
  constructor(private sibarbarService: SibarbarService) { 
    this.menuItems = sibarbarService.menu;
    console.log(this.menuItems);
  }

  ngOnInit(): void {
  }

}
