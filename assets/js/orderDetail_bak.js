$(document).ready(function () {
    var orderData = [];
    var ORDER_NO = request("ORDER_NO");
    $.ajax({
        url: "http://taiqu3.pawnsh.cn/?app_act=/ctrOrder/orderSingle&ORDER_NO=" + ORDER_NO,
        type: "post",
        contentType: "application/json;charset=utf-8",
        async: false,
        success: function (data) {
            orderData = JSON.parse(data);
            console.log(orderData)
            //绑定支付信息
            bindData(orderData.orderInfo);
            //绑定商品信息
            bindProduct(orderData.orderGoods);
            //判断是否已付款
            if (orderData.orderInfo.STATUS != 0) {
                $("#pay").css("display", "none")
            }
        }
    });
});





$('#cbox').on('click', function () {
    $('#cbox_info').slideToggle(900);
});
$('#ship-box').on('click', function () {
    $('#ship-box-info').slideToggle(900);
});



function request(strParame) {
    var args = new Object();
    var query = location.search.substring(1);

    var pairs = query.split("&"); // Break at ampersand 
    for (var i = 0; i < pairs.length; i++) {
        var pos = pairs[i].indexOf('=');
        if (pos == -1) continue;
        var argname = pairs[i].substring(0, pos);
        var value = pairs[i].substring(pos + 1);
        value = decodeURIComponent(value);
        args[argname] = value;
    }
    return args[strParame];
}

function bindData(data) {
    $("#firstName").val(data.FIRST_NAME);
    $("#lastName").val(data.LAST_NAME);
    $("#companyName").val(data.COMPANY_NAME);
    $("#zipCode").val(data.zipCode);
    $("#streetAddress").val(data.ADDRESS);
    $("#apartment").val(data.APARTMENT);
    $("#city").val(data.CITY);
    $("#state").val(data.STATE);
    $("#phone").val(data.PHONE);
    $("#email").val(data.EMAIL);
    $("#referral").val(data.REFE_NUMBER);
    $("#agent").val(data.agent);
    $("#firstName_dif").val(data.D_FIRST_NAME);
    $("#lastName_dif").val(data.D_LAST_NAME);
    $("#companyName_dif").val(data.D_COMPANY_NAME);
    $("#zipCode_dif").val(data.zipCode_dif);
    $("#streetAddress_dif").val(data.D_ADDRESS);
    $("#apartment_dif").val(data.D_APARTMENT);
    $("#city_dif").val(data.D_CITY);
    $("#state_dif").val(data.D_STATE);
    $("#phone_dif").val(data.D_PHONE);
    $("#email_dif").val(data.D_EMAIL);
    $("#allMooney").html('$' + data.ORDER_PRICE);
    $("#payMooney").html('$' + data.PAY_PRICE);

    $("#checkout-mess").val(data.D_ORDER_NOTES);
	/*
    if (data.REFE_NUMBER && data.REFE_NUMBER.length > 0) {
        //$('#cbox_info').slideToggle(900);
		if (data.REFE_NUMBER == "US09655307") {
            $(".referral").css("display", "none");
        }
		
    } else {
        $(".referral").css("display", "none")
    }
	*/

	if (data.REFE_NUMBER && data.REFE_NUMBER.length > 0) {
        if (data.REFE_NUMBER == "US09655307") {
            $(".referral").css("display", "none");
        }
    } else {
        $(".referral").css("display", "none")
    }
	
    if (data.D_FIRST_NAME && data.D_FIRST_NAME.length > 0) {
        $('#ship-box-info').slideToggle(900);
    } else {
        $(".different-address").css("display", "none")
    }
}

function bindProduct(productList) {
    console.log(productList)
    var money = 0;
    var product = $(".product");
    var productHtml = '';
    if (productList != null) {
        for (var i = 0; i < productList.length; i++) {
            productHtml += '<tr class="cart_item">';
            productHtml += ' <td class="product-name">';
            productHtml += productList[i].PRODUCT_NAME + ' <strong class="product-quantity"> × ' + productList[i].GOODS_NUM + '</strong>';
            productHtml += '</td>';
            productHtml += '<td class="product-total">';
            productHtml += ' <span class="amount">$' + productList[i].FP_PRICE * productList[i].GOODS_NUM + '</span>';
            productHtml += '</td>';
            productHtml += ' </tr>';
            money += productList[i].FP_PRICE * productList[i].GOODS_NUM;
        }
        product.append(productHtml);
        $("#money").html('$' + money);
        //$("#shipping").html('$0');
        //$("#allMooney").html('$' + money);
    } else {


    }
}


