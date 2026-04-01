// 23XRStudio 网站导航栏组件

class StudioHeader {
    constructor() {
        this.mobileMenuOpen = false;
        this.init();
    }
    
    init() {
        // 等待DOM加载完成后添加导航栏
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.createHeader());
        } else {
            this.createHeader();
        }
    }
    
    createHeader() {
        // 创建导航栏元素
        const nav = document.createElement('nav');
        nav.className = 'main-nav';
        nav.innerHTML = `
<nav class="navbar">
    <div class="container nav-content">
        <div class="logo">
            <a href="#">✨ 是星星与然然呀 ✨</a>
        </div>
        <ul class="nav-links">
            <li><a href="/#home">首页</a></li>
            <li><a href="/#about">关于</a></li>
            <li><a href="/#works">作品集</a></li>
            <li><a href="/#studio">工作室</a></li>
            <li><a href="/#contact">联系</a></li>
        </ul>
    </div>
</nav>
        `;
        
        // 将导航栏添加到body的最前
        document.body.insertBefore(nav, document.body.firstChild);
        
        // 添加事件监听器
        this.addEventListeners();
        
        // 初始化导航栏动画
        this.initNavAnimation();
    }
    
    addEventListeners() {
        // 移动端菜单按钮
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');
        
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', () => {
                this.mobileMenuOpen = !this.mobileMenuOpen;
                navLinks.classList.toggle('active');
            });
        }
        
        // 导航链接点击事件
        const navLinksElements = document.querySelectorAll('.nav-link');
        navLinksElements.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                this.scrollToSection(targetId);
                
                // 如果是移动端，关闭菜单
                if (window.innerWidth <= 768) {
                    this.mobileMenuOpen = false;
                    navLinks.classList.remove('active');
                }
            });
        });
    }
    
    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            // 使用GSAP实现平滑滚动
            if (typeof gsap !== 'undefined') {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: { y: `#${sectionId}`, offsetY: 70 },
                    ease: "power2.inOut"
                });
            } else {
                // 备用方案：使用原生滚动
                const yOffset = -70;
                const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        }
    }
    
    initNavAnimation() {
        // 滚动时改变导航栏样式
        window.addEventListener('scroll', () => {
            const nav = document.querySelector('.main-nav');
            if (window.scrollY > 50) {
                nav.style.backgroundColor = 'rgba(18, 18, 18, 0.98)';
                nav.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
            } else {
                nav.style.backgroundColor = 'rgba(18, 18, 18, 0.95)';
                nav.style.boxShadow = 'none';
            }
        });
    }
}

// 自动初始化
let studioHeader;
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        studioHeader = new StudioHeader();
    });
} else {
    studioHeader = new StudioHeader();
}

// 导出供其他脚本使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = StudioHeader;
}