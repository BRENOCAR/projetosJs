let cart = [];
let modalQt = 1
let modalKey = 0;

const c = (el)=> document.querySelector(el);
const cs = (el)=> document.querySelectorAll(el);


//listagem das pizzas
pizzaJson.map((item, index)=>{
    let pizzaItem = c('.models .pizza-item').cloneNode(true);
    //preencher as info em pizza item

    pizzaItem.setAttribute('data-key', index); //coloca qual é o id da pizza
    pizzaItem.querySelector('.pizza-item--img img').src = item.img; //add as imagens das pizzas
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`; //add o preço das pizzas
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name; //add o nome das pizzas
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description; //add a descrição das pizzas
    pizzaItem.querySelector('a').addEventListener('click', (e)=>{
        e.preventDefault(); //previni a ação padrão, que seria atualizar a pagina, pois é um link com #
        let key = e.target.closest('.pizza-item').getAttribute('data-key'); //a partir do 'a', ele vai procurar o item mais perto que tem a class pizza item, e pega o atributo
        modalQt = 1;
        modalKey = key;

        //add as informações da pizza no modal
        c('.pizzaBig img').src = pizzaJson[key].img; //add a imagem
        c('.pizzaInfo h1').innerHTML = pizzaJson[key].name; //add o name no modal
        c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description; //add a descrição no modal
        c('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`; //add o preço no modal        
        c('.pizzaInfo--size.selected').classList.remove('selected'); //remove o selected 
        cs('.pizzaInfo--size').forEach((size, sizeIndex)=>{
            if(sizeIndex == 2) {
                size.classList.add('selected');
            } //add o selected na pizza grande sempre
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
        }); //função que add o tamannho de cada pizza no modal em gramas, da pizza pequena, media e grande

        c('.pizzaInfo--qt').innerHTML = modalQt;

        c('.pizzaWindowArea').style.opacity = 0; //suavizar a abertura do modal
        c('.pizzaWindowArea').style.display = 'flex'; //mostra o modal
        setTimeout(()=>{
            c('.pizzaWindowArea').style.opacity = 1;
        }, 500) //suavizar a abertura do modal
        
    }); //add função de click


    c('.pizza-area').append( pizzaItem ); //coloca o clone da area pizza item
});

// Eventos do modal
function closeModal() {
    c('.pizzaWindowArea').style.opacity = 0;
    setTimeout(()=>{
        c('.pizzaWindowArea').style.display = 'none';
    }, 500)
}; //função para fechar o modal

cs('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item)=>{
    item.addEventListener('click', closeModal);
}); // ativa os botões de fechar o modal

c('.pizzaInfo--qtmenos').addEventListener('click', ()=>{
    if(modalQt > 1){
        modalQt--;
        c('.pizzaInfo--qt').innerHTML = modalQt;
    }; 
}); //HABILITA O BOTÃO DE DIMINUIR PIZZA NO MODAL 

c('.pizzaInfo--qtmais').addEventListener('click', ()=>{
    modalQt++;
    c('.pizzaInfo--qt').innerHTML = modalQt;
}); //habilita o botão de adicionar mais pizza no modal

cs('.pizzaInfo--size').forEach((size)=>{
    size.addEventListener('click', ()=>{
        c('.pizzaInfo--size.selected').classList.remove('selected'); //remove o selected
        size.classList.add('selected'); //add a class selected no tamanho que ta clicando 
    });
});

c('.pizzaInfo--addButton').addEventListener('click', ()=>{
    let size = parseInt(c('.pizzaInfo--size.selected').getAttribute('data-key')); //pega qual o tamanho da pizza
    
    let identifier = pizzaJson[modalKey].id+'@'+size; //identificador, nome da pizza + tamanho
    
    let key = cart.findIndex((item)=>item.identifier == identifier);//é uma verificação, para ver se ja existi esse identifier
        
    if(key > -1) {
        cart[key].qt += modalQt; //caso ache algo igual, agrupa no que ja tem
    } else { //caso contrario, cria um item novo no array
        cart.push({
            identifier,
            id:pizzaJson[modalKey].id,
            size,
            qt:modalQt
        }); //add os itens na variavel do carrinho
    }
    updateCart(); 
    closeModal(); //a função que fecha o modal
});

c('.menu-openner').addEventListener('click', () => {
    if(cart.length > 0) {
        c('aside').style.left = '0';
    }
});

c('.menu-closer').addEventListener('click', () => {
    c('aside').style.left = '100vw'
});

function updateCart() {
    c('.menu-openner span').innerHTML = cart.length; //aparece quantos itens tem no carrinho no mobile
    


    if(cart.length > 0) {
        c('aside').classList.add('show'); //abri o carrinho
        c('.cart').innerHTML = ''; 

        let subtotal = 0;
        let desconto = 0;
        let total = 0;

        for(let i in cart) {

            let pizzaItem = pizzaJson.find((item)=> item.id == cart[i].id); //retorna os itens ta pizza
            subtotal += pizzaItem.price * cart[i].qt;
            
            let cartItem = c('.models .cart--item').cloneNode(true); //clona o html do carrinho

            let pizzaSizeName; //coloca o tamanho das pizzas
            switch(cart[i].size) {
                case 0:
                    pizzaSizeName = 'P';
                    break;
                case 1:
                    pizzaSizeName = 'M';
                    break;     
                case 2:
                    pizzaSizeName = 'G';
                    break;    
            }

            let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`;

            cartItem.querySelector('img').src = pizzaItem.img; //add a imagem das pizzas no carrinho
            cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName; //add o nome no carrinho
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt; //mostra quantas pizza foram escolhida da mesma no carrinho
            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', ()=>{
                if(cart[i].qt > 1) {
                    cart[i].qt--;
                } else {
                    cart.splice(i, 1);
                }
                updateCart()
            });
            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', ()=>{
                cart[i].qt++;
                updateCart();
            });

            c('.cart').append(cartItem); //depois te ter clonado adiciona
        }

        desconto = subtotal * 0.1;
        total = subtotal - desconto;

        c('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`; //add o subtotal
        c('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`; //add o total
        c('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`; //add o desconto
        
    } else {
        c('aside').classList.remove('show'); //fecha o carrinho
        c('aside').style.left = '100vw'; //fecha o carrinho no celular
    }
};
