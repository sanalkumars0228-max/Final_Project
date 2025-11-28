import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Appoinments } from './appoinments/appoinments';
import { Doctor } from './doctor/doctor';
import { Patients } from './patients/patients';

export const routes: Routes = [
    {
        path:'',
        redirectTo:"appoinment",
        pathMatch:"full"
    },
        {
        path:'login',
        component:Login
    },
      {
        path:'appoinment',
        component:Appoinments
    },
        {
        path:'doctor',
        component:Doctor
    },
        {
        path:'patients',
        component:Patients
    },
    

    // {
    //     path:'**',
    //     component:
    // }
];
