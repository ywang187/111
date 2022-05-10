function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
}
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

var proNo = getUrlParam("no");
function showCart() {
    $(".uk-drop").addClass("uk-open");
    setTimeout(function () {
        $(".uk-drop").removeClass("uk-open");
    }, 1500);
}

$.getJSON("assets/json/product.json?v=1.4", function (data) {
    console.log(data)
    var productList = data;
    var product = [];
    if (productList != null && productList) {
        for (var i = 0; i < productList.length; i++) {
            if (proNo == productList[i].PRODUCT_NO) {
                product = productList[i];
            }
        }
        $(".section-hero__title").html(product.PRODUCT_NAME);
        $(".productName").html(product.PRODUCT_NAME);
        $(".FP_PRICE").html(product.FP_PRICE);
        $(".description").html(product.DESCRIPTION);
        var proImg = $(".proImg");
        var proImgHtml = ' <li><img src="' + product.IMAGE_LINK + '" alt="img-product-full"></li>';
        proImg.append(proImgHtml);
        var recommend = $("#recommend");
        var recommendHmtl = '';
        for (var i = 0; i < productList.length; i++) {
            if (proNo != productList[i].PRODUCT_NO) {
                recommendHmtl += '<li>';
                recommendHmtl += '<div class="product-card">';
                recommendHmtl += '<div class="product-card__box">';
                recommendHmtl += '<div class="product-card__media">';
                recommendHmtl += '<img class="product-card__img" src="' + productList[i].IMAGE_LINK + '" alt="V-Beauty Pack" />';
                recommendHmtl += '<div class="product-card__btns">';
                recommendHmtl += '<ul>';
                recommendHmtl += ' <li><a href="cart.html"><span >Add to cart</span><i class="fas fa-shopping-basket"></i></a></li>';
                recommendHmtl += ' </ul>';
                recommendHmtl += ' </div>';
                recommendHmtl += '</div>';
                recommendHmtl += '<div class="product-card__info">';
                recommendHmtl += '<div class="product-card__title"> <a href="goodDetail.html?no=' + productList[i].PRODUCT_NO + '">' + productList[i].PRODUCT_NAME + '</a></div>';
                recommendHmtl += ' <div class="product-card__price">$' + productList[i].FP_PRICE + '</div>';
                recommendHmtl += '</div>';
                recommendHmtl += '</div>';
                recommendHmtl += '</div>';;
                recommendHmtl += '</li>';
            }
        }
        //recommend.append(recommendHmtl);
        $("#addCart").click(function () {
            console.log(123)
            var cart = [];
            var quantity = parseInt($("#quantity").val());
            var cartHis = JSON.parse(localStorage.getItem('cart'));
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
            $(this).html("Add Succeed!");
            setTimeout(function () {
                $("#addCart").html("Add to cart")
              
            }, 2500);
            getCart();
            showCart();

        })
    }
})