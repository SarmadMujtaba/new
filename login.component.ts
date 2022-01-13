import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { logged } from '../global';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm! : FormGroup

  
  logg : number = 0;
  str: string ="";
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: ['']
    })
  }
  login(){
    this.http.get<any>("http://localhost:3000/teachers")
    .subscribe(res=>{
        const user = res.find((a:any)=>{
        if (a.email === this.loginForm.value.email && a.password === this.loginForm.value.password)
        {
          this.str = a.id;
        }
        return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
    });  
    if(this.loginForm.value.email === "admin@gmail.com" && this.loginForm.value.password === "admin")
    {
      this.router.navigate(['admin']);
    }
    else if(user)  
    {
      sessionStorage.setItem("logged", this.str)
      this.router.navigate(['user'])
    }
    else
    {
      alert("User not found");
    }
  },err=>{
    alert("Something went wrong !");
  })
}

}
