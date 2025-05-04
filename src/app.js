//Renderizar la mano del jugador
//Renderizar la primera carta del dealer dealerHand[0]
//Función de renderizar carta
//Diseño de las cartas ()
//Modal del Resultado + Nueva Partida

  // pedir => renderizar la carta nueva
  // mostrar resultado + opción de nueva partida

import "bootstrap";
import "./style.css";

window.onload = function() {
  //write your code here
  const palos = ['♦' , '♥' , '♠',  '♣'];
  const carta = [
    {valor: 1, cuerpo: '1'},
    {valor: 2, cuerpo: '2'},
    {valor: 3, cuerpo: '3'},
    {valor: 4, cuerpo: '4'},
    {valor: 5,cuerpo: '5'},
    {valor: 6,cuerpo: '6'},
    {valor: 7,cuerpo: '7'},
    {valor: 8,cuerpo: '8'},
    {valor: 9,cuerpo: '9'},
    {valor: 10,cuerpo: '10'},
    {valor: 10,cuerpo: 'J'},
    {valor: 10,cuerpo: 'Q'},
    {valor: 10,cuerpo: 'K'},
  ];

  const crearMazo = () =>{
    const cardList = [];
    palos.forEach(
      (palo) => {
        carta.forEach(
          ({valor, cuerpo}) => {
            cardList.push({
              palo, valor, cuerpo
            })
          }
        )
      }
    )
    return cardList;
  };
  // let mazo = crearMazo();
  

  const _barajarMazo = (mazo) => {
    for (let i = mazo.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [mazo[i], mazo[j]] = [mazo[j], mazo[i]];
    }
    return mazo;
  };
  

  const _getInitialHand = (mazo) => {
    return [mazo.pop(), mazo.pop()];
  };

  // let playerHand = _getInitialHand(mazo);
  // let dealerHand = _getInitialHand(mazo);
  

  const _getValue = (hand) => hand.reduce((acc, carta) => {
    acc = acc + carta.valor;
    return acc;
  }, 0);


  const _getResult = (playerValue, dealerValue) => {
    if(playerValue > 21) {
      return console.log('Has perdido');
    }
    if(dealerValue > 21) {
     return console.log('Has ganado');
    }
    if(dealerValue < playerValue){
      return console.log('Win');
    }
    if(playerValue < dealerValue){
      return console.log('Lose');
    }
    return console.log('Draw');
  };

  const pedirCarta = (mazo, hand, value) => {
    if (value <= 21){
      return [...hand, mazo.pop()]
    }
    return hand;
  };

  const handlePedirCarta = () => {
    playerHand = pedirCarta(mazo, playerHand, playerValue); 
    playerValue = _getValue(playerHand);
    _renderPlayerCard();
    if(playerValue > 21){document.querySelector('#pedir-carta').disabled = true; alert('Perdiste');}
    
    
    console.log("Jugador pidió carta:", playerHand);
    console.log("Puntos del jugador:", playerValue);
  };

  const handlePlantarse = () => {
    document.querySelector('#pedir-carta').disabled = true;
    // _renderDealerHand();
    _dealerTurn();
    _getResult(playerValue, dealerValue);
    // _renderResult();
  }

  const _dealerTurn = () =>{
    //  _renderDealerCard();
    if(dealerValue > 16) return;
      dealerHand = pedirCarta(mazo, dealerHand, dealerValue); 
      dealerValue = _getValue(dealerHand);
      console.log("Dealer pidió carta:", dealerHand);
      console.log("Puntos del dealer:", dealerValue);
      _dealerTurn();
  };

  // const _isPlayerTurn = () =>{}


let playerHand = [];
let playerValue = 0; 
let dealerHand = [];
let dealerValue = 0;  
let mazo = [];

  const _renderPlayerHand = () => {
    playerHand.forEach((card, index) => {
      
      document.querySelector('#player').innerHTML += 
      `<div class="carta">
        <div class="card-body">
          <p class="card-text">${card.cuerpo}${card.palo}</p>
        </div>
      </div>`;
      if(card.palo === '♦' || card.palo === '♥'){
        document.querySelector('.carta').style.color = 'red';
      }
      if(card.palo === '♠' || card.palo === '♣'){
        document.querySelector('.carta').style.color = 'black';
      }
    });

  }

  const _renderPlayerCard = () => {
    const playerCard = playerHand[playerHand.length - 1];
    
    document.querySelector('#player').innerHTML += 
    `<div class="carta">
      <div class="card-body">
        <p class="card-text">${playerCard.cuerpo}${playerCard.palo}</p>
      </div>
    </div>`;
    if(playerCard.palo === '♦' || playerCard.palo === '♥'){
      document.querySelector('.carta').style.color = 'red';
    }
    if(playerCard.palo === '♠' || playerCard.palo === '♣'){
      document.querySelector('.carta').style.color = 'black';
    }
  }

  // const _renderDealerCard = () => {
  //   dealerHand.forEach((card, index) => {
  //     if(card.palo === '♦' || card.palo === '♥'){
  //       document.querySelector('.carta').style.color = 'red';
  //     }
  //     document.querySelector('#dealer').innerHTML += 
  //     `<div class="carta">
  //       <div class="card-body">
  //         <p class="card-text">${card.cuerpo}${card.palo}</p>
  //       </div>
  //     </div>`;
  //   });
  // }

const playGame = () => {
   mazo = crearMazo();
   console.log('Mazo inicial: ', mazo);
   _barajarMazo(mazo);
   console.log('Mazo barajado: ', _barajarMazo(mazo));
   playerHand = _getInitialHand(mazo);
   dealerHand = _getInitialHand(mazo);
   _renderPlayerHand();
   playerValue = _getValue(playerHand);
   dealerValue = _getValue(dealerHand);
   console.log('Mano del jugador: ', playerHand);
   console.log('Mano del dealer: ', dealerHand);
   console.log(_getResult(playerValue, dealerValue));
   console.log("Puntos del jugador:", playerValue);
   console.log("Puntos del dealer:", dealerValue);
   
    
    //_renderDealerCard();
  //  _nuevaPartida()
  }

  window.handlePedirCarta = handlePedirCarta;
  window.handlePlantarse = handlePlantarse;
  window.playGame = playGame;
};
