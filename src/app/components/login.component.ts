// Main app compnent
import { Component } from '@angular/core';
import {PostsService}  from '../services/posts.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {CustomRequest} from "../model/CustomRequest";
import {CustomResponse} from "../model/CustomResponse";

// Decorator
@Component({
  moduleId :module.id,
  selector: 'login',
  templateUrl:'../html/login.html',
  providers: [PostsService]
})
export class LoginComponent  {
  multiple: boolean = false;
  name :string;
  loginForm: FormGroup;
  model: CustomRequest;
  showUserInfo :boolean =false;
  showPgTransactions :boolean =false;
  showError=false;
  httpService:PostsService;
  submitted: boolean = false;
  message:string;
  customResponse:CustomResponse = new CustomResponse();
  constructor(private postsService:PostsService,private formBuilder: FormBuilder){
    this.httpService=postsService;
  }
  ngOnInit() {
    this.name = 'Login';
    this.model = new CustomRequest();
    this.loginForm = this.formBuilder.group({
      userName:     [this.model.userName, Validators.required],
      password:     [this.model.password, Validators.required]
    });
  }

  onSubmit({ value, valid }: { value: CustomRequest, valid: boolean }) {
    console.log(JSON.stringify(value));
    this.showError =false;
    this.postsService.postRequest('FETCH_USER_INFO',value).subscribe((posts:CustomResponse)=>{
      this.showPgTransactions = false;
      this.showUserInfo  = false;
      this.customResponse = posts
      console.log("Status =>"+JSON.stringify(this.customResponse.status));
      console.log("Value sof statts: ",JSON.stringify(this.customResponse.pgTransactions));
      if(posts.status=='A500'){
        this.message  ="No Data Found"
        this.showError=true;
        this.showUserInfo = false;
        this.showPgTransactions = false;
      }
      if(this.customResponse.pgTransactions==null){
        this.showPgTransactions = false;
      }else{
        this.showPgTransactions = true;
      }
      if(this.customResponse.user==null){
          this.showUserInfo = false;
        }else{
          this.showUserInfo = true;
        }
    },(err) => {
        console.log("Error While hitting server");
        this.message = "Connection Timeout. Tunnel Problem"
        this.showError=true;
        this.showUserInfo = false;
        this.showPgTransactions = false;
      }
    );
  }
}
