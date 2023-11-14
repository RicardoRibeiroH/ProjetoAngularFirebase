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
  }
  
  
}
