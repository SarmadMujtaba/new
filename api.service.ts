import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { pipe } from 'rxjs';
import {map} from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class ApiService{

  constructor(private _http : HttpClient) { }

  PostEmployee(data : any){
    return this._http.post<any>("http://localhost:3000/courses",JSON.stringify(data))
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  DeleteEmployee(id : number){
    return this._http.delete<any>('http://localhost:3000/teachers/'+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  UpdateEmployee(data : any, id:number){
    return this._http.put<any>('https://localhost:3000/teachers/'+id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  GetEmployees(){
    return this._http.get<any>('http://localhost:3000/teachers')
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}