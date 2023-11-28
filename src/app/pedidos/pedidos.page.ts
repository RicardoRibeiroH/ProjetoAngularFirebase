import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {

  pedidos: any;
  isModalOpen: any;

  constructor(){
    this.getAllUsuarios()
  }

  ngOnInit() {
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
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
  apagarPedido(CodFun: any){
		let funcionario = { CodFun: CodFun };

    fetch('http://localhost/exercicio/funcionario/remover_funcionario.php',
			{
			  method: 'DELETE',
			  headers: {
			    'Content-Type': 'application/json',
			  },
			  body: JSON.stringify(funcionario)
			}
		)
    .then(resp => resp.json())
    .then(dados => {
      console.log(dados);
      this.pedidos = dados['mensagem'];
      this. getAllUsuarios();
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
      console.log('processo finalizado');
    })
  }
  finalizarPedido(CodFun: any){
		let funcionario = { CodFun: CodFun };

    fetch('http://localhost/exercicio/funcionario/remover_funcionario.php',
			{
			  method: 'DELETE',
			  headers: {
			    'Content-Type': 'application/json',
			  },
			  body: JSON.stringify(funcionario)
			}
		)
    .then(resp => resp.json())
    .then(dados => {
      console.log(dados);
      this.pedidos = dados['mensagem'];
      this. getAllUsuarios();
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
      console.log('processo finalizado');
    })
  }
}
