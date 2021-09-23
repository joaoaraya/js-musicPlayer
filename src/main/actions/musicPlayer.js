// --- Importar banco de dados (temporário) das listas de músicas ---
// Local = no mesmo que este js está
import {musicas} from './dbMusicas.js';

// --- Declarações de valores ---
const musica = document.querySelector('audio');
const musicaAutor = document.querySelector('.descricao h1');
const musicaTitulo = document.querySelector('.descricao h2');
const musicaCapa = document.querySelector('#capa');
const barra = document.querySelector('progress');
const tempoAtual = document.querySelector('.atual');
const tempoTotal = document.querySelector('.total');
const btnPlay = document.querySelector('#btnPlay');
const btnPausa = document.querySelector('#btnPausa');
const btnVoltar = document.querySelector('#btnVoltar');
const btnProximo = document.querySelector('#btnProximo');
const files = './src/uploads/';

let musicaIndex = 0;

// --- Funções ---
const tocarMusica = () => {
    musica.play();
    btnPausa.style.display = 'block';
    btnPlay.style.display = 'none';
};

const pausarMusica = () => {
    musica.pause();
    btnPlay.style.display = 'block';
    btnPausa.style.display = 'none';
};

const pularMusica = () => {
    musicaIndex++;
    if (musicaIndex > musicas.length - 1) {
        musicaIndex = 0;
    }
    renderizarMusica(musicaIndex);
};

const voltarMusica = () => {
    musicaIndex--;
    if (musicaIndex < 0) {
        musicaIndex = musicas.length - 1;
    }
    renderizarMusica(musicaIndex);
};

// Mudar a barra e o ponto com a porcentagem do progresso da música
const atualizarBarra = () => {
    barra.style.width =  Math.floor(Number(musica.currentTime) / Number(musica.duration) * 100) + '%';
    tempoAtual.textContent = tempo(Math.floor(Number(musica.currentTime)));
};

// Converter os segundos em minutos com formatação '0:00'
const tempo = (segundos) => {
    let min = Math.floor(segundos / 60);
    let seg = segundos % 60;
    if (seg < 10) {
        seg = '0' + seg
    }
    return min + ':' + seg;
};

// Enviar para o DOM os dados das músicas
const renderizarMusica = (i) => {
    musica.setAttribute('src', files + 'audio/' + musicas[i].audio);
    musica.addEventListener('loadeddata', () => {
        musicaTitulo.textContent = musicas[i].titulo;
        musicaAutor.textContent = musicas[i].autor;
        musicaCapa.src = files + 'img/' + musicas[i].img;
        tempoTotal.textContent = tempo(Math.floor(Number(musica.duration)));
        if (i > 0) {
            tocarMusica();
        }
    });
};

// --- Função inicial ---
renderizarMusica(musicaIndex);

// --- Eventos ---
btnPlay.addEventListener('click', tocarMusica);
btnPausa.addEventListener('click', pausarMusica);
btnProximo.addEventListener('click', pularMusica);
btnVoltar.addEventListener('click', voltarMusica);
musica.addEventListener('timeupdate', atualizarBarra);