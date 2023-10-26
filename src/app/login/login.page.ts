import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string = ''; // Adicionei um valor padrão aqui
  senha: string = ''; // Adicionei um valor padrão aqui

  constructor(private router: Router) { }

  ngOnInit() {
  }

  clicarBotao(): void {
    console.log('Botão clicado!');
    // Adicione a lógica desejada aqui
  }
}
