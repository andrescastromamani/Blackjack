
let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

//
let puntosJugador = 0,
    puntosComputadora = 0;

//Referencias
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const cartasJugador = document.querySelector('#jugador-cartas');
const cartasComputadora = document.querySelector('#computadora-cartas');
const puntaje = document.querySelectorAll('small');

//Crear la Baraja de cartas
const crearDecks = () => {
    for (let i = 2; i <= 10; i++) {
        for (let tipo of tipos) {
            deck.push(i + tipo);
        }
    }
    for (let tipo of tipos) {
        for (let esp of especiales) {
            deck.push(esp + tipo);
        }
    }
    deck = _.shuffle(deck);
    return deck;
}
crearDecks();

//extraer la carta de la Baraja
const obtenerCarta = () => {
    if (deck.length === 0) {
        throw 'No hay mas Cartas';
    }
    const carta = deck.pop();
    console.log(deck);
    console.log(carta);
    return carta;
}
obtenerCarta();

//Valor de la carta 
const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    return (isNaN(valor)) ?
        (valor === 'A') ? 11 : 10
        : valor * 1;
}

//Turno de Compuradora
const turnoComputadora = (puntosMinimos) => {
    do {
        const carta = obtenerCarta();
        puntosComputadora = puntosComputadora + valorCarta(carta);
        puntaje[1].innerText = puntosComputadora;

        const imgCarta = document.createElement('img');
        imgCarta.classList.add('cartas');
        imgCarta.src = `assets/cartas/${carta}.png`;
        cartasComputadora.append(imgCarta);
        if (puntosMinimos > 21) {
            break;
        }
    } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));
}
//Eventos
btnPedir.addEventListener('click', () => {
    const carta = obtenerCarta();
    puntosJugador = puntosJugador + valorCarta(carta);
    puntaje[0].innerText = puntosJugador;

    const imgCarta = document.createElement('img');
    imgCarta.classList.add('cartas');
    imgCarta.src = `assets/cartas/${carta}.png`;
    cartasJugador.append(imgCarta);

    if (puntosJugador > 21) {
        console.warn('Perdiste!!');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    } else if (puntosJugador === 21) {
        console.warn('21, Genial');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    }
});

btnDetener.addEventListener('click',()=>{
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
});