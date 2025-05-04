import "bootstrap";
import "./style.css";

window.onload = function() {
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
  let playerHand = [];
  let playerValue = 0; 
  let dealerHand = [];
  let dealerValue = 0;  
  let mazo = [];

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

  const _renderPlayerHand = () => {
    playerHand.forEach((card, index) => {
      document.querySelector('#player').innerHTML += 
      `<div class="carta ${card.palo}">
        <div class="card-body">
          <p class="card-text">${card.cuerpo}${card.palo}</p>
        </div>
      </div>`;
    });
  }

  const _renderFirstDealerCard = () => {
    const dealerCard = dealerHand[0];
    document.querySelector('#dealer').innerHTML += 
    `<div class="carta ${dealerCard.palo}">
      <div class="card-body">
        <p class="card-text">${dealerCard.cuerpo}${dealerCard.palo}</p>
      </div>
    </div>`;
  }

  const _renderDealerCard = () => {
    const dealerCard = dealerHand[dealerHand.length - 1];
    document.querySelector('#dealer').innerHTML += 
    `<div class="carta ${dealerCard.palo}">
      <div class="card-body">
        <p class="card-text">${dealerCard.cuerpo}${dealerCard.palo}</p>
      </div>
    </div>`;
  }

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
    if(playerValue > 21){
      document.querySelector('#pedir-carta').disabled = true; 
      const resultado = _getResult(playerValue, dealerValue);
      _renderResult(resultado);
    }
    console.log("Jugador pidió carta:", playerHand);
    console.log("Puntos del jugador:", playerValue);
  };

  const _renderPlayerCard = () => {
    const playerCard = playerHand[playerHand.length - 1];
    document.querySelector('#player').innerHTML += 
    `<div class="carta ${playerCard.palo}">
      <div class="card-body">
        <p class="card-text">${playerCard.cuerpo}${playerCard.palo}</p>
      </div>
    </div>`;
  }

  const handlePlantarse = () => {
    _renderDealerCard()
    document.querySelector('#pedir-carta').disabled = true;
    _dealerTurn();
    _getResult(playerValue, dealerValue);
    const resultado = _getResult(playerValue, dealerValue);
    _renderResult(resultado);
  }

  const _dealerTurn = () =>{
    if(dealerValue > 16) {
      return
    };
    dealerHand = pedirCarta(mazo, dealerHand, dealerValue); 
    _renderDealerCard();
    dealerValue = _getValue(dealerHand);
    console.log("Dealer pidió carta:", dealerHand);
    console.log("Puntos del dealer:", dealerValue);
    _dealerTurn();
  };

  const _getValue = (hand) => hand.reduce((acc, carta) => {
    acc = acc + carta.valor;
    return acc;
  }, 0);

  const _getResult = (playerValue, dealerValue) => {
    if(playerValue > 21) {
      return 'Has perdido! Te has pasado de 21!';
    }
    if(dealerValue > 21) {
     return 'Has ganado! El dealer se ha pasado de 21!';
    }
    if(dealerValue < playerValue){
      return 'Ganaste!';
    }
    if(playerValue < dealerValue){
      return 'Perdiste!';
    }
    return 'Empate!';
  };

  const _renderResult = (result) => {
    document.getElementById("resultText").innerText   = result;
    document.getElementById("playerScore").innerText  = playerValue;
    document.getElementById("dealerScore").innerText  = dealerValue;

    // Mostrar el modal
    const modalEl = document.getElementById("resultModal");
    new bootstrap.Modal(modalEl).show();
  }

  const playGame = () => {
   mazo = crearMazo();
   console.log('Mazo inicial: ', mazo);
   _barajarMazo(mazo);
   console.log('Mazo barajado: ', _barajarMazo(mazo));
   playerHand = _getInitialHand(mazo);
   dealerHand = _getInitialHand(mazo);
   _renderPlayerHand();
   _renderFirstDealerCard();
   playerValue = _getValue(playerHand);
   dealerValue = _getValue(dealerHand);
   console.log('Mano del jugador: ', playerHand);
   console.log('Mano del dealer: ', dealerHand);
   console.log(_getResult(playerValue, dealerValue));
   console.log("Puntos del jugador:", playerValue);
   console.log("Puntos del dealer:", dealerValue);
  }

  window.handlePedirCarta = handlePedirCarta;
  window.handlePlantarse = handlePlantarse;
  window.playGame = playGame;
}