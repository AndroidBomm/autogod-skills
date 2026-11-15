function MyClass(){
    this.name = "张三";
    this.age = 18;

    this.show = function(){
        alert("我的信息",this.name+"\n"+this.age);
    }
}

MyClass;//导出类