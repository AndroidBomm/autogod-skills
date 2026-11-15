
let colorValue1 = $color.parse("#784cde");
let colorValue2 = $color.parse(105,78,230);
let colorValue3 = $color.rgb(105,78,230);
let colorValue4 = $color.argb(255,105,78,230);


let info = `
colorValue1=${colorValue1}
colorValue2=${colorValue2}
colorValue3=${colorValue3}
colorValue4=${colorValue4}
`;

alert("颜色值",info);
