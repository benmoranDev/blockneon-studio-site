document.addEventListener('DOMContentLoaded', function () {
    // atualiza o ano no rodapé
    var anoEl = document.getElementById('ano');
    if (anoEl) {
        anoEl.textContent = new Date().getFullYear();
    }

    // gera blocos caindo no hero, imitando peças de tetromino
    criarBlocosCaindo();

    // gera o campo de pixels/blocos soltos no fundo da página inteira
    criarCampoDePixels();
    window.addEventListener('resize', debounce(criarCampoDePixels, 400));
});

function criarBlocosCaindo() {
    var colors = ['#00f5ff', '#ff2e9a', '#8b5cf6', '#baff29'];
    var container = document.getElementById('blocksContainer');
    if (!container) return;

    var count = window.innerWidth < 768 ? 8 : 16;

    for (var i = 0; i < count; i++) {
        var b = document.createElement('div');
        b.className = 'falling-block';

        var size = 14 + Math.random() * 22;
        var color = colors[Math.floor(Math.random() * colors.length)];

        b.style.width = size + 'px';
        b.style.height = size + 'px';
        b.style.left = (Math.random() * 100) + 'vw';
        b.style.background = color;
        b.style.color = color;
        b.style.animationDuration = (9 + Math.random() * 10) + 's';
        b.style.animationDelay = (Math.random() * -18) + 's';

        container.appendChild(b);
    }
}

// paleta extraída das telas do jogo: ciano, magenta, roxo, oliva, tijolo, mostarda, vermelho, índigo
var PIXEL_PALETTE = ['#00f5ff', '#ff2e9a', '#8b5cf6', '#baff29', '#c2622f', '#d3c13c', '#d64545', '#4a5fcc'];

function criarCampoDePixels() {
    var field = document.getElementById('pixelField');
    if (!field) return;

    field.innerHTML = '';
    field.style.height = document.body.scrollHeight + 'px';

    var alturaTotal = document.body.scrollHeight;
    var quantidade = Math.max(18, Math.round(alturaTotal / 260));

    for (var i = 0; i < quantidade; i++) {
        var color = PIXEL_PALETTE[Math.floor(Math.random() * PIXEL_PALETTE.length)];
        var top = Math.random() * alturaTotal;
        var left = Math.random() * 100;

        // ~40% viram pequenos clusters tipo tetromino, o resto são pixels soltos
        if (Math.random() < 0.4) {
            var el = document.createElement('div');
            var size = 8 + Math.random() * 4;
            var gap = size + 2;
            el.className = 'pixel-cluster';
            el.style.width = size + 'px';
            el.style.height = size + 'px';
            el.style.top = top + 'px';
            el.style.left = left + 'vw';
            el.style.color = color;
            el.style.setProperty('--c2x', gap + 'px');
            el.style.setProperty('--c2y', gap + 'px');
            field.appendChild(el);
        } else {
            var dot = document.createElement('div');
            var dSize = 5 + Math.random() * 9;
            var filled = Math.random() < 0.5;
            dot.className = 'pixel-dot' + (filled ? ' filled' : '');
            dot.style.width = dSize + 'px';
            dot.style.height = dSize + 'px';
            dot.style.top = top + 'px';
            dot.style.left = left + 'vw';
            dot.style.color = color;
            dot.style.animation = 'pixelPulse ' + (4 + Math.random() * 5) + 's ease-in-out infinite';
            dot.style.animationDelay = (Math.random() * -6) + 's';
            field.appendChild(dot);
        }
    }
}

function debounce(fn, wait) {
    var t;
    return function () {
        clearTimeout(t);
        t = setTimeout(fn, wait);
    };
}