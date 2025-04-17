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
    return Number(value.replace(/\D/g, ''));
}

function calculate() {
    // دریافت و اعتبارسنجی مبلغ سرمایه‌گذاری
    const amount = getNumericValue(document.getElementById('amount').value);
    if (!amount || isNaN(amount)) {
        alert('لطفاً مبلغ سرمایه‌گذاری را وارد کنید');
        return;
    }

    // محاسبه سود و اقساط
    const annualInterest = 0.37; // 37% سود سالیانه
    const quarterlyInterest = annualInterest / 4; // سود سه‌ماهه
    const totalInterest = amount * annualInterest; // کل سود یک سال
    const quarterlyPayment = amount * quarterlyInterest; // مبلغ سود هر سه ماه

    // نمایش خلاصه اطلاعات
    document.getElementById('investment-amount').textContent = formatNumber(amount);
    document.getElementById('total-interest').textContent = formatNumber(totalInterest);
    document.getElementById('total-payment').textContent = formatNumber(amount + totalInterest);

    // ایجاد جدول اقساط
    const installments = [
        { period: 'پایان سه‌ماه اول', amount: quarterlyPayment },
        { period: 'پایان سه‌ماه دوم', amount: quarterlyPayment },
        { period: 'پایان سه‌ماه سوم', amount: quarterlyPayment },
        { period: 'پایان سه‌ماه چهارم', amount: quarterlyPayment + amount } // اضافه کردن اصل سرمایه به قسط آخر
    ];

    const tbody = document.getElementById('installments');
    tbody.innerHTML = '';
    let totalPayment = 0;

    installments.forEach((installment, index) => {
        const row = document.createElement('tr');
        totalPayment += installment.amount;
        
        row.innerHTML = `
            <td>${convertToPersianNumbers(index + 1)}</td>
            <td>${installment.period}</td>
            <td>${formatNumber(installment.amount)}</td>
        `;
        tbody.appendChild(row);
    });

    // نمایش نتایج
    document.getElementById('results').style.display = 'block';
} 