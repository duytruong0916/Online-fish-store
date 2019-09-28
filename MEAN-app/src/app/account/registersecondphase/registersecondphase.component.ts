import { Component, OnInit } from "@angular/core";
import { ValidateService } from "../../Services/validate.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { AuthService } from "../../Services/auth.service";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators, FormControlName} from "@angular/forms";
import {User} from "../user-model";
@Component({
  selector: 'app-registersecondphase',
  templateUrl: './registersecondphase.component.html',
  styleUrls: ['./registersecondphase.component.css']
})
export class RegistersecondphaseComponent implements OnInit {
 isSuccessful:boolean;
 isCreatedMessage:string;
 isEmailFilled: boolean;
 isPasswordFilled:boolean;
 isPassword_confirmFilled:boolean;
 isFirstnameFilled: boolean;
 isLastnameFilled: boolean;
 isPasswordMatched:boolean;
 isInvalidEmail: boolean;
 isMissingField: boolean;
 form: FormGroup;
 genders: any[] = ['Choose gender','Male', 'Female', 'Prefer not to say']
 days:any[] = ['Day',1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,23,25,26,27,28,29,30,31];
 months:any[]= ['Month',1,2,3,4,5,6,7,8,9,10,11]
 years:any[]= ['Year'];
 yearsRange(){
  let startYear = 1980;
  let currentYear = new Date().getFullYear();
  for(var i=startYear;i<=currentYear;i++){
      this.years.push(i);
  }
  return this.years;
 }
  ngOnInit() {
    this.form = new FormGroup({
      'firstname': new FormControl(this.authService.user.firstname,{validators:[Validators.required]}),
      'lastname': new FormControl(this.authService.user.lastname, {validators:[Validators.required]}),
      'email': new FormControl(this.authService.user.email, {validators:[Validators.required]}),
      'phone': new FormControl(null),
      'gender': new FormControl(null),
      'day': new FormControl(null),
      'month': new FormControl(null),
      'year': new FormControl(null),
      'agreement_1': new FormControl(null),
      'password': new FormControl(null, {validators:[Validators.required]}),
      'password_confirm': new FormControl(null, {validators:[Validators.required]}),
      })
    }

  constructor(
    private validateService: ValidateService,
    private flashmessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router) { }
  onSubmitHandler() {
    this.isMissingField = false;
    this.isPasswordMatched=true;
    if (this.form.invalid) {
      if(this.form.value.email==null||this.form.value.email==undefined)
      {
        this.isEmailFilled=false;
        console.log(this.isEmailFilled)
      }
      if(this.form.value.firstname==null||this.form.value.firstname==undefined)
      {
        this.isFirstnameFilled=false;
        console.log(this.isFirstnameFilled)
      }
      if(this.form.value.lastname==null||this.form.value.lastname==undefined)
      {
        this.isLastnameFilled=false;
      }
      if(this.form.value.password==null||this.form.value.password==undefined)
      {
        this.isPasswordFilled=false;
      }
      if(this.form.value.password_confirm==null||this.form.value.password_confirm==undefined)
      {
       this.isPassword_confirmFilled=false;
      }
      console.log("invalid form")
      this.isMissingField = true;
      return false;
    } else if (!this.validateService.validateEmail(this.form.value.email)) {
      this.isInvalidEmail = true;
      return false;
    } else if(this.form.value.password!=this.form.value.password_confirm){
      this.isPasswordMatched=false;
      return false;
    }
    else {
      const user:User = {
        'firstname': this.form.value.firstname,
        'lastname': this.form.value.lastname,
        'email': this.form.value.email,
        'birthday': this.form.value.month + '-'+ this.form.value.day +'-'+this.form.value.year,
        'phone': this.form.value.phone,
        'gender':this.form.value.gender,
        'password':this.form.value.password
            }
      this.authService.Register(user).subscribe(data=>{
        if(data.success==false){
          this.isSuccessful = data.success;
          this.isCreatedMessage= data.msg;
          console.log(data.msg)
          return false;
        }
        else{
          console.log(data.msg)
          this.isSuccessful = data.success;
          this.isCreatedMessage= data.msg;
          const userInfor ={email: user.email, password: user.password}
          this.authService.Authenticate(userInfor);
          return true;
        }
      })
    }
  }
onchangehandler(){
  if(this.form.value.firstname!=null||this.form.value.firstname!=undefined)
  {
    this.isFirstnameFilled=true;
  }
  if(this.form.value.lastname!=null||this.form.value.lastname!=undefined)
  {
    this.isLastnameFilled=true;
  }
  if(this.form.value.email!=null||this.form.value.email!=undefined)
  {
    this.isEmailFilled=true;
  }
  if(this.form.value.password!=null||this.form.value.password!=undefined)
  {
    this.isPasswordFilled=true;
  }
  if(this.form.value.password_confirm!=null||this.form.value.password_confirm!=undefined)
  {
    this.isPassword_confirmFilled=true;
  }
  if(this.validateService.validateEmail(this.form.value.email)){
    this.isInvalidEmail = false;
  }

}
}
