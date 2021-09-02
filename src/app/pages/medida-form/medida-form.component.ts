import { Component, OnInit } from '@angular/core';
import { Medida } from 'src/app/model/medida';
import { MedidaService } from 'src/app/services/medida.service';

@Component({
  selector: 'app-medida-form',
  templateUrl: './medida-form.component.html',
  styleUrls: ['./medida-form.component.css' ]
})
export class MedidaFormComponent implements OnInit {

  nuevo: string = 'Nueva Medida';
  agregar: boolean = false;
  totalPages?: Array<number>;
  page = 1;
  size = 10;
  isFirst = false;
  isLast = false;
  contador=0;
  pagina=0;
  regresivo=0;
  totalPagesAportantes=0;
  totalElements=0;
  mensaje: string = "";
  mensajeInfo:boolean = false;
  mensajeError:boolean = false;
  mensajeAdvertencia:boolean = false;
  mensajeExito:boolean = false;
  accion = "alta";
  medidaId:number = 0;
  estado:string = "ACTIVO";

  medida = new Medida("", "", "", "", "","");
  public medidaList: Array<Medida> = [];
  pageNumber: number = 1;
  color:string = "A";
  btnColor:string = "btn btn-success";

  constructor(private medidaService: MedidaService) { }

  ngOnInit(): void {
      this.medidaService.getListaPaginada(null,0,5,"nombreMedida","ASC").subscribe(
      data => this.medidaList = data,
      error => console.log('error', error)
    );
  }

  onSubmit() {
    if (this.accion === 'alta') {
      this.medidaService.guardar(this.medida).subscribe(
        data => console.log('success', data),
        error => console.log('error', error)
      );
    } else {    
      this.medida.usuarioModificaion = "lauro2"
      this.medidaService.editar(this.medida,this.medidaId).subscribe(
        data => console.log('success', data),
        error => console.log('error', error)
      );
    }
    
  }

  //vuelve a la primera de la lista
rewindPrimera(): void {
  if (!this.isFirst) {
    this.page=1;
    this.getLista();
  }
}
rewindUltima(): void {
  if (!this.isLast) {
    //this.page= this.data.totalPages;  Ojo cambiar esto cuando se tenga el total verdadero
    this.page= 5;
    this.getLista();
  }
}
 //vuelve a la anterior de la lista
 rewind(): void {
  if (!this.isFirst) {
    this.page--;
    this.getLista();
  }
}
// siguiente de la pagina del get
forward(): void {
  if (!this.isLast) {
    this.page++;
    this.getLista();
  }
}
//function para ingresar el page dentro de get
setPage(page: number): void {
  this.page = page + 1;
  this.getLista();
}

getLista() {
  this.medidaService.getListaPaginada(null,0,5,"nombreMedida","ASC").subscribe(
    data => this.medidaList = data,
    error => console.log('error', error)
  );
}

agregarNuevo(){
  this.agregar = true;
}

editar(fila:any){
  console.log("editando",fila);
  this.agregar = true;
  this.medida.nombreMedida= fila.nombreMedida;
  this.medida.abreviatura = fila.abreviatura;
  this.accion="editar"
  this.medidaId= fila.medidaId;
}

eliminar(fila:any){
  console.log("eliminar", fila.medidaId);
  this.medidaService.eliminar(fila.medidaId)
}

}
