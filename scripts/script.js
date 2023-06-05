import { Graficos } from "./graficos.js";
import { carregarArquivosDiretorio, divideArrayEmSubarray, resetarScrollDaPagina } from "./utils.js";

// ---------------------------------------------------------------------------------------------------------------------------------

window.addEventListener('DOMContentLoaded', function() {
    var currentURL = window.location.pathname;
    
    criarNavbar();
    criarFooter();

    if (currentURL.includes('/index.html') || currentURL == '/') {
        
        carregarConteudoIndex();

    } else if (currentURL.includes('/fome.html')) {
        
        
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
    navbarList.className = 'transition-colors font-medium flex flex-col p-4 md:p-0 mt-4 border border-slate-100 rounded-lg bg-slate-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-slate-100 dark:bg-slate-800 md:dark:bg-slate-900 dark:border-slate-700';

    menuItems.forEach(function(item) {
        var li = document.createElement('li');
        var a = document.createElement('a');

        a.href = item.href;
        a.textContent = item.text;
        a.className = 'block py-2 pl-3 pr-4 rounded md:p-0 ';

        if (item.href == window.location.pathname || (item.href == '/index.html' && window.location.pathname == '/')) {
            a.setAttribute('aria-current', 'page');
            a.className += 'text-white bg-lime-700 md:bg-transparent md:text-lime-700 dark:text-white md:dark:text-lime-500';
        } else {
            a.className += 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-lime-700 dark:text-white md:dark:hover:text-lime-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent';
        }

        li.appendChild(a);
        navbarList.appendChild(li);
    });
}

/**
 * Carrega o conteúdo dinamico do rodapé do layout padrão
 */
function criarFooter() {
    
    var socialItems = [];
    var footerItems = [ 
        {
            title: 'Sobre a fome',
            items: [
                { text: 'Fome', href: '/fome.html' },
                { text: 'Insegurança alimentar', href: '/insegurancaAlimentar.html' },
                { text: 'Agricultura sustentável', href: '/agriculturaSustentavel.html' },
                { text: 'Galeria', href: '/galeria.html' }
            ]
        },
        {
            title: 'Inovação Tecnológica',
            items: [
                { text: 'Flowbite', href: 'https://flowbite.com/', external: true },
                { text: 'Tailwind CSS', href: 'https://tailwindcss.com/', external: true }
            ]
        }, {
            title: 'Recursos',
            items: [
                { text: 'Flowbite', href: 'https://flowbite.com/', external: true },
                { text: 'Tailwind CSS', href: 'https://tailwindcss.com/', external: true }
            ]
        }, 
    ];

    var socialsElement = document.getElementById('socials');
    var footerLinksElement = document.getElementById('footer-links');

    socialItems.reverse().forEach(function(item) {
        var a = document.createElement('a');
        a.href = item.href;
        a.className = 'text-gray-500 hover:text-gray-900 dark:hover:text-white';
        a.innerHTML = `<i class="${item.icon} h-5 w-5 my-auto block"></i><span class="sr-only">${item.text} page</span>`;
        socialsElement.insertBefore(a, socialsElement.firstChild);
    });

    footerItems.forEach(function(item) {
        var div = document.createElement('div');
        var h2 = document.createElement('h2');
        var ul = document.createElement('ul');
        
        
        h2.className = 'mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white';
        h2.textContent = item.title;
        ul.className = 'text-gray-600 dark:text-gray-400 font-medium';

        item.items.forEach(function(subitem) {
            var li = document.createElement('li');
            var a = document.createElement('a');

            li.className = 'mb-4 flex flex-row align-items-center gap-2 cursor-pointer hover:text-gray-900 dark:hover:text-white';
            a.href = subitem.href;
            a.className = '';
            a.textContent = subitem.text;

            li.appendChild(a);

            if (subitem.external) {
                a.target = '_blank';
                a.rel = 'noopener';

                var icon = document.createElement('i');
                icon.className = 'fas fa-external-link-alt text-xs mt-1';

                li.appendChild(icon);
            }

            ul.appendChild(li);
        });
        
        div.appendChild(h2);
        div.appendChild(ul);
        footerLinksElement.appendChild(div);
    });
}

/**
 * Carrega o conteúdo dinâmico da página /index.html
 */
function carregarConteudoIndex() {
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
        new Chart(document.getElementById("populacao-inseguranca-alimentar-brasil-chart").getContext("2d"), 
            Graficos.getGraficoPopulacaoInsegurancaAlimentarBrasilConfig());
    } catch {
        console.error("Erro ao carregar gráfico de apresentação da insegurança alimentar no Brasil");
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
    const LIMITE_REQUISICOES_MAIS_FOTOS = 3;
    
    new Promise(async function(resolve, reject) { 

        
        await carregarArquivosDiretorio("/img/galeria/", ["jpg", "jpeg", "png"])
            .then((fotos) => {
                
                //separa as fotos em grupos de 4, onde (3) é o número de vezes que será possível 
                var fotosGrid = divideArrayEmSubarray(fotos, LIMITE_REQUISICOES_MAIS_FOTOS + 1);

                // divide cada subgrupo em 4 colunas
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