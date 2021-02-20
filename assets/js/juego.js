(() => {
    'use strict'
    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'],
          especiales = ['A', 'J', 'Q', 'K'];
    
    let puntosJugadores = [];
    
    //Referencias
    const btnPedir = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener'),
          btnNuevo = document.querySelector('#btnNuevo');
    
    const cartasJugador = document.querySelector('#jugador-cartas'),
          cartasComputadora = document.querySelector('#computadora-cartas'),
          puntaje = document.querySelectorAll('small');

    //Inicializar el Juego
    const inicializarJuego = (numJugadores = 2) => {
        deck = crearDecks();
        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);            
        }
        console.log({puntosJugadores});
    }

    //Crear la Baraja de cartas
    const crearDecks = () => {
        deck = [];
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
        return _.shuffle(deck);
    }
    
    //extraer la carta de la Baraja
    const obtenerCarta = () => {
        if (deck.length === 0) {
            throw 'No hay mas Cartas';
        }
        return deck.pop();
    }

    //Valor de la carta 
    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1);
        return (isNaN(valor)) ?
            (valor === 'A') ? 11 : 10
            : valor * 1;
    }
    
    //Determinar Ganador
    const determinarGanador = () => {
        setTimeout(() => {
            if( puntosComputadora === puntosJugador ) {
                alert('Nadie gana :(');
            } else if ( puntosJugador > 21 ) {
                alert('Computadora gana')
            } else if( puntosComputadora > 21 ) {
                alert('Jugador Gana');
            } else {
                alert('Computadora Gana')
            }
        }, 100 );
    
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
        determinarGanador();
    }
    
    //Eventos
    btnNuevo.addEventListener('click',()=>{
        //deck = [];
        //deck = crearDecks();

        inicializarJuego();

        puntosJugador = 0;
        puntosComputadora = 0;

        puntaje[0].innerText = 0;
        puntaje[1].innerText = 0;

        cartasComputadora.innerHTML = '';
        cartasJugador.innerHTML = '';

        btnPedir.disabled = false;
        btnDetener.disabled = false;
    });

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
})();
