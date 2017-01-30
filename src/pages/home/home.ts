import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ContactForm} from '../contact-form/contact-form';

@Component({
  selector: 'home',
  templateUrl: 'home.html'
})
export class HomePage {
  contactForm = ContactForm;

  bodyParts = ["nose", "eyes", "legs", "ears"];

  constructor(private navController: NavController) {
  }

}
