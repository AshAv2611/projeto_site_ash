import { listItens, removeItem, alterarQuantidade, calcularTotalCarrinho } from "./carrinho.js";

const atualizaValoresFinais = () => {
    const subtotal = calcularTotalCarrinho();
    const frete = subtotal > 0 ? 10.00 : 0.00;
    const totalPagar = subtotal + frete;

    const txtTotal = document.querySelector("#valor-total");
    const txtFrete = document.querySelector("#valor-frete");
    const txtPagar = document.querySelector("#valor-Pagar");

    if (txtTotal) txtTotal.innerHTML = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;

    const camposValores = document.querySelectorAll(".valor");
    if (camposValores.length >= 3) {
        camposValores[0].innerHTML = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
        camposValores[1].innerHTML = `R$ ${frete.toFixed(2).replace('.', ',')}`;
        camposValores[2].innerHTML = `R$ ${totalPagar.toFixed(2).replace('.', ',')}`;
    }
};

const montaTelaCarrinho = () => {
    const sectionItensCarrinho = document.querySelector('#itens-carrinho');
    if (!sectionItensCarrinho) return;

    sectionItensCarrinho.innerHTML = '';
    const itens = listItens();

    itens.forEach((elem, i) => {
        const sectionItem = document.createElement('section');
        sectionItem.setAttribute('class', 'item');

        const valorTotalItem = elem.valor_unitario * elem.quantidade;

        sectionItem.innerHTML = `
            <img src='../${elem.caminho_da_imagem}' alt='${elem.descricao_produto}' class='img-item'/>
            <p class='descricao'>${elem.descricao_produto}</p>
            <p class='vlr-unitario'>R$ ${elem.valor_unitario.toFixed(2).replace('.', ',')}</p>
            <input type="number" name='quant${i}' id='quant${i}' class="input-item" value="${elem.quantidade}" min="1" step="1">
            <p class="tot-item" id="total-item-${i}">R$ ${valorTotalItem.toFixed(2).replace('.', ',')}</p>
        `;

        const imgRemover = document.createElement('img');
        imgRemover.setAttribute('src', '../imagens/icones/remover.png');
        imgRemover.setAttribute('alt', 'Remover');
        imgRemover.setAttribute('class', 'img-remover');

        imgRemover.addEventListener('click', () => {
            if (confirm(`Deseja remover ${elem.descricao_produto} da sua lista?`)) {
                removeItem(elem.id_produto);
                montaTelaCarrinho();
            }
        });

        sectionItem.appendChild(imgRemover);
        sectionItensCarrinho.appendChild(sectionItem);

        const inputQuantidade = sectionItem.querySelector(`#quant${i}`);
        inputQuantidade.addEventListener('input', (evt) => {
            let valorDigitado = Number(evt.target.value);

            if (!Number.isInteger(valorDigitado) || valorDigitado < 1) {
                valorDigitado = 1;
                evt.target.value = 1;
            }

            alterarQuantidade(elem.id_produto, valorDigitado);

            const novoTotalItem = elem.valor_unitario * valorDigitado;

            sectionItem.querySelector(`#total-item-${i}`).innerHTML =
                `R$ ${novoTotalItem.toFixed(2).replace('.', ',')}`;

            atualizaValoresFinais();
        });
    });

    atualizaValoresFinais();
};

document.addEventListener("DOMContentLoaded", () => {
    montaTelaCarrinho();
});