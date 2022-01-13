import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  Courses !: any;
  list: string[] = [];
  list2: string[] = [];
  nbr: number = 0 ;
  str: string = "";
  form !: FormGroup;

  constructor(private formbuilder: FormBuilder, private api: ApiService, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.form = this.formbuilder.group({
      email: [''],
      password: ['']
    })  
  }

  signup(){
    this.http.get<any>("http://localhost:3000/teachers")
    .subscribe(res=>{
        const user = res.find((a:any)=>{
        if (a.email === this.form.value.email)
        {
          this.str = a.id;
        }
        return a.email === this.form.value.email
    });  
    if(user)  
    {
      sessionStorage.setItem("sign", this.str)
      this.patchSignup();
    }
    else
    {
      alert("User not found");
    }
  },err=>{
    alert("Something went wrong !");
  })
}

  patchSignup(){
    this.http.patch<any>('http://localhost:3000/teachers/' + sessionStorage.getItem("sign"), this.form.value)
    .subscribe(res=>{
      alert("Password saved");
      this.form.reset();
      // let ref = document.getElementById("end");
      // ref?.click();
      // window.location.reload();
    },err=>{
      alert("Something went wrong");
    })
  }

}
