import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  
constructor(private http:HttpClient){

}
   getApiUrl='http://localhost:3000/doctors';
   insertUrl='http://localhost:3000/doctors';
   deleteUrl='http://localhost:3000/doctors';
    updateUrl='http://localhost:3000/doctors';


    getAllDoctors(){
    return this.http.get(this.getApiUrl);
  }

  insertDoctor(doctor:any){
      return this.http.post(this.insertUrl,doctor);
    }

  deleteDoctor(id:string){
    console.log(id);
    return this.http.delete(this.deleteUrl+ "/" + id);
  }
  updateDoctorById(id:string,data:any){
    return this.http.put(this.updateUrl+ "/" + id,data)
  }
}
