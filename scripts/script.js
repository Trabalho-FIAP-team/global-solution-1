import { Graficos } from "./graficos.js";
import { carregarArquivosDiretorio, divideArrayEmSubarray, resetarScrollDaPagina } from "./utils.js";

// ---------------------------------------------------------------------------------------------------------------------------------

window.addEventListener('DOMContentLoaded', function() {
    var currentURL = window.location.pathname;
    
    criarNavbar();

    if (currentURL.includes('/index.html') || currentURL == '/') {
        
        carregarConteudoIndex();

    } else if (currentURL.includes('/insegurancaAlimentar.html')) {
        
        carregarConteudoInsegurancaAlimentar();

    } else if (currentURL.includes('/agriculturaSustentavel.html')) {
        carregarConteudoAgriculturaSustentavel();

    } else if (currentURL.includes('/galeria.html')) { 
        carregarConteudoGaleria();
    }
});

// ---------------------------------------------------------------------------------------------------------------------------------

/**
 * Carrega o conteúdo dinamico da navbar do layout padrão
 */
function criarNavbar() {
    var navbar = document.getElementById('navbar-default');

    var menuItems = [
        { text: 'Home', href: '/index.html' },
        { text: 'Fome', href: '/fome.html' },
        { text: 'Insegurança alimentar', href: '/insegurancaAlimentar.html' },
        { text: 'Agricultura sustentável', href: '/agriculturaSustentavel.html' },
        { text: 'Galeria', href: '/galeria.html' }
    ];

    var navbar = document.getElementById('navbar-default');
    var navbarList = navbar.appendChild(document.createElement('ul'));
    navbarList.className = 'transition-colors font-bold flex flex-col p-4 md:p-0 mt-4 border border-slate-100 rounded-lg bg-slate-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-slate-100 dark:bg-slate-800 md:dark:bg-slate-900 dark:border-slate-700';

    menuItems.forEach(function(item) {
        var li = document.createElement('li');
        var a = document.createElement('a');

        a.href = item.href;
        a.textContent = item.text;
        a.className = 'block py-2 pl-3 pr-4 rounded md:p-0 ';

        if (item.href == window.location.pathname || (item.href == '/index.html' && window.location.pathname == '/')) {
            a.setAttribute('aria-current', 'page');
            a.className += 'text-white bg-lime-500 md:bg-transparent md:text-lime-500 dark:text-white md:dark:text-lime-400';
        } else {
            a.className += 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-lime-400 dark:text-white md:dark:hover:text-lime-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent';
        }

        li.appendChild(a);
        navbarList.appendChild(li);
    });
}

/**
 * Carrega o conteúdo dinâmico da página /index.html
 */
function carregarConteudoIndex() {

    resetarScrollDaPagina();

    const buttonExplorarMais = document.getElementById("button-explorar-mais");

    if (buttonExplorarMais) {
        
        buttonExplorarMais.addEventListener("click", function() {
            var screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            window.scrollTo({
                top: screenHeight,
                behavior: 'smooth'
            });

            enableScroll();
            
        });
    }

    function enableScroll() {
        document.body.classList.remove('overflow-y-hidden');
        window.removeEventListener("wheel", handleScroll);
        buttonExplorarMais.classList.remove("opacity-100");
        buttonExplorarMais.classList.add("opacity-0");
    }

    let scrollTries = 0;

    function handleScroll() {
        console.log(scrollTries);
        if (scrollTries++ > 5) {
            enableScroll();
        }
    }
    
    window.addEventListener("wheel", handleScroll);

    try {
        new Chart(document.getElementById("populacao-inseguranca-alimentar-chart").getContext("2d"), 
            Graficos.getGraficoPopulacaoInsegurancaAlimentarConfig());
    } catch {
        console.error("Erro ao carregar gráfico de apresentação da insegurança alimentar");
    }
}

/**
 * Carrega o conteúdo dinâmico da página /insegurancaAlimentar.html
 */
