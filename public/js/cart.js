// Cập nhật số lương sản phẩm trong giỏ hàng
const inputsQuantity = document.querySelectorAll("input[name='quantity']");
//console.log(inputsQuantity);

if (inputsQuantity.length > 0)
{
    inputsQuantity.forEach(input => {
        input.addEventListener("change", () => {
            //console.log(input.value);

            const productId = input.getAttribute("product-id");
            const quantity = input.value;
            //console.log(productId);
            //console.log(quantity);

            window.location.href = `/cart/update/${productId}/${quantity}`;
        });
    });
}
// Hết cập nhật số lượng sản phẩm trong giỏ hàng