### 页面加载的流程
1. 页面卸载
2. DNS解析 域名到ip过程 寻址过程
3. TCP链接
4. HTTP请求
5. 服务器响应
6. 浏览器解析

### Navigation Timing API
- JS 对象模型: PerformanceTiming
- 页面加载市场: loadEventEnd - navigationStart

### 资源加载时间- Resource Timing API
- Js 对象模型: Perform
- 获取和分析应用资源加载的详细网络计时数据

### 资源加载优先级
1. html. css. font. 同步的XMLHTTPRequest这三种类型的资源优先级最好
2. 在可视区的图片, script标签, 异步XMLHttpRequest 和 fetch等
3. 图片 音视频
4. prefetch预读取的资源

- css 在head里和body里的优先级不一样
- 可视区的图片优先级高于js, 但是js会优先加载
- 可推迟加载资源: 图片视频等

#### 自定义资源优先级
- 标签属性 importance

### pre属性
- preload: 预先获取和缓存对应资源
- prefetch: 提示浏览器用于预取将在下一次导航中使用的资源
- prerender: 内容被预先取出, 然后再后台被浏览器渲染
- preconnect: 预先建立连接TCP
- dns-prefetch: 在请求资源之前请求域名
