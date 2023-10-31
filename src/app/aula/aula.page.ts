import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ScrollDetail } from '@ionic/angular';


@Component({
  selector: 'app-aula',
  templateUrl: './aula.page.html',
  styleUrls: ['./aula.page.scss'],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        height: '200px',
        opacity: 1,
        backgroundColor: 'yellow'
      })),
      state('closed', style({
        height: '100px',
        opacity: 0.8,
        backgroundColor: 'blue'
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
    trigger('botaoFade', [
      // ...
      state('fadeIn', style({
        marginLeft: 0,
        opacity: 1,
      })),
      state('fadeOut', style({
        marginLeft: 50,
        opacity: 0.5,
      })),
      transition('fadeIn => fadeOut', [
        animate('0.4s')
      ]),
      transition('fadeOut => fadeIn', [
        animate('0.4qs')
      ]),
    ]),
  ]
})
export class AulaPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  isOpen = true;
  fade = true;
  setFade(){
    this.fade = !this.fade;
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }
  setPosicao(event: CustomEvent<ScrollDetail>){
    console.log(event.detail.scrollTop);
    if(event.detail.scrollTop > 15){
      this.isOpen = true;
    }else{
      this.isOpen = false;
    }
  }
}
