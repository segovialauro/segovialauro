import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Medida } from '../model/medida';
import { ResponseDto } from '../model/response-dto';
import { Observable , of} from 'rxjs';
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

  constructor(private http: HttpClient, private messageService: MessageService) { }

    /** POST: add a new planAnual to the server */
    guardar(medida: Medida): Observable<Medida> {
      return this.http.post<ResponseDto>(this.urlBase + "medida",medida,this.httpOptions).pipe(
        map(responseDto => responseDto.respuesta),
        tap((newMedida: Medida) => this.log(`added medida w/ id=${newMedida.abreviatura}`)),
        catchError(this.handleError<Medida>('addPlanAnual'))
      );
    }


    listarFake(){
      let list = [];
      for (let i = 0; i < 100; i++){
        list.push({nombreMedida:"algo",abreviatura:"algo",usuarioCreacion:"lauro"})
      }
      return list;
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

  /** Log a PlanAnualService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`PlanAnualService: ${message}`);
  }
  
}
