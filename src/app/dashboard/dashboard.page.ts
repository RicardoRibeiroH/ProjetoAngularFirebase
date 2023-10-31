import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage {
  @ViewChild("meuCanvas", { static: true }) elemento!: ElementRef;

  ionViewDidEnter() {
    new Chart(this.elemento.nativeElement, {
      type: 'line', 
      data: {
        labels: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
        datasets: [
          {
            data: [85, 72, 88, 33, 53, 86, 11]
          }
        ]
      }
    });
    
  }
  
  
}
