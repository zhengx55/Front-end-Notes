### Http Request header

| Syntax           | Description                        | Example |
| ---------------- | ---------------------------------- | ------- |
| Accept           | 告知服务器客户端可以处理的内容类型 |         |
| Accept-Encoding  | 客户端编码方式                     |         |
| Accept-Languange | 客户端语言                         |         |
| Cache-Control    | 浏览器缓存方式                     |         |
| Cookie           | cookie信息                         |         |
| Connection       | 是否为长链接                       |         |
| Content-Type     | 实际发送的数据类型                 |         |
| Host             | 要发送到的主机名和端口号           |         |
| User-Agent       | 用户代理信息等                     |         |
| Referer          | 当前请求的来源页面地址             |         |

### Response Header

| Syntax           |                                                                                   | Example                                |
| ---------------- | --------------------------------------------------------------------------------- | -------------------------------------- |
| Date             | 服务器响应时间                                                                    |                                        |
| Connection       | 是否会关闭网络连接                                                                | Connecttion : keep-alive               |
| Keep-Alive       | 空闲连接需要保持打开状态的最小时长以及最大请求数(Connection 需设置为'keep-alive') |                                        |
| Content-Encoding | 内容编码方式                                                                      |                                        |
| Content-Length   | 报文中实体主体的字节大小                                                          |                                        |
| Content-Type     | 内容类型                                                                          | Content-Type: text/html; charset=utf-8 |
| Set-Cookie       | 向客户端发送cookie                                                                |


#### Content-Type Usecase
`
    Content-Type: "application/x-www-form-urlencoded"
`

``` fuy=bction fetchByUrlencoded() {
    fetch('/example',{
        method: 'POST',
        headers:{
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then((res) => {res.json()})
}
```

### HTTPS

* HTTPS (Hypertext Transfer Protocol Secure): 超文本传输安全协议, 在HTTP的基础上加了一个Secure的安全协议。
* HTTPS 是 HTTP 协议的一种扩展, 使用传输层安全性TLS或安全套接字SSL对通信协议进行加密
* HTTP + SSL(TLS) = HTTPS

### HTTP2
* Binary TRANSFORMATION
* 多路复用, 一个链接上可以分为任意多的消息流, 实现并行减少阻塞
* 头部压缩 减少带宽
* 服务器推送 减少加载时间