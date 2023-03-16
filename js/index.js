window.addEventListener('load', function () {

    var search = document.querySelector('.header').querySelector('.search').querySelector('input');
    document.addEventListener('keyup', function (e) {
        //console.log(e.keyCode);
        if (e.keyCode === 83) {
            search.focus();
        }
    })
    // nav 左侧鼠标经过特效
    var dropdown = document.querySelector('.dropdown');
    var dropdownLi = dropdown.querySelectorAll('li');
    for (let i = 0; i < dropdownLi.length; i++) {
        dropdownLi[i].addEventListener('mouseover', function () {
            for (let i = 0; i < dropdownLi.length; i++) {
                dropdownLi[i].className = '';
            }
            this.className = 'active';
        })
        dropdownLi[i].addEventListener('mouseout', function () {
            for (let i = 0; i < dropdownLi.length; i++) {
                dropdownLi[i].className = '';
            }

        })
    }
    // 轮播图效果
    // 1、获取元素
    var focus_b = document.querySelector('.focus_b');
    var pre = focus_b.querySelector('.pre');  // 左按钮
    var next = focus_b.querySelector('.next'); // 右按钮
    var focus_bWidth = focus_b.offsetWidth;
    focus_b.addEventListener('mouseenter', function () {
        clearInterval(timer);
        timer = null;
    });
    focus_b.addEventListener('mouseleave', function () {
        timer = setInterval(function () {
            next.click();
        }, 2000)
    })
    // 2、动态生成小圆圈 有几张图片 就生成几个小圆圈
    var ul = focus_b.querySelector('ul');
    var ol = focus_b.querySelector('.circle');
    for (var i = 0; i < ul.children.length; i++) {
        var li = document.createElement('li');
        //记录当前小圆圈的索引号 通过自定义属性来做
        li.setAttribute('index', i);
        ol.appendChild(li);
        li.addEventListener('click', function () {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'active';

            // 4. 点击小圆圈， 移动图片  移动的是 ul
            var index = this.getAttribute('index');
            console.log(index);
            // 当点击了某个小li 就需把这个小li 的索引号给 num
            num = index;
            // 当点击了某个小li 就需把这个小li 的索引号给 circle
            circle = index;
            //var focus_bWidth = focus_b.offsetWidth;
            //animate(obj, target, callback);
            animate(ul, -index * focus_bWidth);
        })
    }
    ol.children[0].className = 'active';
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    // 6、点击右侧按钮， 图片滚动一张
    var circle = 0;
    // flag 节流阀
    var flag = true;
    var num = 0;
    next.addEventListener('click', function () {
        if (flag) {
            flag = false; //关闭节流阀
            // 如何走到最后复制的一张图片， 此时 我们的ul 要快速复原 left 改为 0；
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focus_bWidth, function () {
                flag = true; // 打开节流阀
            });
            // 7. 点击右侧按钮，小圆圈跟随一起变化 可以再声明一个变量控制小圆圈的播放
            circle++;
            // 如果 circle == 克隆的最后一张图片 需要重新判断
            if (circle == ol.children.length) {
                circle = 0;
            }
            circleChange();
        }
    });

    // 8 左侧按钮作法

    pre.addEventListener('click', function () {
        if (flag) {
            if (num == 0) {
                num = ul.children.length - 1;
                // ul.style.left = (ul.children.length - 1) * focus_bWidth + 'px';
                ul.style.left = -num * focus_bWidth + 'px';

            }
            num--;
            animate(ul, -num * focus_bWidth, function () {
                flag = true;
            });
            // 9. 点击左侧按钮，小圆圈跟随一起变化 
            circle--;
            circle = circle < 0 ? ol.children.length - 1 : circle;
            circleChange();
        }
    });
    function circleChange() {
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'active';
    }
    //10.自动播放轮播图
    var timer = setInterval(function () {
        next.click();
    }, 2000)


    // 倒计时效果
    // 1、 获取元素
    var box_times = document.querySelector('.box_times')
    var hour = box_times.querySelector('.hour');
    var minute = box_times.querySelector('.minute');
    var second = box_times.querySelector('.second');
    var inputTime = +new Date('2099/12/20 10:10:10'); //添加 ‘+’ 是将时间转为毫秒形式  时间可以自行填写  注意ie浏览器不能识别字符‘-’，需修改为/
    countDown(); //调用一次这个函数，防止第一次刷新页面空白
    //2、开启定时器
    setInterval(countDown, 1000);
    function countDown() {
        var nowTime = +new Date(); // 返回的是当前时间总的毫秒数
        var times = (inputTime - nowTime) / 1000 // times 是剩余时间总的秒数
        var h = parseInt(times / 60 / 60 % 24);
        h = h < 10 ? '0' + h : h;
        hour.innerHTML = h;
        var m = parseInt(times / 60 % 60);
        m = m < 10 ? '0' + m : m;
        minute.innerHTML = m;
        var s = parseInt(times % 60);
        s = s < 10 ? '0' + s : s;
        second.innerHTML = s;
    }

    // gass模块无缝滚动特效
    var gass = document.querySelector('.gass_bd');
    var gassUl = gass.getElementsByTagName('ul')[0]; // 这里不要用 querySelectorAll 获取标签元素   否则程序会出错
    var gassLi = gassUl.getElementsByTagName('li');
    console.log(gassUl.style.width);
    gassUl.innerHTML = gassUl.innerHTML + gassUl.innerHTML;
    gassUl.style.width = gassLi[0].offsetWidth * gassLi.length + 'px';
    function move() {
        if (gassUl.offsetLeft < -gassUl.offsetWidth / 2) {
            gassUl.style.left = '0';
        }

        gassUl.style.left = gassUl.offsetLeft - 2 + 'px';
    }

    var setTimer = setInterval(move, 100);

    gassUl.addEventListener('mouseover', function () {
        clearInterval(setTimer);
    });

    gassUl.addEventListener('mouseout', function () {
        setTimer = setInterval(move, 100);
    });

    // 返回顶部特效 
    // 1、 获取元素
    var elevator = document.querySelector('.elevator');
    var down_time = document.querySelector('.down_time');
    //down_time.offsetTop 就是被卷去头部的大小一定要写道滚动的外面
    var down_timeTop = down_time.offsetTop;
    // 当侧边栏固定定位之后应该变化的数值
    var elevatorTop = elevator.offsetTop - down_timeTop;
    var interest = document.querySelector('.interest');
    var goBack = document.querySelector('.goBack');
    var interestTop = interest.offsetTop;
    //2、页面滚动事件 scroll
    document.addEventListener('scroll', function () {
        //console.log(11);
        //window.pageYOffset 页面被卷去的头部
        //console.log(window.pageYOffset);
        // 3、大于倒计时模块改为固定定位
        if (window.pageYOffset >= down_timeTop) {
            elevator.style.position = 'fixed';
            elevator.style.top = elevatorTop + 50 + 'px';
        } else {
            elevator.style.position = 'absolute';
            elevator.style.top = '656px';
        }
        // 4、 当滚到有趣模块，就显示goback 模块
        if (window.pageYOffset >= interestTop) {
            goBack.style.display = 'block';
        } else {
            goBack.style.display = 'none';
        }

    });

    //5、点击返回顶部模块，就让窗口滚动到页面的最上方
    goBack.addEventListener('click', function () {
        //注意里面的x和y 不跟单位 直接写数字即可
        //window.scroll(0, 0);
        animates(window, 0);
    });

    // 6、鼠标点击当前的,当前li的样式为active
    var elevator_lis = elevator.querySelectorAll('li');
    for (let i = 0; i < elevator_lis.length; i++) {
        elevator_lis[i].addEventListener('mouseover', function () {
            for (var i = 0; i < elevator_lis.length; i++) {
                elevator_lis[i].className = '';
                elevator_lis[elevator_lis.length - 1].className = 'goBack';
            }
            this.className = 'active';
        })
    };
    // 动画函数
    function animates(obj, target, callback) {
        //console.log(callback); callback = function() {} 调用的时候 callback()
        clearInterval(obj, timer);
        obj.timer = setInterval(function () {
            var step = (target - window.pageYOffset) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            if (window.pageYOffset == target) {
                clearInterval(obj.timer);
                callback && callback();
            }
            window.scroll(0, window.pageYOffset + step);
        }, 15);

        return 0;
    }


    // 左侧楼梯导航特效
    // 获取元素
    var floorNav = document.querySelector('.elevator_left');
    var floor = document.querySelector('.floor');
    var floorTop = floor.offsetTop;
    //console.log(floorTop);
    //固定之后应该变化的值
    var floorNavTop = floorNav.offsetTop - floorTop;
    //2、页面滚动事件scroll
    document.addEventListener('scroll', function () {
        if (window.pageYOffset >= floorTop) {
            floorNav.style.position = 'fixed';
            floorNav.style.top = floorNavTop + 'px';
        } else {
            floorNav.style.position = 'absolute';
            floorNav.style.top = '1600px'
        };

    });

    var elevator_left_lis = floorNav.querySelectorAll('li');
    for (let i = 0; i < elevator_left_lis.length; i++) {
        elevator_left_lis[i].addEventListener('mouseover', function () {
            for (var i = 0; i < elevator_left_lis.length; i++) {
                elevator_left_lis[i].className = '';
            }

            this.className = 'active';
        });
    };

})