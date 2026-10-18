// headerにクラス付与
const header = document.querySelector('.l-header');
const fv = document.querySelector('.fv');

window.addEventListener('scroll', () => {
const fvHeight = fv.offsetHeight;

if (window.scrollY >= fvHeight) {
    header.classList.add('is-scrolled');
} else {
    header.classList.remove('is-scrolled');
}
});

// ハンバーガーメニュー
const hamburger = document.querySelector('.l-header-hamburger');
const nav = document.querySelector('.l-header__nav');

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


 // 制作事例一覧絞り込み
const categoryLinks = document.querySelectorAll('.category__link');
const worksList = document.querySelector('#works-list');
const categoryName = document.querySelector('.p-works__cat-name');

categoryLinks.forEach((link) => {

    link.addEventListener('click', (event) => {
        event.preventDefault();

        const selectedCategory = link.dataset.category;

        categoryLinks.forEach((item) => {
            item.classList.remove('is-active');
        });

        link.classList.add('is-active');

        // クリック時点で作品を取得する
        const worksItems = worksList.querySelectorAll('.p-works__grid-box');

        worksItems.forEach((item) => {

            const categories = (item.dataset.category || '').split(' ');

            if (
                selectedCategory === 'all' ||
                categories.includes(selectedCategory)
            ) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }

        });

        if (categoryName) {
            categoryName.textContent = link.textContent.trim();
        }

    });

});

