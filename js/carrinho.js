
//CRIANDO O ARRAY DE ITENS DO CARRINHO
const itensCarrinho = JSON.parse(localStorage.getItem('itensSessao')) || []


//CRIANDO ARROW ITEM
const fObjItem = (objProduto) => {
    const item = {
        id_produto: objProduto.id_produto,
        descricao_produto: objProduto.descricao_produto,
        caminho_da_imagem: objProduto.caminho_da_imagem,
        valor_unitario: objProduto.valor_unitario,
        quantidade : 1
    }

    return item

}

//FUNÇÃO PARA ADCIONAR O ITEM NO ARRAY
const addItem = (objItem) => {

    const indice = itensCarrinho.findIndex(
        item => item.id_produto == objItem.id_produto
    );

    if (indice != -1) {

        itensCarrinho[indice].quantidade++;

    } else {

        itensCarrinho.push(fObjItem(objItem));

    }

    localStorage.setItem(
        "itensSessao",
        JSON.stringify(itensCarrinho)
    );

}

//LISTAR ITENS DO CARRINHO
const listItens = () => {

    const itensSelecionados = JSON.parse(localStorage.getItem('itensSessao')) || []

    return itensSelecionados
}

//REMOVER ELEMENTO
const removeItem = (idProduto) => {

    const itens = listItens();

    const indice = itens.findIndex(
        item => item.id_produto == idProduto
    );

    if (indice != -1) {

        itens.splice(indice, 1);

        localStorage.setItem(
            "itensSessao",
            JSON.stringify(itens)
        );

    }

}

//SOMA AO PRODUTO APENAS A QUANTIDADE
const alterarQuantidade = (idProduto, quantidade) => {

    quantidade = parseInt(quantidade);

    if (isNaN(quantidade) || quantidade <= 0) {
        return false;
    }

    const itens = listItens();

    const produto = itens.find(
        item => item.id_produto == idProduto
    );

    if (produto) {

        produto.quantidade = quantidade;

        localStorage.setItem(
            "itensSessao",
            JSON.stringify(itens)
        );

    }

    return true;

}

const calcularTotalItem = (produto) => {

    return produto.valor_unitario * produto.quantidade;

}

const calcularTotalCarrinho = () => {

    const itens = listItens();

    let total = 0;

    itens.forEach(produto => {

        total += produto.valor_unitario * produto.quantidade;

    });

    return total;

}


export {addItem, listItens, removeItem, alterarQuantidade, calcularTotalCarrinho, calcularTotalItem}