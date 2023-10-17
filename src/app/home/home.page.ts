import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { AuthenticateService } from '../services/auth.service';
import { CrudService } from '../services/crud.service';
import { Storage, getDownloadURL, ref, uploadBytesResumable } from '@angular/fire/storage';
import { MessageService } from '../services/message.service';
import { Routes, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit {
  @ViewChild('cart') cart!: ElementRef;

  isModalOpen = false;
  hasCartItem: any;
  showCart = true;
  settingAddress: boolean = true;
  totalpreco: number = 0;
  step = 1;
  trocarElement = 'lanches';
  trocarElemento(event: any){
    console.log(event);
   this.trocarElement = event.detail.value;
  }

  trocarStep(valor: any){
    this.step = valor;
  }
  public alertButtons = ['OK'];
  // quantidadeInput = document.getElementById('quantidadeInput');
  // atualizarQtd(attQtd: number, selected: boolean, item_id: any) {
  //   this.produtos.forEach(produto=> {
  //     if (produto){
  //       produto.quantidade = this.quantidadeInput;
  //       console.log(attQtd);
  //     }
  // });
  // }
  produtos = [
    {
      id: 0, 
      description: `X Burguer`,
      items: `Pão com brioche, 1 Carne de Hamburguer,  Cheddar, Mussarela, Alface, Tomate`,
      price: `33,00`,
      type: 'lanche',
      quantidade: 0,
      enabled: true,
      selected: false,
      image: `https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`
    },
    {
      id: 1, 
      description: `X Egg`, 
      items: `Pão com brioche, 1 Carne de Hamburguer, Ovo Frito, Mussarela, Alface, Tomate`,
      price: `25,00`,
      type: 'lanche',
      quantidade: 0,
      enabled: true,
      selected: false,
      image: `https://images.pexels.com/photos/17831235/pexels-photo-17831235/free-photo-of-hamburguer-sanduiche-fotografia-de-alimentos-fotografia-de-comida.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`
    },
    {
      id: 2, 
      description: `X Salada`,
      items: `Pão com brioche, 1 Bisteca, Alface, Tomate, Cebola, Picles`,
      price: `30,00`,
      type: 'lanche',
      quantidade: 0,
      enabled: true,
      selected: false,
      image: `https://images.pexels.com/photos/327158/pexels-photo-327158.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`
    },
    {
      id: 3,
      description: `Fran Burguer`,
      items: `Pão com brioche, 1 Frango empanado, Alface, Tomate, Cebola`,
      price: `28,50`,
      type: 'lanche',
      quantidade: 0,
      enabled: true,
      selected: false,
      image: `https://images.pexels.com/photos/2983103/pexels-photo-2983103.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`
    },
    {
      id: 4,
      description: `X tudo`,
      items: `Pão com brioche, 1 Carne de Hamburguer, 1 Ovo Frito, 1 Bisteca, 1 Frango Empanado, Cheddar, Mussarela, Alface, Tomate, Cebola,  Picles`,
      price: `50,00`,
      type: 'lanche',
      quantidade: 0,
      enabled: true,
      selected: false,
      image: `https://images.pexels.com/photos/15476361/pexels-photo-15476361/free-photo-of-grande-enorme-importante-borda.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`
    },
    {
      id: 5,
      description: `Simplão`,
      items: `Pão com Brioche, 1 Carne de Hamburguer, Cheddar`,
      price: `15.00`,
      type: 'lanche',
      quantidade: 0,
      enabled: true,
      selected: false,
      image: `https://images.pexels.com/photos/8862211/pexels-photo-8862211.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`
    },
    {
      id: 6,
      description: `Simplão`,
      items: `Pão com Brioche, 1 Carne de Hamburguer, Cheddar`,
      price: `15.00`,
      type: 'lanche',
      quantidade: 0,
      enabled: true,
      selected: false,
      image: `https://images.pexels.com/photos/8862211/pexels-photo-8862211.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`
    },
    {
      id: 7,
      description: `Simplão`,
      items: `Pão com Brioche, 1 Carne de Hamburguer, Cheddar`,
      price: `15.00`,
      type: 'lanche',
      quantidade: 0,
      enabled: true,
      selected: false,
      image: `https://images.pexels.com/photos/8862211/pexels-photo-8862211.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`
    },
    {
      id: 8,
      description: `Simplão`,
      items: `Pão com Brioche, 1 Carne de Hamburguer, Cheddar`,
      price: `15.00`,
      type: 'lanche',
      quantidade: 0,
      enabled: true,
      selected: false,
      image: `https://images.pexels.com/photos/8862211/pexels-photo-8862211.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`
    },
    {
      id: 9, 
      description: `Batata Frita`,
      items: `Batata Frita`,
      price: `10,00`,
      type: 'porcao',
      quantidade: 0,
      enabled: true,
      selected: false,
      image: `https://images.pexels.com/photos/8880739/pexels-photo-8880739.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`
    },
    {
      id: 10, 
      description: `Cebola Frita`, 
      items: `Cebola Frita`,
      price: `15,00`,
      type: 'porcao',
      quantidade: 0,
      enabled: true,
      selected: false,
      image: `https://images.pexels.com/photos/6941050/pexels-photo-6941050.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`
    },
    {
      id: 11, 
      description: `Frango Frito`,
      items: `Frango Frito`,
      price: `18,00`,
      type: 'porcao',
      quantidade: 0,
      enabled: true,
      selected: false,
      image: `https://images.pexels.com/photos/13795311/pexels-photo-13795311.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`
    },
    {
      id: 12,
      description: `Nuggets`,
      items: `Nuggets de frango`,
      price: `28,50`,
      type: 'porcao',
      quantidade: 0,
      enabled: true,
      selected: false,
      image: `https://images.pexels.com/photos/17282046/pexels-photo-17282046/free-photo-of-ovo-frito-fornada-assando-brasil.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`
    },
    {
      id: 13,
      description: `Nuggets`,
      items: `Nuggets de frango`,
      price: `28,50`,
      type: 'porcao',
      quantidade: 0,
      enabled: true,
      selected: false,
      image: `https://images.pexels.com/photos/17282046/pexels-photo-17282046/free-photo-of-ovo-frito-fornada-assando-brasil.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`
    },
    {
      id: 14,
      description: `Nuggets`,
      items: `Nuggets de frango`,
      price: `28,50`,
      type: 'porcao',
      quantidade: 0,
      enabled: true,
      selected: false,
      image: `https://images.pexels.com/photos/17282046/pexels-photo-17282046/free-photo-of-ovo-frito-fornada-assando-brasil.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`
    },
    {
      id: 15,
      description: `Nuggets`,
      items: `Nuggets de frango`,
      price: `28,50`,
      type: 'porcao',
      quantidade: 0,
      enabled: true,
      selected: false,
      image: `https://images.pexels.com/photos/17282046/pexels-photo-17282046/free-photo-of-ovo-frito-fornada-assando-brasil.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`
    },
    {
      id: 16,
      description: `Nuggets`,
      items: `Nuggets de frango`,
      price: `28,50`,
      type: 'porcao',
      quantidade: 0,
      enabled: true,
      selected: false,
      image: `https://images.pexels.com/photos/17282046/pexels-photo-17282046/free-photo-of-ovo-frito-fornada-assando-brasil.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`
    },
    {
      id: 17,
      description: `Nuggets`,
      items: `Nuggets de frango`,
      price: `28,50`,
      type: 'porcao',
      quantidade: 0,
      enabled: true,
      selected: false,
      image: `https://images.pexels.com/photos/17282046/pexels-photo-17282046/free-photo-of-ovo-frito-fornada-assando-brasil.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`
    },
    {
      id: 18, 
      description: `Coca-Cola`,
      items: `Coca-Cola 500ML`,
      price: `8,00`,
      type: 'bebida',
      quantidade: 0,
      enabled: true,
      selected: false,
      image: `https://images.pexels.com/photos/3200651/pexels-photo-3200651.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`
    },
    {
      id: 19, 
      description: `Coca-Cola`, 
      items: `Coca-Cola 700ML`,
      price: `10,00`,
      type: 'bebida',
      quantidade: 0,
      enabled: true,
      selected: false,
      image: `https://images.pexels.com/photos/2983100/pexels-photo-2983100.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`
    },
    {
      id: 20, 
      description: `Pepsi`,
      items: `Pepsi 500ML`,
      price: `10,00`,
      type: 'bebida',
      quantidade: 0,
      enabled: true,
      selected: false,
      image: `https://images.pexels.com/photos/9935862/pexels-photo-9935862.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`
    },
    {
      id: 21,
      description: `Suco de Laranja`,
      items: `Suco de Laranja 500ML`,
      price: `15,00`,
      type: 'bebida',
      quantidade: 0,
      enabled: true,
      selected: false,
      image: `https://images.unsplash.com/photo-1600271886742-f049cd451bba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80`
    },
    {
      id: 22,
      description: `Suco de Morango`,
      items: `Suci de Morango 500ML`,
      price: `15,00`,
      type: 'bebida',
      quantidade: 0,
      enabled: true,
      selected: false,
      image: `https://images.pexels.com/photos/7586828/pexels-photo-7586828.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`
    },
    {
      id: 23,
      description: `Suco de Abacaxi`,
      items: `Suco de Abacaxi 500ML`,
      price: `15,00`,
      type: 'bebida',
      quantidade: 0,
      enabled: true,
      selected: false,
      image: `https://images.pexels.com/photos/5817633/pexels-photo-5817633.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`
    },
    {
      id: 24,
      description: `Àgua`,
      items: `Àgua 600ML`,
      price: `10,00`,
      type: 'bebida',
      quantidade: 0,
      enabled: true,
      selected: false,
      image: `https://images.unsplash.com/photo-1576468475364-6ff071f7bc7c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80`
    },
  ];

  
  
  ngAfterViewInit(): void {
    console.log(this.cart);
  }

  adicionarcarrinho(item_id: any,  selected: boolean, add: any){
    this.produtos.forEach(produto=> {
      if (produto.id == item_id)
      produto.selected = add;
  });
  this.calculateTotal();
  this.hasCartItem = this.produtos.filter(produto => produto.selected == true);
  }

  selected(item_id: any, selected: boolean){
    this.produtos.forEach(produto=> {
        if (produto.id == item_id)
        produto.selected = !selected;
    });
    this.calculateTotal();
    this.hasCartItem = this.produtos.filter(produto => produto.selected == true);
  }
  
  upDownCart(){
    if (this.showCart) {
      this.cart.nativeElement.classList.add('hide-cart');
      this.showCart = false;
    } else {
      this.cart.nativeElement.classList.remove('hide-cart');
      this.showCart = true;
    }
  }
  calculateTotal() {
    this.totalpreco = 0;
    this.produtos.forEach(produto => {
      if (produto.selected) {
        this.totalpreco += parseFloat(produto.price.replace(',', '.'));
      }
    });
  }
  
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  setPaymentMode() {
    this.settingAddress = !this.settingAddress;
  }
   
  swiperSlideChanged(e: any){
    console.log('changed: ', e);
  } 



  isLoading: boolean = false;

  alunos = [];
  aluno = {
    nome: null,
    idade: null,
    ra: null,
    id: null
  }
  infos = [];
  info = {
    nome: null,
    telefone: null,
    cep: null,
    bairro: null,
    rua: null,
    numero : null
  }
  
  public file: any = {};

  constructor(
    public _authenticate: AuthenticateService,
    private _crudService: CrudService,
    public storage: Storage,
    private _message: MessageService
  ) { }

  criarConta(dados: any){
    this._authenticate.register(dados.email, dados.password)
  }

  realizarLogin(dados: any) {
    this._authenticate.login(dados.email, dados.password);
  }
  inserirAluno(dados: any){
    this.aluno.nome = dados.nome;
    this.aluno.idade = dados.idade;
    this.aluno.ra = dados.ra;
    this.aluno.id = dados.id;
    this._crudService.insert(this.aluno, 'teste');
  }
  inserirInfo(dados: any){
    this.info.nome = dados.nome;
    this.info.telefone = dados.telefone;
    this.info.cep = dados.cep;
    this.info.bairro = dados.bairro;
    this.info.rua = dados.rua;
    this.info.numero = dados.numero;
    this._crudService.insert(this.info, 'professores');
  }

  listarAlunos(){
    this._crudService.fetchAll('alunos')
    .then( alunos => {
      this.alunos = alunos;
    })
  }

  removerAluno(aluno: any){
    console.log(aluno);
    this._crudService.remove(aluno.id, 'alunos')
  }

  consultarAluno(dados: any){
    console.log(dados);
    this._crudService.fetchByOperatorParam('nome', '==', dados.nome, 'alunos')
    .then( aluno => {
      console.log(aluno[0].id);
    })
  }

  atualizarDadosAluno(dados: any){
    if (this.aluno.id == null) {
      this._crudService.fetchByOperatorParam('nome', '==', dados.nome, 'alunos')
      .then( aluno => {
        this.aluno = aluno[0];
        console.log(this.aluno);
      })
    } else {
      this._crudService.update(this.aluno.id, dados, 'alunos');
    }
  }

  memorizarArquivo(event: any) {
    this.file = event.target.files[0];
  }

  fazerUpload() {
    if (!this.file.name) {
      this._message.show('Favor selecionar o arquivo a ser enviado', 5000);
      return;
    }

    // Upload file and metadata to the object 'images/mountains.jpg'
      const storageRef = ref(this.storage, this.file.name);
      const uploadTask = uploadBytesResumable(storageRef, this.file);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on('state_changed',
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          console.log('Upload is ' + progress + '% done');

          switch (snapshot.state) {
            case 'paused':
              console.log('Envio pausado');
              break;
            case 'running':
              console.log('Carregando arquivo');
              this._message.show('Carregando arquivo, favor aguardar!', 2000);
              break;
          }
        },
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              console.log('Não enviado! Usuário sem permissão');
              this._message.show('Não enviado! Usuário sem permissão!');
              break;
            case 'storage/canceled':
              // User canceled the upload
              console.log('Não enviado: upload cancelado');
              this._message.show('Erro: Upload cancelado!');
              break;
            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              console.log('Não enviado. Ocorreu um erro desconhecido!');
              this._message.show('Oops! Ocorreu um erro desconhecido!');
              break;
          }

          console.log('Arquivo enviado');
          this._message.show('Arquivo enviado com sucesso!');
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('Url do arquivo é ' + downloadURL)
          });
        }
      );
  }
// chartJS
}
