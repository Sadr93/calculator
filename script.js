function formatNumber(number) {
    return new Intl.NumberFormat('fa-IR').format(Math.round(number));
}

function convertToPersianNumbers(text) {
    const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    
    let result = text;
    for (let i = 0; i < 10; i++) {
        result = result.replace(new RegExp(englishNumbers[i], 'g'), persianNumbers[i]);
    }
    return result;
}

function formatInput(input) {
    // تبدیل اعداد فارسی به انگلیسی
    const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    
    let value = input.value;
    
    // تبدیل اعداد فارسی به انگلیسی
    for (let i = 0; i < 10; i++) {
        value = value.replace(new RegExp(persianNumbers[i], 'g'), englishNumbers[i]);
    }
    
    // حذف همه کاراکترهای غیر عددی
    value = value.replace(/\D/g, '');
    
    // اگر مقداری وجود داره، فرمت می‌کنیم
    if (value) {
        value = parseInt(value).toLocaleString('fa-IR');
    }
    
    input.value = value;
}

function getNumericValue(formattedValue) {
    // تبدیل اعداد فارسی به انگلیسی
    const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    
    let value = formattedValue;
    
    // تبدیل اعداد فارسی به انگلیسی
    for (let i = 0; i < 10; i++) {
        value = value.replace(new RegExp(persianNumbers[i], 'g'), englishNumbers[i]);
    }
    
    // حذف همه کاراکترهای غیر عددی و تبدیل به عدد
    return parseInt(value.replace(/\D/g, ''));
}

function calculate() {
    const amount = document.getElementById('amount').value;
    const numericAmount = getNumericValue(amount);
    
    if (isNaN(numericAmount) || numericAmount <= 0) {
        alert('لطفا مبلغ سرمایه را به درستی وارد کنید');
        return;
    }

    const annualInterestRate = 0.37; // 37%
    const quarterlyInterestRate = annualInterestRate / 4;
    const totalInterest = numericAmount * annualInterestRate;
    const totalPayment = numericAmount + totalInterest;
    const quarterlyPayment = totalPayment / 4;

    // نمایش خلاصه اطلاعات
    document.getElementById('investment-amount').textContent = formatNumber(numericAmount);
    document.getElementById('total-interest').textContent = formatNumber(totalInterest);
    document.getElementById('total-payment').textContent = formatNumber(totalPayment);

    // ایجاد جدول اقساط
    const installments = [
        { period: 'سه ماه اول', amount: quarterlyPayment },
        { period: 'سه ماه دوم', amount: quarterlyPayment },
        { period: 'سه ماه سوم', amount: quarterlyPayment },
        { period: 'سه ماه چهارم', amount: quarterlyPayment }
    ];

    const tbody = document.getElementById('installments');
    tbody.innerHTML = '';

    installments.forEach((installment, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${convertToPersianNumbers((index + 1).toString())}</td>
            <td>${installment.period}</td>
            <td>${formatNumber(installment.amount)}</td>
        `;
        tbody.appendChild(row);
    });

    document.getElementById('results').style.display = 'block';
} 