import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SibarbarService {
  menu : any[] = [
    {
      titulo: 'Dashboard!!!',
      icono:'mdi mdi-gauge',
      submenu:[
        {titulo:'Main', url:'/'},
        {titulo:'ProgressBar', url:'progress'},
        {titulo:'Graficas', url:'grafica1'}, 
        {titulo:'Medida', url:'medida-form'}, 
      ]
    }
  ] ;
  constructor() { }
}
