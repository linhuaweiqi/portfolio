// headerにクラス付与
// const header = document.querySelector('.l-header');
// const fv = document.querySelector('.fv');

// window.addEventListener('scroll', () => {
// const fvHeight = fv.offsetHeight;

// if (window.scrollY >= fvHeight) {
//     header.classList.add('is-scrolled');
// } else {
//     header.classList.remove('is-scrolled');
// }
// });

// header・bodyにクラス付与
const header = document.querySelector('.l-header');
const body = document.body;
const fv = document.querySelector('.fv');

const handleScroll = () => {
    const fvHeight = fv.offsetHeight;
    const scrollPosition = body.scrollTop;

    if (scrollPosition >= fvHeight) {
        header.classList.add('is-scrolled');
        body.classList.add('is-scrolled');
    } else {
        header.classList.remove('is-scrolled');
        body.classList.remove('is-scrolled');
    }
};

// bodyのスクロールを監視
body.addEventListener('scroll', handleScroll);

// 初期状態も判定
handleScroll();

// ハンバーガーメニュー
document.addEventListener('DOMContentLoaded', () => {

    const hamburgers = document.querySelectorAll('.l-header-hamburger');

    hamburgers.forEach(hamburger => {

        // ハンバーガーと同じinner内にあるナビを取得
        const inner = hamburger.closest('.l-header__inner');
        const nav = inner?.querySelector('.l-header__nav');

        if (!nav) return;

        // クリックで開閉
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('open');
            nav.classList.toggle('open');
        });

        // リンククリックで閉じる
        nav.querySelectorAll('a[href]').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('open');
                nav.classList.remove('open');
            });
        });

    });

});


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

// header
document.addEventListener("DOMContentLoaded", () => {
    const sections = [...document.querySelectorAll('[id^="sec_"]')];
    const navLinks = [...document.querySelectorAll(".l-ui-header__link")];

    let clickedTarget = null;

    function setActive(id) {
        navLinks.forEach((link) => {
            link.classList.toggle(
                "is-active",
                link.getAttribute("href") === `#${id}`
            );
        });
    }

    // アンカークリック
    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            clickedTarget = link.getAttribute("href").substring(1);
            setActive(clickedTarget);
        });
    });

    // スクロール位置による判定
    function updateActiveLink() {
        if (clickedTarget) {
            const target = document.getElementById(clickedTarget);

            if (target && Math.abs(target.getBoundingClientRect().top) > 150) {
                return;
            }

            clickedTarget = null;
        }

        let current = sections[0];

        sections.forEach((section) => {
            if (section.getBoundingClientRect().top <= 150) {
                current = section;
            }
        });

        if (
            window.innerHeight + window.scrollY >=
            document.documentElement.scrollHeight - 5
        ) {
            current = sections[sections.length - 1];
        }

        if (current) setActive(current.id);
    }

    window.addEventListener("scroll", updateActiveLink);
    window.addEventListener("resize", updateActiveLink);

    updateActiveLink();
});