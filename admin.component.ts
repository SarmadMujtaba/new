import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './admin.model';
import { CourseModel } from './admin.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{

  public formValue !: FormGroup;
  public courseValue !: FormGroup;
  Data !: any;
  Courses !: any;
  list : string[] = [];
  empModelObj : EmployeeModel = new EmployeeModel();
  courseModelObj : CourseModel = new CourseModel();

  constructor(private formbuilder: FormBuilder, private formbuilder1: FormBuilder, private api: ApiService, private http: HttpClient) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      name: [''],
      email: ['']
    })   
    this.courseValue = this.formbuilder1.group({
      code: [''],
      course: ['']
    })  
    this.getEmpDetails();
    this.getCourseDetails();
  }
  
  postEmpDetails(){
    this.http.post<any>('http://localhost:3000/teachers',this.formValue.value)
    .subscribe(res=>{
      alert("User Entered");
      this.formValue.reset();
      this.getEmpDetails();
      let ref = document.getElementById("close");
      ref?.click();
      
    },err=>{
      alert("Something went wrong");
    })
  }

  getEmpDetails(){
    this.api.GetEmployees()
    .subscribe(res=>{
      this.Data = res;
    })
  }
  
  deleteEmployee(row: any){
    this.api.DeleteEmployee(row.id)
    .subscribe(res=>{
      alert("Record Deleted");
      this.getEmpDetails();
    })
  }

  postCourseDetails(){    
    this.http.post<any>('http://localhost:3000/courses',this.courseValue.value)
    .subscribe(res=>{
      alert("Course Entered");
      this.courseValue.reset();
      this.getCourseDetails();
      let ref = document.getElementById("close1");
      ref?.click();
      
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

  deleteCourse(row: any){
    this.http.delete<any>('http://localhost:3000/courses/'+ row.id)
    .subscribe(res=>{
      alert("Record Deleted");
      this.getCourseDetails();
    })
  }

  getPriorities(row: any){
    this.http.get<any>('http://localhost:3000/teachers/' + row.id)
    .subscribe(res=>{
      this.list[0] = res.name;
      this.list[1] = res.p1;
      this.list[2] = res.p2;
      this.list[3] = res.p3;
  })
}

  }


