# serverchan-private-letter
一个基于 [serverchan](https://sc.ftqq.com) 微信推送服务的私信发送器

具体效果可以看：  
[完整页面版](https://sc.lolico.moe)

可用于个人博客联系方式等私信发送需求场合，并且会将消息发送者的 IP 一并发送

需求……没什么需求，大概有个`nginx` `apache`之类的再加上`php`就能跑了吧

部署完之后请修改`.key.php`，写上你的`SCKEY`

如果需要修改背景图片之类的请编辑`index.php`修改 head 中的 css 内容

另外，访问时带上 get 参数`nobg`可以将背景图变成透明，方便在 iframe 中使用
```
https://xxx.com/?nobg
```
