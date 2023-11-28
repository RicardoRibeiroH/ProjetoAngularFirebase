import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {

  pedidos: any;

  constructor(){
    this.getAllUsuarios()
  }

  ngOnInit() {
  }

  getAllUsuarios(){
    let pedidos = { id: '' };
    fetch('http://localhost/tcc2/pedidos/enviar.php',
			{
			  method: 'POST',
			  headers: {
			    'Content-Type': 'application/json',
			  },
			  body: JSON.stringify(pedidos)
			}
		)
    .then(response => response.json())
    .then(response => {
      console.log(response);
      this.pedidos = response['pedidos'];
    })
    .catch(erro => {
      console.log(erro);
    })
    .finally(()=>{
      console.log('processo finalizado');
    })
  }
}
