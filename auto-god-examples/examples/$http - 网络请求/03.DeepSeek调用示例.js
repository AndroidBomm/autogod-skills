let url = "https://api.deepseek.com/chat/completions";

alert("注意","请到代码中填写ApiKey才能调用成功!");

//自己填写key
let apiKey = ""; //类似于"sk-m451xc526v394f82b90163272c577s"

let res = $http.post({
    url: url,
    head: {
        "Content-Type": "application/json",
        "Authorization": "Bearer "+apiKey,
    },
    data: {
            model: "deepseek-chat",
            messages: [
            {
                role: "system",
                content: "You are a helpful assistant."
            },
            {
                role: "user",
                content: "Hello!"
            }],
            stream: false
    }
});


/*
原理很简单，就是把官方网站提供的curl调用示例，用javascript翻译过来就行了

curl https://api.deepseek.com/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <DeepSeek API Key>" \
  -d '{
        "model": "deepseek-chat",
        "messages": [
          {"role": "system", "content": "You are a helpful assistant."},
          {"role": "user", "content": "Hello!"}
        ],
        "stream": false
      }'

*/


alert("请求结果",res.str());

/*
注意：res.str();是返回响应的字符串

如果你想直接操作json对象，那么请调用 res.json(); 然后打点调属性即可


*/



