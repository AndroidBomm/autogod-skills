package org.aigame.demo;

public class JarCallC {
    static {
        System.loadLibrary("demo");
    }

    public String desc() {
        return "我是来自jar中的字符串";
    }

    public native String getStr();
}
