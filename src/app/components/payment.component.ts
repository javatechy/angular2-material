// Main app compnent
import { Component,Optional } from '@angular/core';
import {PostsService}  from '../services/posts.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {CustomRequest} from "../model/CustomRequest";
import {MdDialog, MdDialogRef, MdSnackBar} from '@angular/material';

// Decorator
@Component({
  moduleId :module.id,
  selector: 'payment',
  templateUrl:'../html/payment.html',
  providers: [PostsService]
})
export class PaymentComponent  {
  name :string;
  showInitiatePayment :boolean;
  showManualReversal :boolean;
  httpService:PostsService;
  paymentForm: FormGroup;
  model: CustomRequest;
  submittedModel: CustomRequest;
  submitted: boolean = false;
  showMessage = true;
  message:string;

  constructor(private postsService:PostsService,private formBuilder: FormBuilder){
    this.name = 'Payment Issues';
    this.showInitiatePayment=true;
    this.showManualReversal=false;
    this.httpService=postsService;
    this.showMessage=false;
    this.message="Refund is Successful";
  }
  ngOnInit() {
    this.model = new CustomRequest();
    this.paymentForm = this.formBuilder.group({
      orderNumbers:     [this.model.orderNumbers, Validators.required]
    });
  }
  toggleBars(){
    if(this.showInitiatePayment==true){
      this.showInitiatePayment=false;
      this.showManualReversal=true;
    }else{
      this.showInitiatePayment=true;
      this.showManualReversal=false;
    }
  }

  hitSystemInitiateReversal(){
    console.log("String =>"+JSON.stringify(this.model));
    this.postsService.postRequest('INITIATE_PAYBACK',this.model).subscribe(posts=>{
      this.showMessage=true;
      console.log(posts);
      if(posts.status=='A500'){
        this.message  ="Failed To Refund amount. Please check application logs "
      }
      this.showMessage=true;
    },(err) => {
      console.log("Error While hitting server");
      this.message = "Connection Timeout. Tunnel Problem"
      this.showMessage=true;
    });
  }
  onSubmit({ value, valid }: { value: CustomRequest, valid: boolean }) {
    this.submitted = true;
    this.submittedModel = value;
  }
}




@Component({
  moduleId :module.id,
  templateUrl :'../html/confirmationDilog.html',
})
export class DialogContent {
  constructor(@Optional() public dialogRef: MdDialogRef<DialogContent>) {
  }
}
