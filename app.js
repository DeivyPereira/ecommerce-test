function readJson() {
    fetch('products.json')
        .then(response => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            return response.json();
        })
        .then(json => {
            this.products = json.products;
            let app = document.querySelector('#products__container');
            let nodes = this.products.map((lang, index) => {
                let li = document.createElement('div');
                //lang[src] = lang[src].replace(/(\r)/gm, "");
                let img = lang.images[0].src;

                li.innerHTML = '<div class="product_detail" >'+
                    '<img src="'+img+'" class="product_img">'+
                    '<div class="title">' + lang.title + '</div>'+
                    '<div class="price">' + lang.variants[0].price + '</div>'+
                    '<div class="buttons">' +
                        '<div class="button-1">Ver Producto</div>'+
                        '<div class="button-2" onclick="AddCart('+index+')"  id="cart-'+  index+ '">Comprar</div>'+
                    '</div>'+
			    '</div>';
                return li;
            });
            app.append(...nodes);
        })
        .catch(function () {
            this.dataError = true;
        })
}

function AddCart(elemnt){
    var elem = document.getElementById('cart-'+ elemnt);
    if(elem.classList.contains("active")){
        elem.classList.remove("active");
        elem.innerHTML = "Comprar";
    }else{
        elem.classList.add("active")
        elem.innerHTML = "Remover";
    }
}