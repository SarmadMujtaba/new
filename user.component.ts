import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  
  Courses !: any;
  list: string[] = [];
  list2: string[] = [];
  nbr: number = 0 ;
  priorityValue !: FormGroup;
  constructor(private formbuilder: FormBuilder, private api: ApiService, private http: HttpClient) {
    this.priorityValue = this.formbuilder.group({
      p1: [''],
      p2: [''],
      p3: ['']
    })   
    this.getData();
    this.getPriority();
    this.getCourseDetails();
   }

  ngOnInit(): void {
  }
  getData()
  {
    this.http.get<any>('http://localhost:3000/teachers/' + sessionStorage.getItem("logged"))
    .subscribe(res=>{
      this.list[0] = res.name;
      this.list[1] = res.email;
    })
  }

  getPriority()
  {
    this.http.get<any>('http://localhost:3000/teachers/' + sessionStorage.getItem("logged"))
    .subscribe(res=>{
      this.list2[0] = res.name;
      this.list2[1] = res.email;
      this.list2[2] = res.p1;
      this.list2[3] = res.p2;
      this.list2[4] = res.p3;
    })
  }

  priorityDetails(){
    this.http.patch<any>('http://localhost:3000/teachers/' + sessionStorage.getItem("logged"), this.priorityValue.value)
    .subscribe(res=>{
      alert("priority Entered");
      this.priorityValue.reset();
      this.getPriority();
      let ref = document.getElementById("end");
      ref?.click();
      window.location.reload();
    },err=>{
      alert("Something went wrong");
    })
  }

  getCourseDetails(){
    this.http.get<any>('http://localhost:3000/courses')
    .subscribe(res=>{
      this.Courses = res;
    })
  }

}


