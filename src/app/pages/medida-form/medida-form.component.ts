import { Component, OnInit } from '@angular/core';
import { Medida } from 'src/app/model/medida';
import { MedidaService } from 'src/app/services/medida.service';

@Component({
  selector: 'app-medida-form',
  templateUrl: './medida-form.component.html',
  styles: [
  ]
})
export class MedidaFormComponent implements OnInit {

  POSTS: any;
  page = 1;
  count = 0;
  tableSize = 7;
  tableSizes = [3, 6, 9, 12];

  medida = new Medida("", "", "");
  public medidaList: Array<Medida> = [];

  constructor(private medidaService: MedidaService) { }

  ngOnInit(): void {
    this.medidaList = this.medidaService.listarFake();
  }

  onSubmit() {
    this.medidaService.guardar(this.medida).subscribe(
      data => console.log('success', data),
      error => console.log('error', error)
    )
  }

  /*fetchPosts(): void {
    this.medidaService.listarFake()
      .subscribe(
        response => {
          this.POSTS = response;
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  onTableDataChange(event){
    this.page = event;
    this.fetchPosts();
  }  

  onTableSizeChange(event): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.fetchPosts();
  }  */

}
