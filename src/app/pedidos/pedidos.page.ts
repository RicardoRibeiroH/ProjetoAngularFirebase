import { BoundElementProperty } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {

  pedidos: any;
  isModalOpen: any;
  isLoading: boolean = false;
  corTexto: string = 'black';

  constructor(private alertController: AlertController){
    this.getAllpedidos()
  }

  ngOnInit() {
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  getAllpedidos() {
    let pedidos = { id: '' };
    fetch('http://localhost/tcc2/pedidos/enviar.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pedidos),
    })
    .then(response => response.json())
    .then(response => {
      console.log(response);
  
      // Mapeia os pedidos e inverte a data
      this.pedidos = response['pedidos'].map((pedido: any) => {
        if (pedido.dataPed) {
          pedido.dataPedInvertida = this.inverterData(pedido.dataPed);
        }
        return pedido;
      });
    })
    .catch(erro => {
      console.log(erro);
    })
    .finally(() => {
      console.log('processo finalizado');
    });
  }
  
  inverterData(data: string): string {
    const partesData = data.split("-");
    const dataInvertida = partesData.reverse().join("-");
    return dataInvertida;
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
    })
    .catch(error => {
      console.log(error);
      this.getAllpedidos();
    })
    .finally(() => {
      this.isLoading = false;
      console.log('processo finalizado');
    })
 }

  finalizarPedido(pedido: any) {
    pedido.corTexto = '#2dd36f';
  }

 

  


  async presentAlert(pedido: any) {
    const alert = await this.alertController.create({
      header: 'Finalizar pedido?',
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'Não',
          cssClass: 'alert-button-cancel',
        },
        {
          text: 'Sim',
          cssClass: 'alert-button-confirm',
          handler: () => {
            this.finalizarPedido(pedido);
          },
        },
      ],
    });
  
    await alert.present();
  }

  async presentAlert2(id: any) {
    const alert = await this.alertController.create({
      header: 'Apagar pedido?',
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'Não',
          cssClass: 'alert-button-cancel',
        },
        {
          text: 'Sim',
          cssClass: 'alert-button-confirm',
          handler: () => {
            this.apagarPedido(id);
          },
        },
      ],
    });
  
    await alert.present();
  }
  
}