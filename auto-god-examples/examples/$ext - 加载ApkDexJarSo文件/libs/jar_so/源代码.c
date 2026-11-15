#include <jni.h>
#include <string>

extern "C"
JNIEXPORT jstring JNICALL
Java_org_aigame_demo_JarCallC_getStr(JNIEnv *env, jobject thiz) {
    std::string hello = "我是来自C语言中的字符串!";
    return env->NewStringUTF(hello.c_str());
}