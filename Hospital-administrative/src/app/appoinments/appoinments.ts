import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppoinmentServiice } from '../appoinment-serviice';

@Component({
  selector: 'app-appoinments',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './appoinments.html',
  styleUrl: './appoinments.css',
})
export class Appoinments {
   showAlert: boolean = false;
alertMessage: string = "";
  addForm:boolean=true;
  editForm:boolean=false;
  selectedArray:any=[{
    name:'',
    doctor:'',
    appoinment_date:''
  }]
  appoinments:any=[];

  constructor(private service:AppoinmentServiice){
    this.getAppoinment();
  }

 AppoinmentForm = new FormGroup({
    name: new FormControl('',[Validators.required,Validators.minLength(3)]),
    // age:new FormControl(null,Validators.required),
    doctor:new FormControl('',Validators.required),
     appoinment_date: new FormControl('',[Validators.required]),
      
  })

   getControl(controlNme:string){
    return this.AppoinmentForm.get(controlNme)
  }

  bookAppoinment(data:any){
    this.service.insertAppoinment(data).subscribe(result=>{
      this.appoinments.push(result);
      this.triggerSuccess("Appoinment added successfully!");
      this.getAppoinment();
      this.AppoinmentForm.reset();
    })
  }
  getAppoinment(){
    this.service.getAllAppoinments().subscribe(result=>{
      this.appoinments=result;
    })
  }
  delete(id:string){
    this.service.deleteAppoinment(id).subscribe(result=>{
      console.log("deleted",result);
      this.triggerSuccess("Appoinment deleted successfully!");
      this.getAppoinment();
    })
  }
  EditForm(appoinment:any){
       this.addForm=false;
    this.editForm=true;
    this.selectedArray = appoinment;
      this.AppoinmentForm.patchValue({
    name: appoinment.name,
    doctor: appoinment.doctor,
    appoinment_date:appoinment.appoinment_date
  }); 
  }
  update(){
       let updatedData = this.AppoinmentForm.value;
    this.service.updateByIdAndName(this.selectedArray._id,updatedData).subscribe(result=>{
      console.log(this.selectedArray._id);
      this.triggerSuccess("Appoinment updated successfully!");
      this.getAppoinment();
        this.addForm=true;
    this.editForm=false;
    this.AppoinmentForm.reset();
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
