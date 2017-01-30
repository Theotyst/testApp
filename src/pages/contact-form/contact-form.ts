import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Camera} from "ionic-native";
import {Http, Request, RequestMethod, Headers} from "@angular/http";

/*
 Generated class for the ContactForm page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-contact-form',
  templateUrl: 'contact-form.html'
})
export class ContactForm {
  public base64Image: string;
  http: Http;
  mailgunUrl: string;
  mailgunApiKey: string;
  bodyPart: string;
  // formData: FormData = new FormData();
  formData = {
    firstName: "",
    lastName: "",
    email: "",
    details: ""
  };


  constructor(public params: NavParams, private navController: NavController, http: Http) {
    this.bodyPart = params.get('bodyPart');
    this.base64Image = "https://placehold.it/150x150";

    this.http = http;
    this.mailgunUrl = "linglain.tk";
    this.mailgunApiKey = window.btoa("api:key-e965412432da120504e2dc128bd255f2");
  }

  public takePicture() {
    Camera.getPicture({
      quality: 75,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 300,
      targetHeight: 300,
      saveToPhotoAlbum: false
    }).then(imageData => {
      this.base64Image = "data:image/jpeg;base64," + imageData;
    }, error => {
      console.log("ERROR -> " + JSON.stringify(error));
    });
  }

  public sendMail() {
    var recipient: string = "thibault.linglain@gmail.com";
    var subject: string = "[app] test for " + this.bodyPart;
    var message: string = "From: " + this.formData.firstName + " " + this.formData.lastName.toUpperCase() + ", " + this.formData.email + ", details : " + this.formData.details;
    var requestHeaders = new Headers();
    requestHeaders.append("Authorization", "Basic " + this.mailgunApiKey);
    requestHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    this.http.request(new Request({
      method: RequestMethod.Post,
      url: "https://api.mailgun.net/v3/" + this.mailgunUrl + "/messages",
      body: "from=test@example.com&to=" + recipient + "&subject=" + subject + "&text=" + message,
      headers: requestHeaders
    }))
        .subscribe(success => {
          console.log("SUCCESS -> " + JSON.stringify(success));
        }, error => {
          console.log("ERROR -> " + JSON.stringify(error));
        });
  }

  ionViewDidLoad() {
    console.log('Hello ContactForm Page');
  }

}
