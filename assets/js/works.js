// 制作事例 json 管理用
fetch('/data/works.json')
    .then((response) => response.json())
    .then((data) => {

        const worksList = document.querySelector('#works-list');

        data.works.forEach((work) => {

            const workItem = document.createElement('a');

            workItem.href = work.url;
            workItem.classList.add(
                'p-works__grid-box',
                'l-col--12',
                'l-col--sm-6',
                'l-col--md-4'
            );

            workItem.dataset.category = work.categories.join(' ');

            const categories = work.categoryNames
                .map((category) => {
                    return `<li class="p-works__cat">${category}</li>`;
                })
                .join('');

            workItem.innerHTML = `
                <img
                    src="${work.thumb}"
                    alt="${work.title}"
                    class="p-works__image"
                >

                <div class="p-works__textbox">

                    <ul class="p-works__catlist">
                        ${categories}
                        <li class="p-works__cat">${work.industry}</li>
                    </ul>

                    <h4 class="p-works__heading">
                        ${work.title}
                    </h4>

                </div>
            `;

            worksList.appendChild(workItem);

        });

    });

// top json管理用
fetch('/data/works.json')
.then((response) => response.json())
.then((data) => {

    const worksList = document.querySelector('#top-works-list');

    // featuredがtrueの作品だけ取得
    const featuredWorks = data.works.filter((work) => {
        return work.featured === true;
    });

    // 6件だけ表示
    featuredWorks.slice(0, 6).forEach((work) => {

        const workItem = document.createElement('a');

        workItem.href = work.url;

        workItem.classList.add(
            'p-works__grid-box',
            'l-col--12',
            'l-col--sm-6',
            'l-col--md-4'
        );

        const categories = work.categoryNames
            .map((category) => {
                return `<li class="p-works__cat">${category}</li>`;
            })
            .join('');

        workItem.innerHTML = `
            <img
                src="${work.thumb}"
                alt="${work.title}"
                class="p-works__image"
            >

            <div class="p-works__textbox">

                <ul class="p-works__catlist">
                    ${categories}

                    <li class="p-works__cat">
                        ${work.industry}
                    </li>
                </ul>

                <h4 class="p-works__heading">
                    ${work.title}
                </h4>

            </div>
        `;

        worksList.appendChild(workItem);
    });
});

fetch('/data/works.json')
    .then((response) => response.json())
    .then((data) => {

        const works = data.works;

        // 現在のページの作品IDを取得
        const currentId = document.body.dataset.workId;

        // 現在の作品が何番目か調べる
        const currentIndex = works.findIndex((work) => {
            return work.id === currentId;
        });

        // 前の作品
        const prevWork = works[currentIndex - 1];

        // 次の作品
        const nextWork = works[currentIndex + 1];

        // ナビゲーションを取得
        const prevLink = document.querySelector('.work-detail__prev');
        const nextLink = document.querySelector('.work-detail__next');

        // 前の作品がある場合
        if (prevWork) {

            prevLink.href = prevWork.url;

        } else {

            // 最初の作品なら非表示
            prevLink.style.visibility = 'hidden';

        }

        // 次の作品がある場合
        if (nextWork) {

            nextLink.href = nextWork.url;

        } else {

            // 最後の作品なら非表示
            nextLink.style.visibility = 'hidden';

        }

    });