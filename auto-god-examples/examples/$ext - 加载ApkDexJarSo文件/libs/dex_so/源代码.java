package org.aigame.demo;

public class CallC {
    static {
        System.loadLibrary("demo");
    }
    
    public native String getStr();
}
