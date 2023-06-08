
tailwind.config = {
    darkMode: 'class',
}

const keys = {
    themeStorageKey: 'gs-solution-fiap-theme',
    darkTheme: 'dark',
    lightTheme: 'light',
    chartJs: {
        darkColor: 'rgba(255, 255, 255, .87)',
        lightColor: 'rgba(102, 102, 102, 1)',
    }
}


inicializarTema();

window.addEventListener('DOMContentLoaded', () => {

    // Adiciona evento de clique no botão de trocar o tema
    document.getElementById('theme-toggle')?.addEventListener('click', () => alternarTema());

    inicializarChartJS();
});

async function inicializarChartJS() {
    try {
        Chart.defaults.font.family = window.getComputedStyle(document.querySelector('body')).getPropertyValue('font-family');
        Chart.register(ChartDataLabels);
    } catch {
        console.error("Erro ao configurar ChartJS");
    }
}

function inicializarTema() {

    // Checa se a preferência do usuário é tema escuro e ativa o mesmo
    if (localStorage.getItem(keys.themeStorageKey) === keys.lightTheme) {
        localStorage.setItem(keys.themeStorageKey, keys.lightTheme);
    } else { // Caso contrário, ativa o tema claro
        localStorage.setItem(keys.themeStorageKey, keys.darkTheme);
    }

    carregarTema();
    
    if(window.location.pathname.includes('/index.html') || window.location.pathname === '/') {
        inicializarVideo();
    }
}

function inicializarVideo() {
    var iframe = document.getElementById('video-pitch');
    
    if (localStorage.getItem(keys.themeStorageKey) === keys.lightTheme) {
        iframe.src = 'https://www.youtube.com/embed/ydmChookrbQ'
    } else {
        iframe.src = 'https://www.youtube.com/embed/f78D4tEC608'
    }
}

function alternarTema() {

    if (localStorage.getItem(keys.themeStorageKey) === keys.darkTheme) {
        localStorage.setItem(keys.themeStorageKey, keys.lightTheme);
    } else {
        localStorage.setItem(keys.themeStorageKey, keys.darkTheme);
    }

    if(window.location.pathname.includes('/index.html') || window.location.pathname === '/') {
    
        trocarVideo();

        setTimeout(() => {
            carregarTema();
        }, 440);
    } else {
        carregarTema();
    }
}

function trocarVideo() {
    var iframe = document.getElementById('video-pitch');

    if (localStorage.getItem(keys.themeStorageKey) === keys.lightTheme) {
        iframe.src = 'https://www.youtube.com/embed/ydmChookrbQ'
    } else {
        iframe.src = 'https://www.youtube.com/embed/f78D4tEC608'
    }
}

function carregarTema() {
    
    var themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
    var themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

    // Se o tema atual é o claro, seta o escuro
    if (localStorage.getItem(keys.themeStorageKey) === keys.darkTheme) {
        
        document.documentElement.classList.add(keys.darkTheme);
        localStorage.setItem(keys.themeStorageKey, keys.darkTheme);
        themeToggleLightIcon.classList.remove('hidden');
        themeToggleDarkIcon.classList.add('hidden');

        try {
            Chart.defaults.color = keys.chartJs.darkColor;
            Chart.defaults.scale.gridLines.color = keys.chartJs.darkColor;
        } catch {}

    } else { // Caso contrário, seta o claro
        
        document.documentElement.classList.remove(keys.darkTheme);
        localStorage.setItem(keys.themeStorageKey, keys.lightTheme);
        themeToggleDarkIcon.classList.remove('hidden');
        themeToggleLightIcon.classList.add('hidden');

        try {
            Chart.defaults.color = keys.chartJs.lightColor;
            Chart.defaults.scale.gridLines.color = keys.chartJs.lightColor;
        } catch {}
    }

    try {
        var allCharts = Chart.instances;

        for (var chartId in allCharts) {
            if (allCharts.hasOwnProperty(chartId)) {
                allCharts?.[chartId].update();
            }
        }
    } catch {}
    
}