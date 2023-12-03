import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {

  pedidos: any;
  isModalOpen: any;
  isLoading: boolean = false;

  constructor(){
    this.getAllpedidos()
  }

  ngOnInit() {
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  getAllpedidos(){
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

  apagarPedido(id: any){
    this.isLoading = true;
    let pedidos = { id: id };
    fetch('http://localhost/tcc2/pedidos/deletar.php',
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(pedidos)
        }
    )
    .then(resp => resp.json())
    .then(dados => {
      console.log(dados);
      this.pedidos = dados['mensagem'];
      this.getAllpedidos();
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
      this.isLoading = false;
      console.log('processo finalizado');
    })
}

}
