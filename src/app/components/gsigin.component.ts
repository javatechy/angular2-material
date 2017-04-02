import {Component, ElementRef, AfterViewInit} from '@angular/core';
import {Router} from "@angular/router";
declare const gapi: any;

@Component({
  selector: 'google-signin',
  template: '<button id="googleBtn" md-raised-button md-tooltip="Sign in With Google Account" ><md-icon>Google</md-icon>Sign in With Google Account</button>'
})
export class GSigninComponent implements AfterViewInit {

  private clientId:string = '456327648812-qikdfg2vpu4ancr2a3bt933k2tfdgutj.apps.googleusercontent.com';

  private scope = [
    'profile',
    'email',
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/contacts.readonly',
    'https://www.googleapis.com/auth/admin.directory.user.readonly'
  ].join(' ');

  public auth2: any;
  public googleInit() {
    let that = this;
    gapi.load('auth2', function () {
      that.auth2 = gapi.auth2.init({
        client_id: that.clientId,
        cookiepolicy: 'single_host_origin',
        scope: that.scope
      });
      that.attachSignin(that.element.nativeElement.firstChild);
    });
  }
  public attachSignin(element:any) {
    let that = this;
    this.auth2.attachClickHandler(element, {},
      function (googleUser:any) {

        let profile = googleUser.getBasicProfile();
        console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        console.log('Email: ' + profile.getId());
        //YOUR CODE HERE

      }, function (error:any) {
        console.log(JSON.stringify(error, undefined, 2));
      });
  }

  constructor(private element: ElementRef,private router: Router) {
    console.log('ElementRef: ', this.element);
  }

  ngAfterViewInit() {
    this.googleInit();
  }

}