function carregarConteudoInsegurancaAlimentar() {
    try {
        new Chart(document.getElementById("populacao-inseguranca-alimentar-no-brasil-chart").getContext("2d"), 
            Graficos.getGraficoPopulacaoInsegurancaAlimentarBrasilConfig());
    } catch {
        console.error("Erro ao carregar gráfico de apresentação da insegurança alimentar no Brasil");
    }

    try {
        new Chart(document.getElementById("crescimento-inseguranca-alimentar-chart").getContext("2d"), 
            Graficos.getGraficoCrescimentoLinearInsegurancaAlimentar());
    } catch (e){
        console.error(e);
        console.error("Erro ao carregar gráfico de apresentação de crescimento da insegurança alimentar no Mundo");
    }
}

/**
 * Carrega o conteúdo dinâmico da página /galeria.html
 */
async function carregarConteudoGaleria() {

    resetarScrollDaPagina();

    const galeriaGridElement = document.getElementById('galeria-grid');

    if (!galeriaGridElement) {
        console.error('Erro ao carregar fotos da galeria');
        return;
    }

    const galeriaGridElementWrapper = galeriaGridElement.parentNode;
    const loadingDiv = document.createElement('div');
    const loadingIcon = document.createElement('i');
    const loadingMsg = document.createElement('span');

    loadingDiv.className = 'flex justify-center items-center h-screen pb-48 w-full';
    loadingIcon.className = 'fas fa-spinner fa-spin text-4xl text-gray-500';
    loadingMsg.className = 'mt-4 text-gray-800 dark:text-gray-500 text-xl';

    loadingDiv.appendChild(loadingIcon);
    galeriaGridElement.appendChild(loadingDiv);

    const QUANTIDADE_COLUNAS = 4;
    const LIMITE_REQUISICOES_MAIS_FOTOS = 2;
    
    new Promise(async function(resolve, reject) { 

        
        await carregarArquivosDiretorio("/img/galeria/", ["jpg", "jpeg", "png"])
            .then((fotos) => {
                
                //separa as fotos em grupos de LIMITE_REQUISICOES_MAIS_FOTOS, que é o número de vezes que será possível ver mais
                var fotosGrid = divideArrayEmSubarray(fotos, LIMITE_REQUISICOES_MAIS_FOTOS + 1);

                // divide cada subgrupo em QUANTIDADE_COLUNAS colunas
                fotosGrid = fotosGrid.map(fotos => divideArrayEmSubarray(fotos, QUANTIDADE_COLUNAS));

                if (!fotosGrid) {
                    reject("Erro ao carregar fotos da galeria");
                }

                resolve(fotosGrid);
            });
        }).then((fotos) => {

            var colunas = [];

            fotos[0].forEach((fotosCol) => {

                const subGridElement = document.createElement('div');
                subGridElement.className = 'column slide-in-animation';

                carregarFotosColuna(fotosCol, subGridElement);

                colunas.push(subGridElement);
            });

            galeriaGridElement.removeChild(loadingDiv);
            colunas.forEach ((column) => galeriaGridElement.appendChild(column));

            carregarBotaoVerMais(fotos.slice(1));
            inicializarModalGaleria();
        })
        .catch((error) => {
            console.error(error);
            galeriaGridElement.removeChild(loadingDiv);
        });
    
    function carregarFotosColuna(fotosCol, coluna) {

        const body = document.documentElement;
        const modal = document.querySelector('.image-modal-popup');
        const modalSubElements = element => document.querySelector(`.image-modal-popup ${element}`);

        fotosCol.forEach((foto) => {

            const imgContainer = document.createElement('div');
            const img = document.createElement('img');

            imgContainer.className = 'overflow-hidden rounded-lg cursor-pointer h-min';
            img.className = 'h-auto max-w-full transition duration-300 ease-in-out hover:scale-110';

            img.src = foto;
            img.alt = foto.split('/').pop().split('.').slice(0, -1).join('.').replaceAll("-", " ");
            img.alt = img.alt.charAt(0).toUpperCase() + img.alt.slice(1).toLowerCase();

            imgContainer.appendChild(img);
            coluna.appendChild(imgContainer);

            img.addEventListener('click', function (e) {
                e.stopPropagation();
                
                body.style.overflow = 'hidden';
                modal.style.display = 'block';
                
                modalSubElements('img').alt = img.alt;
                modalSubElements('img').src = img.src;
            });

        });

        return coluna;
    }

    function carregarBotaoVerMais(fotos) {

        const verMaisButtonElement = document.querySelector("#view-more");
        const galeriaGridElement = document.getElementById('galeria-grid');

        setTimeout(() => verMaisButtonElement.classList.remove('hidden'), 500);

        var paginaAtual = 0;

        verMaisButtonElement.addEventListener('click', (e) => {

            var colunas = galeriaGridElement.querySelectorAll('.column');

            //carrega as fotos da próxima página em cada coluna
            fotos[paginaAtual++]?.forEach((fotosCol, indexColuna) => {
                var colunaAtual = colunas[(indexColuna + 1) % colunas.length];
                carregarFotosColuna(fotosCol, colunaAtual);
            });

            //se a página atual for a ultima, é escondido o botão de ver mais
            if (paginaAtual == fotos.length) {
                verMaisButtonElement.classList.add('hidden');
                galeriaGridElement.classList.remove('ending-blur');
                galeriaGridElement.style.maxHeight = null;
                galeriaGridElement.style.paddingBottom = galeriaGridElement.style.paddingTop;
            }
        });
    }
    

    function inicializarModalGaleria() {

        const body = document.documentElement;
        const modal = document.querySelector('.image-modal-popup');
        const galeriaGrid = document.getElementById('galeria-grid');

        if (!modal || !galeriaGrid) return;

        const modalSubElements = element => document.querySelector(`.image-modal-popup ${element}`);

        // Adiciona evento de click no botão de fechar modal
        modalSubElements('#close')?.addEventListener('click', (e) => {
            body.style.overflow = 'auto';
            modal.style.display = 'none';
        });

        // Adiciona listener de fechar modal
        document.addEventListener('click', function(e) {
            body.style.overflow = 'auto';
            modal.style.display = 'none';
        });

         // Adiciona evento de click no botão de ir pra próxima imagem do modal 
        modalSubElements('#next')?.addEventListener('click', function(e) {
            e.stopPropagation();
            const imagemAtualModal = galeriaGrid.querySelector(`img[src$="${modalSubElements('img').src.split('/').pop()}"`);
            var proximaImagem = (imagemAtualModal.parentNode.nextSibling ?? (imagemAtualModal.parentNode.parentNode.nextSibling?.firstElementChild ?? galeriaGrid.firstElementChild.firstElementChild)).querySelector('img');
            proximaImagem.click();
        });

        // Adiciona evento de click no botão de voltar para imagem anterior do modal 
        modalSubElements('#prev')?.addEventListener('click', function(e) {
            e.stopPropagation();
            const imagemAtualModal = galeriaGrid.querySelector(`img[src$="${modalSubElements('img').src.split('/').pop()}"`);
            var imagemAnterior = (imagemAtualModal.parentNode.previousSibling ?? (imagemAtualModal.parentNode.parentNode.previousSibling?.lastElementChild ?? galeriaGrid.lastElementChild.lastElementChild)).querySelector('img');
            imagemAnterior.click();
        });
    }
}

/**
 * Carrega o conteúdo dinâmico da página /agriculturaSustentavel.html
 */
function carregarConteudoAgriculturaSustentavel() {
    
    const carouselDiv = document.getElementById('carousel');
    const carouselImagesDiv = carouselDiv.querySelector('div');

    carregarArquivosDiretorio("/img/tecnicas-sustentaveis/", ["jpg", "jpeg", "png"])
        .then(function (fotos) {

            fotos.forEach(function (foto) {
                    
                const carouselItem = document.createElement('div');
                carouselItem.className = 'hidden duration-1000 ease-linear';
                carouselItem.setAttribute('data-carousel-item', true);

                const img = document.createElement('img');
                img.className = 'absolute block w-full rounded-lg -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2';
                img.src = foto;
                img.alt = foto.split('/').pop().split('.').slice(0, -1).join('.').replaceAll("-", " ");
                img.alt = img.alt.charAt(0).toUpperCase() + img.alt.slice(1).toLowerCase();

                carouselItem.appendChild(img);
                carouselImagesDiv.appendChild(carouselItem);
            });

        }).catch((error) => {
            console.log(error);
            carouselDiv.remove();
        });
}