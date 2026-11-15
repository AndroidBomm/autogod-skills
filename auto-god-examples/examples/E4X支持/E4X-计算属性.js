// 计算属性值
var dynamicAttr = "customValue";
var dynamicElement = <element {"attr-" + "name"}={dynamicAttr} custom={true}>
    <content>{dynamicAttr.toUpperCase()}</content>
</element>;

console.log("计算属性: " + dynamicElement.toXMLString());