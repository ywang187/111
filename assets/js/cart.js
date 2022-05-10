getCart();

function getCart() {

    var cartList = $(".cart");
    cartList.empty();//清空内容
    var cartHis = JSON.parse(localStorage.getItem('cart'));
    var cartHtml = '';
    var money = 0;
    var shipping = 0;
    if (cartHis != null) {
        for (var i = 0; i < cartHis.length; i++) {
            cartHtml += '<tr>';
            cartHtml += '<td class="width-10">';
            cartHtml += '<button class="delete" data-index="' + i + '">X</button>';
            cartHtml += '</td>';
            cartHtml += '<td class="width-15">';
            cartHtml += '<img src="' + cartHis[i].IMAGE_LINK + '" />';
            cartHtml += '</td>';
            cartHtml += '<td class="width-40">' + cartHis[i].PRODUCT_NAME + '</td>';
            cartHtml += '<td class="price width-10">$' + cartHis[i].FP_PRICE + '</td>';
            cartHtml += '<td class="width-15"><input value="' + cartHis[i].quantity + '" class="quantity" data-no="' + cartHis[i].PRODUCT_NO + '"/></td>';
            cartHtml += '<td class="width-10">$' + cartHis[i].FP_PRICE * cartHis[i].quantity + '</td>';
            cartHtml += '</tr>';
            money += cartHis[i].FP_PRICE * cartHis[i].quantity;

        }
        $("#money").html("$" + money)
        $("#shipping").html("$" + shipping)
        $("#total").html("$" + (money + shipping))
        cartList.append(cartHtml)
        $(".delete").click(function () {
            var index = $(this).data("index");
            cartHis.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cartHis));
            getCart();
        })
        $(".quantity").on('input', function (e) {
            var proNo = $(this).data("no");
            var cart = [];
            var quantity = $(this).val();
            var cartHis = JSON.parse(localStorage.getItem('cart'));
            console.log($(this).val())
            var isHave = false;
            if (cartHis != null) {
                cart = cartHis;
                for (var i = 0; i < cart.length; i++) {
                    if (cart[i].PRODUCT_NO == proNo) {
                        cart[i].quantity = parseInt(quantity);
                        isHave = true;
                    }
                }

                if (isHave) {

                } else {
                    cart.push({
                        PRODUCT_NO: proNo,
                        quantity: quantity,
                        PRODUCT_NAME: product.PRODUCT_NAME,
                        FP_PRICE: product.FP_PRICE,
                        FP_PV: product.FP_PV,
                        IMAGE_LINK: product.IMAGE_LINK,
                    })
                }
            } else {
                cart.push({
                    PRODUCT_NO: proNo,
                    quantity: quantity,
                    PRODUCT_NAME: product.PRODUCT_NAME,
                    FP_PRICE: product.FP_PRICE,
                    FP_PV: product.FP_PV,
                    IMAGE_LINK: product.IMAGE_LINK,
                })
            }


            localStorage.setItem('cart', JSON.stringify(cart));
            getCart();
        })
    }

}

$("#check").click(function () {
    var cartHis = JSON.parse(localStorage.getItem('cart'));
    if (cartHis != null && cartHis.length > 0) {
        window.location.href = "check.html";
       
    } else {
        alert("There are no goods in the current order")
    }
})