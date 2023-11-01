import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  isAlertOpen = false;
  public alertButtons = ['OK'];

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }
  adicionarFuncionarios(form: any){
    let funcionarios = form;
    // console.log(form);
    fetch('http://localhost/tcc2/cadastro/cadastro.php',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(funcionarios)
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
}
