const express = require('express');
const path = require('path');
const app = express();

// سرو کردن فایل‌های استاتیک
app.use(express.static(path.join(__dirname)));

// روت اصلی
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// شروع سرور
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 