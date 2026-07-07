import { produtos  } from "./produtos.js";

//PEGANDO ELEMTNO DO DOM

const section_card = document.querySelector('#cards')

const listaProdutos = () =>{
    produtos.forEach((elem,i) =>{
        section_cards.innerHTML=''

        proudos_forEach((elem,i)=>){
            const divCard = document.createElement('div')
            divCard.setAttribute('class', 'card')

            const imgProduto = document.createElement('img')
            imgProduto.setAttribute('src', elem.caminho_da_imagem
            imgProduto.setAttribute('alt', elem.descricao_produto)
            imgProduto.setAttribute('class', 'img_card')

            const h2Titulo = document.createElement('h2')
            h2Titulo.innerHTML = elem.descricao_produto

            const divValor = document.createElement('div')
            divValor.setAttribute('class','valor_card')
            divValor.innerHTML `R$ ${parseFloat(elem.valor_unitario).toFixed(2).replace('.',',')}`

            const btnCard = document.createElement('button')
            btnCard.setAttribute('class', 'btn_card')
            btnCard.innerHTML = 

    
            )
        }



    })
    

}
