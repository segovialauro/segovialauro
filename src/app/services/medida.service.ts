import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Medida } from '../model/medida';
import { ResponseDto } from '../model/response-dto';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class MedidaService {

  urlBase = 'http://localhost:8080/';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  //modelMedida: string;

  constructor(private http: HttpClient, private messageService: MessageService) { }

  /** POST: add a new Medida to the server */
  guardar(medida: Medida): Observable<Medida> {
    return this.http.post<ResponseDto>(this.urlBase + "medida", medida, this.httpOptions).pipe(
      map(responseDto => responseDto.respuesta),
      tap((newMedida: Medida) => this.log(`added medida w/ id=${newMedida.abreviatura}`)),
      catchError(this.handleError<Medida>('addMedida'))
    );
  }

  /** GET medidas from the server */
  getListaPaginada(medida: any,
    pagina: number, cantidad: number,
    ordenadoPor: string, direccion: string): Observable<Medida[]> {

    let filtros = "";
    if (medida === null) {
      filtros = "pagina=" + pagina + "&cantidad=" + cantidad + "&ordenadoPor=" + ordenadoPor + "&direccion=" + direccion;
    } else {
      const modelMedida = JSON.stringify(medida);
      const medidaEncoded = encodeURIComponent(modelMedida);
      if (medidaEncoded != null) {
        filtros = "filtros=" + medidaEncoded + "&pagina=" + pagina + "&cantidad=" + cantidad + "&ordenadoPor=" + ordenadoPor + "&direccion=" + direccion;
      }
    }

    //http://127.0.0.1:8080/medida?filtros=%7B%22nombreMedida%22%3A%22kilogramos%22%7D&pagina=0
    //&cantidad=10&ordernarPor=nombreMedida&direccion=ASC
    return this.http.get<ResponseDto>(this.urlBase + "medida?" + filtros).pipe(
      map(responseDto => responseDto.respuesta),
      tap(_ => this.log('fetched Medidas')),
      catchError(this.handleError<Medida[]>('getMedida', []))
    );
  }

  /** PUT: update the medida on the server */
  editar(medida: Medida, id: number): Observable<any> {
    console.log("medida", medida);
    return this.http.put<ResponseDto>(this.urlBase + id, medida, this.httpOptions).pipe(
      map(responseDto => responseDto.respuesta),
      tap(_ => this.log(`updated medida id=${id}`)),
      catchError(this.handleError<any>('updateMedida'))
    );
  }

  /** DELETE: delete the planAnual from the server */
  eliminar(id: number): Observable<Medida> {
    const url = `${this.urlBase}/${id}`;
    return this.http.delete<ResponseDto>(url, this.httpOptions).pipe(
      map(responseDto => responseDto.respuesta),
      tap(_ => this.log(`deleted medida id=${id}`)),
      catchError(this.handleError<Medida>('deleteMedida'))
    );
  }


  /**
* Handle Http operation that failed.
* Let the app continue.
* @param operation - name of the operation that failed
* @param result - optional value to return as the observable result
*/
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a MedidaService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`MedidaService: ${message}`);
  }

}
