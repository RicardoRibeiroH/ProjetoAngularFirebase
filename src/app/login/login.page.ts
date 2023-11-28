import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(private router: Router) { }

  ngOnInit() {
  }

  getDados(form: any){
    let usuario = form;

    fetch('http://localhost/tcc2/login/validacaoLogin.php',
			{
			  method: 'POST',
			  headers: {
			    'Content-Type': 'application/json',
			  },
			  body: JSON.stringify(usuario)
			}
		)
    .then(response => response.json())
    .then(response => {
      console.log(response);
      if(response === true){
        this.router.navigate(['/inicio']);
      }else{
        console.log('erro');
      }
    })    
    .catch(erro => {
      console.log(erro);
    })
    .finally(()=>{
      
      console.log('processo finalizado');
    })
  }
 
  
}
