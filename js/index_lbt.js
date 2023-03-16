window.addEventListener('load', function () {
    // 页面小轮播图
    // 1 、 获取元素 
    var col = document.querySelector('.col_02');
    var colPre = col.querySelector('.pre');
    var colNext = col.querySelector('.next');
    var col_ul = col.querySelector('ul');
    var colWidth = col.offsetWidth;
    var flag = true;
    var number = 0;
    var firstChilDren = col_ul.children[0].cloneNode(true);
    col_ul.appendChild(firstChilDren);
    col.addEventListener('mouseover', function () {
        clearInterval(timer);
        timer = 0;
    });

    col.addEventListener('mouseout', function () {
        timer = setInterval(function () {
            colNext.click();
        }, 2000)
    })
    colNext.addEventListener('click', function () {
        // if (flag) {
        // flag = false;
        if (number == col_ul.children.length - 1) {
            col_ul.style.left = 0;
            number = 0;
        }
        number++;
        animate(col_ul, -number * colWidth, function () {
            // flag = true;
        });
        // }
    });

    colPre.addEventListener('click', function () {
        // if (flag) {
        // flag = false;
        if (number == 0) {
            number = col_ul.children.length - 1;
            col_ul.style.left = -number * colWidth + 'px';
        }
        number--;
        animate(col_ul, -number * colWidth, function () {
            // flag = true;
        });
        // }
    });

    var timer = setInterval(function () {
        colNext.click();
    }, 2000);


    // 手机通讯的轮播图
    var electricID = document.querySelector('#electricID');
    var elePre = electricID.querySelector('.pre');
    var eleNext = electricID.querySelector('.next');
    var ele_ul = electricID.querySelector('ul');
    var eleWidth = electricID.offsetWidth;
    var num = 0;
    var firstEle = ele_ul.children[0].cloneNode(true);
    ele_ul.appendChild(firstEle);
    electricID.addEventListener('mouseover', function () {
        clearInterval(eleTime);
        eleTime = 0;
    });
    electricID.addEventListener('mouseout', function () {
        eleTime = setInterval(function () {
            eleNext.click();
        }, 2000)
    })
    eleNext.addEventListener('click', function () {
        if (num == ele_ul.children.length - 1) {
            ele_ul.style.left = 0;
            num = 0;
        }
        num++;
        animate(ele_ul, -num * eleWidth);
    });
    elePre.addEventListener('click', function () {
        if (num == 0) {
            num = ele_ul.children.length - 1;
            ele_ul.style.left = -num * eleWidth + 'px';
        }
        num--
        animate(ele_ul, -num * eleWidth);
    });

    var eleTime = setInterval(function () {
        eleNext.click();
    }, 2000);


    // 电脑办公的轮播图

    var computerID = document.querySelector('#computer');
    var comPre = computerID.querySelector('.pre');
    var comNext = computerID.querySelector('.next');
    var com_ul = computerID.querySelector('ul');
    var comWidth = computerID.offsetWidth;
    var num1 = 0;
    var firstCom = com_ul.children[0].cloneNode(true);
    com_ul.appendChild(firstCom);
    computerID.addEventListener('mouseover', function () {
        clearInterval(comTime);
        comTime = 0;
    });
    computerID.addEventListener('mouseout', function () {
        comTime = setInterval(function () {
            comNext.click();
        }, 2000)
    })
    comNext.addEventListener('click', function () {
        if (num1 == com_ul.children.length - 1) {
            com_ul.style.left = 0;
            num1 = 0;
        }
        num1++;
        animate(com_ul, -num1 * comWidth);
    });
    comPre.addEventListener('click', function () {
        if (num1 == 0) {
            num1 = com_ul.children.length - 1;
            com_ul.style.left = -num1 * comWidth + 'px';
        }
        num1--
        animate(com_ul, -num1 * comWidth);
    });

    var comTime = setInterval(function () {
        comNext.click();
    }, 2000);



})