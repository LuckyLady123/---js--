// obj：目标对象，需要加绝对定位 target：目标位置 timer：动画间隔时间 callback：回调函数
function animate(obj, target, callback) {
    //callback = function(){} 调用时 callback()
    // console.log(callback());
    //先清除以前的定时器，只保留当前一个定时器执行
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        //步长值写到定时器的里面
        //步长值要改为整数，否则会出现小数的问题
        //Math.ceil() 函数返回大于或等于一个给定数字的最小整数。
        // Math.floor() 返回小于或等于一个给定数字的最大整数。
        // Note:  可以理解 Math.floor()为向下取整
        //不能倒退走
        //var step = Math.ceil((target - obj.offsetLeft) / 10);
        var step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetLeft == target) {
            //停止动画 本质是停止定时器
            clearInterval(obj.timer);
            //回调函数写道定时器结束里面
            // if(callback) {
            // 调用函数
            //     callback();       
            //}
            callback && callback();
        }
        //把每次加1 这个步长值改为一个慢慢变小的值 步长公式：（目标值 - 现在的值）/ 10；
        obj.style.left = obj.offsetLeft + step + 'px';
    }, 15)


}