//订单重新支付
if (localStorage.getItem('referral') != null && localStorage.getItem('referral').length > 0) {
    $("#referral").val(localStorage.getItem('referral'))
}

$('#check').on('click', function () {
    var t = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    var firstName = $("#firstName").val();
    var lastName = $("#lastName").val();
    var companyName = $("#companyName").val();
    var zipCode = $("#zipCode").val();
    var streetAddress = $("#streetAddress").val();
    var apartment = $("#apartment").val();
    var city = $("#city").val();
    var state = $("#state").val();
    var phone = $("#phone").val();
    var email = $("#email").val();
    var referral = $("#referral").val();
    var agent = $("#agent").val();
    var firstName_dif = $("#firstName_dif").val();
    var lastName_dif = $("#lastName_dif").val();
    var companyName_dif = $("#companyName_dif").val();
    var zipCode_dif = $("#zipCode_dif").val();
    var streetAddress_dif = $("#streetAddress_dif").val();
    var apartment_dif = $("#apartment_dif").val();
    var city_dif = $("#city_dif").val();
    var state_dif = $("#state_dif").val();
    var phone_dif = $("#phone_dif").val();
    var email_dif = $("#email_dif").val();
    var note = $(".note").val();
    var refCheck = $("#cbox").prop("checked");
    var difCheck = $("#ship-box").prop("checked");
    var order = {
        billingDetails: {
            firstName: firstName,
            lastName: lastName,
            companyName: companyName,
            zipCode: zipCode,
            streetAddress: streetAddress,
            apartment: apartment,
            city: city,
            state: state,
            phone: phone,
            email: email,
        },
        referral: {
            ischeck: refCheck,
            referral: referral,
            agent: agent
        },
        differntAddress: {
            ischeck: difCheck,
            firstName_dif: firstName_dif,
            lastName_dif: lastName_dif,
            companyName_dif: companyName_dif,
            zipCode_dif: zipCode_dif,
            streetAddress_dif: streetAddress_dif,
            apartment_dif: apartment_dif,
            city_dif: city_dif,
            state_dif: state_dif,
            phone_dif: phone_dif,
            email_dif: email_dif,
        },
        note: note,
        product: orderData.orderGoods
    };
    console.log(order)
    if (firstName.length <= 0) {
        judge("firstName", "firstName");
    }
    if (lastName.length <= 0) {
        judge("lastName", "lastName");
    }
    if (zipCode.length <= 0) {
        judge("zipCode", "zipCode");
    }
    if (streetAddress.length <= 0) {
        judge("streetAddress", "streetAddress");
    }
    if (apartment.length <= 0) {
        judge("streetAddress", "apartment");
    }
    if (city.length <= 0) {
        judge("city", "city");
    }
    if (state.length <= 0) {
        judge("state", "state");
    }
    if (phone.length <= 0) {
        judge("phone", "phone");
    }
    if (email.length <= 0) {
        judge("email", "email");
    } else {
        if (!(t.test(email))) {
            $("#email").addClass("warning");
            $(".email").html("Email Address Is Wrong");
        }
    }
    if (refCheck) {
        if (referral.length <= 0) {
            judge("referral", "referral");
        }
    }
    if (difCheck) {
        if (firstName_dif.length <= 0) {
            judge("firstName_dif", "firstName_dif");
        }
        if (lastName_dif.length <= 0) {
            judge("lastName_dif", "lastName_dif");
        }
        if (zipCode_dif.length <= 0) {
            judge("zipCode_dif", "zipCode_dif");
        }
        if (streetAddress_dif.length <= 0) {
            judge("streetAddress_dif", "streetAddress_dif");
        }
        if (apartment_dif.length <= 0) {
            judge("streetAddress_dif", "apartment_dif");
        }
        if (city_dif.length <= 0) {
            judge("city_dif", "city_dif");
        }
        if (state_dif.length <= 0) {
            judge("state_dif", "state_dif");
        }
        if (phone_dif.length <= 0) {
            judge("phone_dif", "phone_dif");
        }
        if (email_dif.length <= 0) {
            judge("email_dif", "email_dif");
        } else {
            if (!(t.test(email))) {
                $("#email_dif").addClass("warning");
                $(".email_dif").html("Email Address Is Wrong");
            }
        }
    }

    //判断提交选项是否正确
    if (judgeFrom("firstName") && judgeFrom("lastName") && judgeFrom("streetAddress") && judgeFrom("apartment") && judgeFrom("city") && judgeFrom("state") && judgeFrom("phone") && judgeFrom("email") &&
        judgeFrom("firstName_dif") && judgeFrom("lastName_dif") && judgeFrom("streetAddress_dif") && judgeFrom("apartment_dif") && judgeFrom("city_dif") && judgeFrom("state_dif") && judgeFrom("phone_dif") && judgeFrom("email_dif") && judgeFrom("referral") && judgeFrom("agent")) {
        //验证成功后禁用提交按钮
        $('#check').attr('disabled', true);
        $.ajax({
            url: "http://192.168.65.24:8080/usOrderSys.html?strAction=createCheckedOrder",
            type: "post",
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify(order),
            async: false,
            success: function (json) {
                console.log(json)
                //接口返回成功后按钮恢复
                $('#check').attr('disabled', false);

            }
        })
    }


});

