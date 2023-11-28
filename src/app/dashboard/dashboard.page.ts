import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage {
  @ViewChild("meuCanvas", { static: true }) elemento!: ElementRef;
  @ViewChild("graficoMain", { static: true }) elemento2!: ElementRef;

  constructor(){
    this.getAllUsuarios()
  }
  ionViewDidEnter() {
    new Chart(this.elemento.nativeElement, {
      type: 'doughnut', 
      data: {
        datasets: [{
          label: 'My First Dataset',
          data: [300, 100],
          backgroundColor: [
            '#D92D07',
            '#F29F05',
          ],
          hoverOffset: 4
        }]
      }
    });
    new Chart(this.elemento2.nativeElement, {
      type: 'line', 
      data: {
        labels: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
        datasets: [{
          label: 'Valores',
          data: [65, 59, 80, 81, 56, 55, 40],
          
          borderColor: '#D92D07',
          
        }]
      }
    });
  }
 
  trocarTela = 'grafico_preco';
  isModalOpen = false;
  isModalOpen2 = false;
  usuarios: any;
  
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  setOpen2(isOpen: boolean) {
    this.isModalOpen2 = isOpen;
  }
  getAllUsuarios(){
    let usuarios = { id: '' };
    fetch('http://localhost/tcc2/pedidos/enviar.php',
			{
			  method: 'POST',
			  headers: {
			    'Content-Type': 'application/json',
			  },
			  body: JSON.stringify(usuarios)
			}
		)
    .then(response => response.json())
    .then(response => {
      console.log(response);
      this.usuarios = response['usuarios'];
    })
    .catch(erro => {
      console.log(erro);
    })
    .finally(()=>{
      console.log('processo finalizado');
    })
  }
}
