const musica = document.querySelector('audio');
const btnPlay = document.querySelector('#btnPlay');
const btnPausa = document.querySelector('#btnPausa');
const barra = document.querySelector('progress');
const tempoAtual = document.querySelector('.atual');

// Funções
const tocarMusica = () => {
    musica.play();
    btnPausa.style.display = 'block';
    btnPlay.style.display = 'none';
}

const pausarMusica = () => {
    musica.pause();
    btnPlay.style.display = 'block';
    btnPausa.style.display = 'none';
}

const atualizarBarra = () => {
    barra.style.width =  Math.floor(Number(musica.currentTime) / Number(musica.duration) * 100) + '%';
    tempoAtual.textContent = tempo(Math.floor(Number(musica.currentTime)));
    
}

const tempo = (segundos) => {
    let min = Math.floor(segundos / 60);
    let seg = segundos % 60;
    if (seg < 10) {
        seg = '0' + seg
    }
    return min + ':' + seg;
}

// Eventos
btnPlay.addEventListener('click', tocarMusica);
btnPausa.addEventListener('click', pausarMusica);
musica.addEventListener('timeupdate', atualizarBarra);