//判断是否存在不正确的提交选项
function judgeFrom(idName) {
    var isOk = false;
    var className = $("#" + idName).attr('class');
    if (className != "warning") {
        isOk = true;
    } else {
        isOk = false;
    }
    return isOk;
}

$("#cbox").on('click', function () {
    var refCheck = $("#cbox").prop("checked");
    if (!refCheck) {
        remove("referral", "referral");
        remove("agent", "agent");
    }
})
$("#ship-box").on('click', function () {
    var difCheck = $("#ship-box").prop("checked");
    if (!difCheck) {
        remove("firstName_dif", "firstName_dif");
        remove("lastName_dif", "lastName_dif");
        remove("zipCode_dif", "zipCode_dif");
        remove("streetAddress_dif", "streetAddress_dif");
        remove("streetAddress_dif", "apartment_dif");
        remove("city_dif", "city_dif");
        remove("state_dif", "state_dif");
        remove("phone_dif", "phone_dif");
        remove("email_dif", "email_dif");

    }
})
function judge(classname, idname) {
    $("." + classname).html("This Item Is Required");
    $("#" + idname).addClass("warning");
}

function remove(classname, idname) {
    $("." + classname).html("");
    $("#" + idname).removeClass("warning");
}

$("#referral").blur(function () {
    var referral = $("#referral").val();
    if (referral.length <= 0) {
        $(".referral").html("This Item Is Required");
        $("#referral").addClass("warning");
    } else {
        $(".referral").html("");
        $("#referral").removeClass("warning");
    }
});
$("#firstName").blur(function () {
    var firstName = $("#firstName").val();
    if (firstName.length <= 0) {
        $(".firstName").html("This Item Is Required");
        $("#firstName").addClass("warning");
    } else {
        $(".firstName").html("");
        $("#firstName").removeClass("warning");
    }
});
$("#lastName").blur(function () {
    var lastName = $("#lastName").val();
    if (lastName.length <= 0) {
        $(".lastName").html("This Item Is Required");
        $("#lastName").addClass("warning");
    } else {
        $(".lastName").html("");
        $("#lastName").removeClass("warning");
    }
});
$("#zipCode").blur(function () {
    var lastName = $("#zipCode").val();
    if (lastName.length <= 0) {
        $(".zipCode").html("This Item Is Required");
        $("#zipCode").addClass("warning");
    } else {
        $(".zipCode").html("");
        $("#zipCode").removeClass("warning");
    }
});
$("#streetAddress").blur(function () {
    var streetAddress = $("#streetAddress").val();
    if (streetAddress.length <= 0) {
        $(".streetAddress").html("This Item Is Required");
        $("#streetAddress").addClass("warning");
    } else {
        $(".streetAddress").html("");
        $("#streetAddress").removeClass("warning");
    }
});
$("#apartment").blur(function () {
    var apartment = $("#apartment").val();
    if (apartment.length <= 0) {
        $(".streetAddress").html("This Item Is Required");
        $("#apartment").addClass("warning");
    } else {
        $(".streetAddress").html("");
        $("#apartment").removeClass("warning");
    }
});
$("#city").blur(function () {
    var city = $("#city").val();
    if (city.length <= 0) {
        $(".city").html("This Item Is Required");
        $("#city").addClass("warning");
    } else {
        $(".city").html("");
        $("#city").removeClass("warning");
    }
});
$("#state").blur(function () {
    var state = $("#state").val();
    if (state.length <= 0) {
        $(".state").html("This Item Is Required");
        $("#state").addClass("warning");
    } else {
        $(".state").html("");
        $("#state").removeClass("warning");
    }
});
$("#phone").blur(function () {
    var phone = $("#phone").val();
    if (phone.length <= 0) {
        $(".phone").html("This Item Is Required");
        $("#phone").addClass("warning");
    } else {
        $(".phone").html("");
        $("#phone").removeClass("warning");
    }
});
$("#firstName_dif").blur(function () {
    var firstName = $("#firstName_dif").val();
    if (firstName.length <= 0) {
        $(".firstName_dif").html("This Item Is Required");
        $("#firstName_dif").addClass("warning");
    } else {
        $(".firstName_dif").html("");
        $("#firstName_dif").removeClass("warning");
    }
});
$("#lastName_dif").blur(function () {
    var lastName = $("#lastName_dif").val();
    if (lastName.length <= 0) {
        $(".lastName_dif").html("This Item Is Required");
        $("#lastName_dif").addClass("warning");
    } else {
        $(".lastName_dif").html("");
        $("#lastName_dif").removeClass("warning");
    }
});
$("#zipCode_dif").blur(function () {
    var lastName = $("#zipCode_dif").val();
    if (lastName.length <= 0) {
        $(".zipCode_dif").html("This Item Is Required");
        $("#zipCode_dif").addClass("warning");
    } else {
        $(".zipCode_dif").html("");
        $("#zipCode_dif").removeClass("warning");
    }
});
$("#streetAddress_dif").blur(function () {
    var streetAddress = $("#streetAddress_dif").val();
    if (streetAddress.length <= 0) {
        $(".streetAddress_dif").html("This Item Is Required");
        $("#streetAddress_dif").addClass("warning");
    } else {
        $(".streetAddress_dif").html("");
        $("#streetAddress_dif").removeClass("warning");
    }
});
$("#apartment_dif").blur(function () {
    var apartment = $("#apartment_dif").val();
    if (apartment.length <= 0) {
        $(".streetAddress_dif").html("This Item Is Required");
        $("#apartment_dif").addClass("warning");
    } else {
        $(".streetAddress_dif").html("");
        $("#apartment_dif").removeClass("warning");
    }
});
$("#city_dif").blur(function () {
    var city = $("#city_dif").val();
    if (city.length <= 0) {
        $(".city_dif").html("This Item Is Required");
        $("#city_dif").addClass("warning");
    } else {
        $(".city_dif").html("");
        $("#city_dif").removeClass("warning");
    }
});
$("#state_dif").blur(function () {
    var state = $("#state_dif").val();
    if (state.length <= 0) {
        $(".state_dif").html("This Item Is Required");
        $("#state_dif").addClass("warning");
    } else {
        $(".state_dif").html("");
        $("#state_dif").removeClass("warning");
    }
});
$("#phone_dif").blur(function () {
    var phone = $("#phone_dif").val();
    if (phone.length <= 0) {
        $(".phone_dif").html("This Item Is Required");
        $("#phone_dif").addClass("warning");
    } else {
        $(".phone_dif").html("");
        $("#phone_dif").removeClass("warning");
    }
});
//邮箱正则验证
$("#email").blur(function () {
    var t = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    var email = $("#email").val();
    if (email.length <= 0) {
        $(".email").html("This Item Is Required");
        $("#email").addClass("warning");
    } else {
        if (!(t.test(email))) {
            $("#email").addClass("warning");
            $(".email").html("Email Address Is Wrong");
        } else {
            $("#email").removeClass("warning");
            $(".email").html("");
        }
    }

});
//邮箱正则验证
$("#email_dif").blur(function () {
    var t = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    var email = $("#email_dif").val();
    if (email.length <= 0) {
        $(".email_dif").html("This Item Is Required");
        $("#email_dif").addClass("warning");
    } else {
        if (!(t.test(email))) {
            $("#email_dif").addClass("warning");
            $(".email_dif").html("Email Address Is Wrong");
        } else {
            $("#email_dif").removeClass("warning");
            $(".email_dif").html("");
        }
    }

});