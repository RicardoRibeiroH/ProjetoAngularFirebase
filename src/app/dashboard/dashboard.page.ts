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
    this.getAllFuncionarios()
  }
  ionViewDidEnter() {
    new Chart(this.elemento.nativeElement, {
      type: 'doughnut', 
      data: {
        datasets: [{
          label: 'My First Dataset',
          data: [300, 100],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
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
          
          borderColor: '#F29F05',
          
        }]
      }
    });
  }
 
  trocarTela = 'grafico_preco';
  isModalOpen = false;
  funcionarios: any;
  
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  getAllFuncionarios(){
    let funcionario = { CodFun: '' };
    fetch('http://localhost/exercicio/funcionario/listarTodos_funcionario.php',
			{
			  method: 'POST',
			  headers: {
			    'Content-Type': 'application/json',
			  },
			  body: JSON.stringify(funcionario)
			}
		)
    .then(response => response.json())
    .then(response => {
      console.log(response);
      this.funcionarios = response['funcionarios'];
    })
    .catch(erro => {
      console.log(erro);
    })
    .finally(()=>{
      console.log('processo finalizado');
    })
  }
}
