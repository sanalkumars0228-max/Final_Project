import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppoinmentServiice {

  constructor(private http:HttpClient){

  }
  
  getApiUrl='http://localhost:3000/appointments';
   insertUrl='http://localhost:3000/appointments';
   deleteUrl='http://localhost:3000/appointments';
   updateUrl='http://localhost:3000/appointments';

  getAllAppoinments(){
   return this.http.get(this.getApiUrl);
  }

  insertAppoinment(appoinment:any){
    return this.http.post(this.insertUrl,appoinment);
  }
   deleteAppoinment(id:string){
    return this.http.delete(this.deleteUrl+ "/" + id);
  }
    updateByIdAndName(id:string,data:any){
    return this.http.put(this.updateUrl+ "/" + id,data);
  }
}
