
getCart();

function getCart() {
    var cartHis = JSON.parse(localStorage.getItem('cart'));

    var cart = $("#cart");
    cart.empty();
    var cartHtml = '';
    var allmoney = 0;
    if (cartHis != null && cartHis) {
        for (var i = 0; i < cartHis.length; i++) {
            cartHtml += '<li>';
            cartHtml += ' <div class="uk-grid-small uk-flex-middle" data-uk-grid>';
            cartHtml += '<div class="uk-width-auto"><img class="uk-border-circle" width="60" height="60" src="' + cartHis[i].IMAGE_LINK + '" alt="img"></div>';
            cartHtml += ' <div class="uk-width-expand">';
            cartHtml += '<h5 class="uk-margin-remove-bottom">' + cartHis[i].PRODUCT_NAME + '</h5>';
            cartHtml += '  <p class="uk-text-meta uk-margin-remove-top">' + cartHis[i].quantity + 'x $' + cartHis[i].FP_PRICE + '</p>';
            cartHtml += ' </div>';
            cartHtml += ' </div>';
            cartHtml += ' </li>';
            allmoney += cartHis[i].quantity * cartHis[i].FP_PRICE;
        }
        cart.append(cartHtml)
        $("#allmoney").html("$" + allmoney)
    }
  
}
$.getJSON("assets/json/product.json?v=1.4", function (data) {
    console.log(data)
    var product = data;
    var productList = $("#productList");
    var productHtml = '';
    if (product != null && product) {
        for (var i = 0; i < product.length; i++) {
            if (i < 6) {
                productHtml += '<div>';
                productHtml += '<div class="product-card">';
                productHtml += '<div class="product-card__box">';
                productHtml += '<div class="product-card__media">';
                productHtml += '<img class="product-card__img" src="' + product[i].IMAGE_LINK + '" alt="V-Beauty Pack" />';
                if (product[i].PRODUCT_NO == "haaa069a") {
                    productHtml += '<img class="" src="http://1juhao.oss-cn-shanghai.aliyuncs.com/637763704635830487_da095aad-afa5-416a-af83-65d15715a2d8.png" style="position:fixed;width:60%"/>';
                }
               
                productHtml += '<div class="product-card__btns">';
                productHtml += '<ul>';
                productHtml += ' <li><a class="cart" data-no="' + product[i].PRODUCT_NO + '" href ="javascript:void(0);"><span class="showInfo">Add to cart</span><i class="fas fa-shopping-basket"></i></a></li>';
                productHtml += ' </ul>';
                productHtml += ' </div>';
                productHtml += '</div>';
                productHtml += '<div class="product-card__info">';
                productHtml += '<div class="product-card__title"> <a href="goodDetail.html?no=' + product[i].PRODUCT_NO + '">' + product[i].PRODUCT_NAME + '</a></div>';
                productHtml += ' <div class="product-card__price">$' + product[i].FP_PRICE + '</div>';
                productHtml += '</div>';
                productHtml += '</div>';
                productHtml += '</div>';
                productHtml += '</div>';
            }
        }
        productList.append(productHtml);
        $(".cart").click(function () {
            var cart = [];
            var quantity = 1;
            var cartHis = JSON.parse(localStorage.getItem('cart'));
            var proNo = $(this).data("no");
            var pro = [];
            for (var i = 0; i < product.length; i++) {
                if (proNo == product[i].PRODUCT_NO) {
                    pro = product[i]
                }
            }
            console.log(cartHis)
            var isHave = false;
            if (cartHis != null) {
                cart = cartHis;
                for (var i = 0; i < cart.length; i++) {
                    if (cart[i].PRODUCT_NO == proNo) {
                        cart[i].quantity = parseInt(cart[i].quantity) + parseInt(quantity);
                        isHave = true;
                    }
                }

                if (isHave) {

                } else {
                    cart.push({
                        PRODUCT_NO: proNo,
                        quantity: quantity,
                        PRODUCT_NAME: pro.PRODUCT_NAME,
                        FP_PRICE: pro.FP_PRICE,
                        FP_PV: pro.FP_PV,
                        IMAGE_LINK: pro.IMAGE_LINK,
                    })
                }
            } else {
                cart.push({
                    PRODUCT_NO: proNo,
                    quantity: quantity,
                    PRODUCT_NAME: pro.PRODUCT_NAME,
                    FP_PRICE: pro.FP_PRICE,
                    FP_PV: pro.FP_PV,
                    IMAGE_LINK: pro.IMAGE_LINK,
                })
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            $(this).children(".showInfo").html("Add Succeed !");
            $(this).children(".showInfo").css("color", "red");
            $(this).css("border-color", "red");
            setTimeout(function () {
                $(".showInfo").html("Add to cart")
                $(".showInfo").css("color", "#222")
                $(".cart").css("border-color", "#e8e8e8")
            }, 2500);
            getCart();
            showCart();
        })
        function showCart() {
            $(".uk-drop").addClass("uk-open");
            setTimeout(function () {
                $(".uk-drop").removeClass("uk-open");
            }, 1500);
        }
    }

})