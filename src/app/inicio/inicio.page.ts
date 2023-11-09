import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {  ElementRef, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  constructor(
    public element: ElementRef, 
    public renderer: Renderer2
  ) { }

  ngOnInit() {
  }

  onRegisterClick() {
    const wrapper = document.querySelector('.wrapper');
    if (wrapper) {
      wrapper.classList.add('active');
    }
  }

  onLoginClick() {
    const wrapper = document.querySelector('.wrapper');
    if (wrapper) {
      wrapper.classList.remove('active');
    }
  }

  onBtnPopupClick() {
    const wrapper = document.querySelector('.wrapper');
    if (wrapper) {
      wrapper.classList.add('active-popup');
    }
  }

  onIconCloseClick() {
    const wrapper = document.querySelector('.wrapper');
    if (wrapper) {
      wrapper.classList.remove('active-popup');
    }
  }

}
