// ==UserScript==
// @name         CSDN导航页自动滚动点赞功能
// @namespace    http://your.namespace/
// @version      0.1
// @description  CSDN nav页面自动滚动并点赞，并关注侧边栏推荐的用户
// @author       lujue
// @match        https://blog.csdn.net/nav/*
// @license      MIT
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var contentDivs = document.querySelectorAll("div.recommendation-btn");
    contentDivs.forEach(function (div) {
        if (!div.textContent.includes("已关注")) {
            console.log(div);
            div.click();
        }
    });

    function scrollSmoothly(index, totalScrolls) {
        return new Promise(resolve => {
            function scroll() {
                if (index < totalScrolls) {
                    window.scrollTo({
                        top: document.body.scrollHeight,
                        behavior: 'smooth'
                    });

                    setTimeout(function () {
                        index++;
                        scroll();
                    }, 1000); // 1秒后执行下一次滚动
                } else {
                    resolve(); // 滚动完成后解决 Promise
                }
            }

            scroll();
        });
    }

    // 添加睡眠函数
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // 主代码
    async function main() {
        var totalScrolls = 10;
        await scrollSmoothly(0, totalScrolls);

        var contentDivs = document.querySelectorAll("div.content");

        // 使用 for...of 循环替代 forEach
        for (const contentDiv of contentDivs) {
            // 在每个 content 的 div 元素中找到符合条件的 span.num 元素
            var imgs = contentDiv.querySelectorAll("div.operation > div > div.operation-b > p.operation-b-img > img");

            // 遍历并打印每个符合条件的 span.num 元素
            for (const img of imgs) {
                if (img.src === "https://img-home.csdnimg.cn/images/20220117023128.png") {
                    await new Promise(resolve => setTimeout(resolve, 500)); // 等待500毫秒
                    img.click();
                }
            }
            console.log("------------------------------");
        }
        //递归循环调用
        main();
    }

    // 调用主函数
    main();
})();
