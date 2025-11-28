import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PatientService } from '../patient-service';
import { PatientInterface } from '../patient-interface';

@Component({
  selector: 'app-patients',
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './patients.html',
  styleUrl: './patients.css',
})
export class Patients {
  discharged:boolean=false
  pending:boolean=true
  admitted:boolean=false;
  showAlert: boolean = false;
alertMessage: string = "";
  addForm:boolean=true;
  editForm:boolean=false;
   patients:any=[];
   selectedPatient:any={
       _id: '',
        name: '',
        age: '',
        gender: ''
   }

  constructor(private service:PatientService){
    this.getPatients();
  }

   patientForm = new FormGroup({
    name: new FormControl('',[Validators.required,Validators.minLength(3)]),
    age:new FormControl(null,Validators.required),
    gender:new FormControl('',Validators.required),
      
  })

// admitStatus(patient: any) {
//   patient.status = 'discharged';
// }
//  pendingStatus(patient: any) {
//   patient.status = 'admitted';
// }
// dischargeStatus(patient: any) {
//   patient.status = 'pending';
// }
  setStatus(patient: any, newStatus: string) {
    this.service.updateStatus(patient._id, newStatus)
      .subscribe((updated: any) => {
        patient.status = updated.status; 
      });
      this.getPatients();
  }

  addPatient(formValue:PatientInterface | any){
    console.log(formValue);
    this.service.insertPatient(formValue).subscribe(result=>{
      console.log(result);
      this.patients.push(result)
       this.triggerSuccess("Patient added successfully!");
      this.patientForm.reset();
    })
  }

  getPatients(){
    this.service.getAllPatients().subscribe(result=>{
      this.patients=result;
      console.log(this.patients);
    })
  }

  editPatient(patient:any){
    this.addForm=false;
    this.editForm=true;
    console.log("reaached here");
    this.selectedPatient = patient;
      this.patientForm.patchValue({
    name: patient.name,
    age: patient.age,
    gender: patient.gender
  });    
    
  }
  updatePatient(){
     let updatedData = this.patientForm.value;
    this.service.updatePatientById(this.selectedPatient._id,updatedData).subscribe(result=>{
      console.log(this.selectedPatient._id);
       this.triggerSuccess("Patient Updated successfully!");
      this.getPatients();
      this.patients=null
        this.addForm=true;
    this.editForm=false;
    this.patientForm.reset();
    })
     
  }

  deletePatient(id:string){
    console.log(id);
    this.service.deletePatientById(id).subscribe(result=>{
      console.log("deleted",result);
       this.triggerSuccess("Patient Deleted successfully!");
      this.getPatients();
    })
  }

    triggerSuccess(msg: string) {
  this.alertMessage = msg;
  this.showAlert = true;

  setTimeout(() => {
    this.showAlert = false;
  }, 3000); 
}



}
