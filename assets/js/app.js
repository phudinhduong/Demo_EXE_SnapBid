const orderKey = 'currentDemoOrder';

// Dữ liệu mô phỏng đơn hàng
const mockOrder = {
    orderId: "A38-BID-20251111",
    productName: "Summer Addides Shoes",
    productImg: "./assets/img/feature_prod_03.jpg",
    finalPrice: 36000000, // 36,000,000 VND
    serviceRate: 0.04,
    serviceFee: 0, // Sẽ được tính
    totalValue: 0, // Sẽ được tính
    escrowRate: 0.1, // Tỷ lệ ký quỹ 10%
    escrowAmount: 0, // Sẽ được tính
    currentStatus: "AWAITING_ESCROW", // Trạng thái ban đầu
    escrowPayment: {
        isPaid: false,
        paymentMethod: null,
        paidDate: null
    }
};

// Hàm định dạng số tiền
function formatVND(amount) {
    return amount.toLocaleString('vi-VN') + ' VND';
}

// 1. Logic cho trang CONFIRM.HTML
if (document.getElementById('confirm-btn')) {
    let order = mockOrder;

    // Tính toán các giá trị
    order.serviceFee = order.finalPrice * order.serviceRate;
    order.totalValue = order.finalPrice + order.serviceFee;
    order.escrowAmount = order.totalValue * order.escrowRate;

    // Lưu đơn hàng vào localStorage nếu chưa có
    localStorage.setItem(orderKey, JSON.stringify(order));

    // Hiển thị dữ liệu lên giao diện
    document.getElementById('product-name').innerText = order.productName;
    document.getElementById('product-img').src = order.productImg;
    document.getElementById('product-id').innerText = order.orderId;
    document.getElementById('final-price').innerText = formatVND(order.finalPrice);

    document.getElementById('confirm-final-price').innerText = formatVND(order.finalPrice);
    document.getElementById('confirm-service-fee').innerText = formatVND(order.serviceFee);
    document.getElementById('confirm-total-value').innerText = formatVND(order.totalValue);

    document.getElementById('escrow-rate').innerText = `${order.escrowRate * 100}%`;
    document.getElementById('escrow-amount').innerText = formatVND(order.escrowAmount);


    const confirmBtn = document.getElementById('confirm-btn');
    const agreementCheck = document.getElementById('agreement-check');

    // Kích hoạt nút khi đồng ý điều khoản
    agreementCheck.addEventListener('change', () => {
        confirmBtn.disabled = !agreementCheck.checked;
    });

    // Chuyển sang trang thanh toán
    confirmBtn.addEventListener('click', () => {
        window.location.href = 'payment.html';
    });
}