import { Component, OnInit } from "@angular/core";
import { ValidateService } from "../../Services/validate.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { AuthService } from "../../Services/auth.service";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  tokenTimer: any;
  isFirstnameFilled: boolean;
  isLastnameFilled: boolean;
  isEmailFilled: boolean;
  form_1: FormGroup;
  form_2: FormGroup;
  isinvalidlogininfo = false;
  isMissingField;
  isInvalidEmail;
  usernameforfetch: String;
  ngOnInit() {
    this.form_1 = new FormGroup({
      'email': new FormControl(null, { validators: [Validators.required] }),
      'password': new FormControl(null, { validators: [Validators.required] })
    });
    this.form_2 = new FormGroup({
      firstname: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(1)]
      }),
      lastname: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(1)]
      }),
      email: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(1)]
      })
    });
  }
  constructor(
    private validateService: ValidateService,
    private flashmessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }
  onSubmitHandler() {
    this.isMissingField = false;
    this.isInvalidEmail = false;
    if (this.form_2.invalid) {
      if (
        this.form_2.value.email == null ||
        this.form_2.value.email == undefined
      ) {
        this.isEmailFilled = false;
        console.log(this.isEmailFilled);
      }
      if (
        this.form_2.value.firstname == null ||
        this.form_2.value.firstname == undefined
      ) {
        this.isFirstnameFilled = false;
        console.log(this.isFirstnameFilled);
      }
      if (
        this.form_2.value.lastname == null ||
        this.form_2.value.lastname == undefined
      ) {
        this.isLastnameFilled = false;
      }
      this.isMissingField = true;
      return false;
    } else if (!this.validateService.validateEmail(this.form_2.value.email)) {
      this.isInvalidEmail = true;
      return false;
    } else {
      this.authService.user = this.form_2.value;
      this.router.navigate(["account"]);
      return true;
    }
  }
  onloginHandler() {
    if(this.form_1.invalid)
    {
      this.flashmessage.show("MISSING FIELD",{ cssClass: 'alert-danger', timeout: 1000 } )
      return;
    }
    let user = {
      email: this.form_1.value.email,
      password: this.form_1.value.password
    }
    this.authService.Authenticate(user).subscribe(data => {
      if (data.success) {
        console.log(data.msg);
        console.log(data);
        const token = data.token;
        const lastname = data.user.lastname;
        if(token&&lastname)
        {
          this.authService.authStatusListener.next(true);
          this.authService.authNamelistener.next(lastname);
          this.authService.setLastname(lastname);
          this.authService.setIsAuthenticated(true);
        }
        const expirationTime = data.expirationTime;
        this.authService.setAuthTimer(expirationTime);
        const NOW = new Date();
        const expirationDate = new Date(NOW.getTime() + expirationTime * 1000);
        this.authService.storeUserData(token, expirationDate, lastname);
        this.router.navigate(['profile'])
      } else {
        console.log(data.msg);
        this.flashmessage.show(data.msg,{ cssClass: 'alert-danger', timeout: 1000 } )
      }
    })

  }
  onchangehandler() {
    if (
      this.form_2.value.firstname != null ||
      this.form_2.value.firstname != undefined
    ) {
      this.isFirstnameFilled = true;
    }
    if (
      this.form_2.value.lastname != null ||
      this.form_2.value.lastname != undefined
    ) {
      this.isLastnameFilled = true;
    }
    if (
      this.form_2.value.email != null ||
      this.form_2.value.email != undefined
    ) {
      this.isEmailFilled = true;
    }
    if (this.validateService.validateEmail(this.form_2.value.email)) {
      this.isInvalidEmail = false;
    }
  }
  /* For testing */
  fetchUser() {
    let user = {
      email: 'nhatduy123@yahoo.com'
    }
    this.authService.getProfile(user).subscribe(data => {
      console.log(data);
    });
  }
  logOut() {
    this.authService.logOut();
    clearTimeout(this.tokenTimer);
    this.router.navigate(['register']);

  }
}
