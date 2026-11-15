//文件选择器

$fc.show((files)=> {
    for (let i = 0; i < files.length; i++) {
        log(files[i]);
    }
}, {
    root: "/sdcard",
    path: "/sdcard/Pictures",
    mode: "s",
    type: "a"
});



//..