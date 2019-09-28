import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { ProductService } from '../Services/product.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-narbar',
  templateUrl: './narbar.component.html',
  styleUrls: ['./narbar.component.css']
})
export class NarbarComponent implements OnInit, OnDestroy {
  @Input() event;
  public optionImage;
  public selection;
  public option;
  public userAuthenticated: boolean = false;
  public user_lastname: string;
  public authListenerSubs: Subscription;
  public interval;
  public menuClass = {
    "d-none": true,
    "d-flex": false
  }
  constructor(private authservice: AuthService,
    private router: Router,
    private productservice: ProductService,
    private flashmessage: FlashMessagesService,
  ) {}
  ngOnInit() {
    this.user_lastname = this.authservice.getUserlastname();
    this.userAuthenticated = this.authservice.getIsAuthenticated();
    this.authListenerSubs = this.authservice.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userAuthenticated = isAuthenticated;
    })
    this.authListenerSubs = this.authservice.getAuthNameListener().subscribe(lastname => {
      this.user_lastname = lastname;
    })
  }
  enterMenuHandler(element) {
    this.option = element;
    switch (element) {
      case "plakat":
        this.optionImage = "assets/images/type3.png";
        break
      case "halfmoon":
        this.optionImage = "assets/images/type2.png";
        break;
      case "crowntail":
        this.optionImage = "assets/images/type1.png";
        break;
      case "fighter":
        this.optionImage = "assets/images/type3.png";
        break;

    }
    this.isMenuLook();
  }
  leaveMenuHandler() {
    this.interval = setInterval(() => {
      this.isdone();
    }, 1000)
  }
  isMenuLook() {
    clearInterval(this.interval)
    this.menuClass = {
      "d-none": false,
      "d-flex": true
    }
  }
  isdone() {
    this.menuClass = {
      "d-none": true,
      "d-flex": false
    }
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

}
