document.addEventListener('DOMContentLoaded', () => {

    // ハンバーガーメニュー
    const hamburger = document.querySelector('.header-hamburger');
    const nav = document.querySelector('.header__nav');

    if (hamburger && nav) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('open');
            nav.classList.toggle('open');
        });

        nav.querySelectorAll('a[href]').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('open');
                nav.classList.remove('open');
            });
        });
    }

    // フローティングバナー
    const banner = document.querySelector('.js-floating-banner');
    const footer = document.querySelector('.js-footer');
    const closeBtn = document.querySelector('.js-floating-close');

    if (banner && footer) {
        let isClosed = false;
        let isFooterVisible = false;

        const toggleBanner = () => {
            if (isClosed) return;

            if (window.scrollY > 500 && !isFooterVisible) {
                banner.classList.remove('is-hidden');
            } else {
                banner.classList.add('is-hidden');
            }
        };

        const observer = new IntersectionObserver(([entry]) => {
            isFooterVisible = entry.isIntersecting;
            toggleBanner();
        });

        observer.observe(footer);

        window.addEventListener('scroll', toggleBanner);

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                isClosed = true;
                banner.classList.add('is-hidden');
            });
        }
    }

});

window.addEventListener('load', () => {
    const loading = document.querySelector('.c-loading');
    if (loading) {
        loading.classList.add('is-hidden');
    }
});