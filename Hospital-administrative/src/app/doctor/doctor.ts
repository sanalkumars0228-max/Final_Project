import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DoctorService } from '../doctor-service';

@Component({
  selector: 'app-doctor',
  imports: [ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './doctor.html',
  styleUrl: './doctor.css',
})
export class Doctor {
 showAlert: boolean = false;
alertMessage: string = "";
  addForm:boolean=true;
  editForm:boolean=false;
   doctors:any=[];
  selectedDoctor:any={
    name:'',
    age:0,
    gender:'',
    department:'',
    phone:''
  }
  constructor(private service:DoctorService){
    this.getAllDoctor();
  }

  doctorForm=new FormGroup({
    name:new FormControl('',[Validators.required,Validators.minLength(3)]),
    age:new FormControl(null,[Validators.required,Validators.min(22),Validators.max(65)]),
    department: new FormControl('',Validators.required),
    phone:new FormControl(null,[Validators.required,]),
  })

  getAllDoctor(){
    this.service.getAllDoctors().subscribe(result=>{
      this.doctors=result;
    })
  }

  addDoctor(data:any){
    console.log(data);
    this.service.insertDoctor(data).subscribe(result=>{
      this.doctors.push(result);
      this.triggerSuccess("Doctor added successfully!");
    //    this.successMessage = true;
    //    setTimeout(() => {
    //   this.successMessage = false;
    // }, 3000);
    })
  }

  editDoctor(doctor:any){
       this.addForm=false;
    this.editForm=true;
    this.selectedDoctor = doctor;
      this.doctorForm.patchValue({
    name: doctor.name,
    age: doctor.age,
    department:doctor.department
  }); 
  }
  updateDoctor(){
        let updatedData = this.doctorForm.value;
    this.service.updateDoctorById(this.selectedDoctor._id,updatedData).subscribe(result=>{
      console.log(this.selectedDoctor._id);
      this.triggerSuccess("Doctor updated successfully!");
      this.getAllDoctor();
        this.addForm=true;
    this.editForm=false;
    this.doctorForm.reset();
    })
  }

    deleteDoctor(id:string){
    console.log(id);
    this.service.deleteDoctor(id).subscribe(result=>{
      console.log("deleted",result);
      this.triggerSuccess("Doctor deleted successfully!");
      this.getAllDoctor();
      
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
