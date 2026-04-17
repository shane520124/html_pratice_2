// 確保 DOM 元素完全載入後再執行
document.addEventListener('DOMContentLoaded', () => {

    // === 1. 導覽列特效與響應式漢堡選單 ===
    const navbar = document.getElementById('navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    // 監聽網頁捲動：當往下滾動時，賦予導覽列陰影與更清晰的背景
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 手機版：點擊漢堡選單按鈕（展開 / 收合選單）
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // 切換按鈕圖示：三條線 (bar) 變成 叉叉 (times)
        const icon = menuToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // 手機版：點擊任何選單連結後，自動收合選單
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // === 2. 聯絡表單的簡單前端檢查體驗 ===
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    
    // 如果存在表單才綁定事件 (防範如果 HTML 修改拿掉表單報錯)
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            // 阻止表單預設的網頁跳轉行為
            e.preventDefault(); 
            
            // 獲取欄位值並去除前後空白
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            // 簡易必填檢查
            if (!name || !email || !subject || !message) {
                alert('麻煩請完整填寫所有欄位喔！');
                return;
            }

            // 簡易 Email 格式檢查 Regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Oops！您填寫的電子郵件格式好像不太對。');
                return;
            }

            // --- 模擬表單發送的視覺過渡效果 ---
            const originalBtnInner = submitBtn.innerHTML;
            
            // 將按鈕改為 Loading 狀態
            submitBtn.innerHTML = '訊息傳送中... <i class="fas fa-spinner fa-spin"></i>';
            submitBtn.style.opacity = '0.8';
            submitBtn.style.cursor = 'not-allowed';
            submitBtn.disabled = true;

            // 模擬向伺服器發送（運用 setTimeout 模擬 1.5 秒延遲）
            setTimeout(() => {
                alert(`太棒了 ${name}！您的訊息已發送成功，我會盡快透過 Email 回覆您。`);
                
                // 表單資料歸零
                contactForm.reset();
                
                // 恢復按鈕狀態
                submitBtn.innerHTML = originalBtnInner;
                submitBtn.style.opacity = '1';
                submitBtn.style.cursor = 'pointer';
                submitBtn.disabled = false;
            }, 1500); 
        });
    }

    // === 3. 視圖捲動觸發動畫 (Intersection Observer) ===
    // 找出所有寫有專屬進場動畫樣式類別的元素
    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');

    // Observer 的設定參數
    const observerOptions = {
        root: null, // 以 viewport 為範圍
        rootMargin: '0px', 
        threshold: 0.15 // 當元素露出 15% 畫面時觸發
    };

    // 建立 Intersection Observer 實例
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            // entry.isIntersecting 代表該目標物已經進入畫面了
            if (entry.isIntersecting) {
                // 給該元素加入 .animate class 以觸發 CSS 設定好的 Transform / Opacity 動畫
                entry.target.classList.add('animate');
                // 動畫只播放一次，觸發後即取消觀察該目標物，節省效能
                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // 把要執行動畫的元素送進 Observer 裡註冊觀察
    animatedElements.forEach(el => {
        observer.observe(el);
    });

});
