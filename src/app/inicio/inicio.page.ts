import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  constructor(private router: Router) {}

  isMobileDevice(): boolean {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  user = {
    nome: null,
    email: null,
    conectado: false,
    token: null
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

  getDados(form: any){
    let usuario = form;

    fetch('http://localhost/tcc2/cadastro_usuario/login/validacaoLogin.php',
			{
			  method: 'POST',
			  headers: {
			    'Content-Type': 'application/json',
			  },
			  body: JSON.stringify(usuario)
			}
		)
    .then(response => response.json())
    .then(response => {
      this.user = response;
      console.log(this.user);
    })    
    .catch(erro => {
      console.log(erro);
    })
    .finally(()=>{
      
      console.log('processo finalizado');
    })
  }

  adicionarUsuario(form: any){
    let usuario = form;
    // console.log(form);
    fetch('http://localhost/tcc2/cadastro_usuario/cadastro.php',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(usuario)
    })
    .then(resp => resp.json())
    .then(resp=> {
     
      console.log(resp);
    })
    .catch(erro => {
      console.log(erro);
    })
    .finally(()=>{   
      console.log('processo finalizado');
    })
  }

  ngOnInit() {
  }

}
