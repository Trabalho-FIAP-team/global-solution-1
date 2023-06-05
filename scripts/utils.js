export function divideArrayEmSubarray(array, divisor) {

    const novoArray = [];

    if (array.length >= divisor) {

        const tamanhoSubarray = Math.ceil(array.length / divisor);
    
        for (let i = 0; i < array.length; i += tamanhoSubarray) {
            novoArray.push(array.slice(i, i + tamanhoSubarray));
        }

    } else {
        for (let i = 0; i < array.length; i++) {
            novoArray.push([array[i]]);
        }
    }

    return novoArray;
}

export function carregarArquivosDiretorio(dir, extensoesArray) {

    const filter = extensoesArray?.map(ext => `a:contains(${ext})`).join(",") ?? "a";

    return new Promise((resolve, reject) => {

        const arquivos = [];

        $.ajax({
            url: dir,
            success: function(data) {
                $(data).find(filter).each(function () {
                    var arquivo = this.href.replace(window.location.host, "").replace("http://", "");
                    arquivos.push(arquivo);
                });

                resolve(arquivos);
            },
            error: function(_, __, err) {
                reject(err);
            }
        });
    });
}

export function resetarScrollDaPagina() {
    history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
}