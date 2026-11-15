//AIGame 官方示例


//关闭所有绘制图案
$draw.closeAll();


function generateHeartCoordinates(size, offsetX , offsetY) {
    const coordinates = [];
    for (let t = 0; t < 2 * Math.PI; t += 0.01) {
        // 根据爱心参数方程计算 x 和 y
        let x = 16 * Math.pow(Math.sin(t), 3);
        let y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);

        // 缩放坐标，size 控制爱心大小
        x = x * size / 32;
        y = -y * size / 32;

        // 偏移坐标，让爱心居中
        x += size / 2;
        y += size / 2;

        // 应用额外的偏移量来设置爱心位置
        x += offsetX;
        y += offsetY;

        coordinates.push([Math.round(x), Math.round(y)]);
    }
    return coordinates;
}

// 调用函数生成爱心坐标数组
const size = 250;
const offsetX = 300; // 设置爱心在 x 轴上的偏移量
const offsetY = 260; // 设置爱心在 y 轴上的偏移量
const heartCoordinates = generateHeartCoordinates(size, offsetX, offsetY);




$draw.path(heartCoordinates);




//示例结束