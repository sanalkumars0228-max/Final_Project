import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PatientInterface } from './patient-interface';

@Injectable({
  providedIn: 'root',
})
export class PatientService {

    constructor(private http:HttpClient){
      
    }

    getApiUrl='http://localhost:3000/patients';
    insertUrl='http://localhost:3000/patients';
    deleteUrl='http://localhost:3000/patients'
    updateUrl='http://localhost:3000/patients'

  insertPatient(patient:PatientInterface){
    console.log("Sending to backend:", this.insertUrl, patient);
    return this.http.post(this.insertUrl,patient);
  }

  getAllPatients(){
    return this.http.get(this.getApiUrl);
  }

  deletePatientById(id:string){
    console.log(id);
    return this.http.delete(this.deleteUrl+ "/" + id);
  }
   updatePatientById(id:string,data:any){
    console.log("ji");
    console.log(id);
    return this.http.put(this.updateUrl+ "/" + id,data);
    
  }

  updateStatus(id: string, status: string) {
    return this.http.put(this.updateUrl+ "/" + id,{status});
  }
}
