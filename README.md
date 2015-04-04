# 体感游戏

2015沪港马拉松作品

[http://ihackathon.org/](http://ihackathon.org/)

[http://blog.log4d.com/2015/04/2015-hk-sh-hackathon/](http://blog.log4d.com/2015/04/2015-hk-sh-hackathon/)

[http://homeway.me/2015/03/30/play-music-through-senses/](http://homeway.me/2015/03/30/play-music-through-senses/)

<hr><br>

# 其他创意

01. 无人机
02. 服饰 O2O
03. 咪咪帮
04. 兰花
05. 千寻
06. 招财猫
07. 植物萌宠
08. 我要优惠

<hr><br>

# 方案 Brain Storm

* 拳击游戏
* 打鼓
* 钢琴，平面弹奏
* 特雷门琴，距离变化弹奏
* 传感器控制 Doodle（或其他游戏）

<hr><br>

# 需求

动作播放音乐的小游戏

<hr><br>

# 结构

技术结构：

* 前端	(js)
* 后台	(php--websocket)
* 传感器	(python--socket)

其他分工：

* 外表加工

<hr><br>

# 进度

* 27 晚上产品形态
* 28 中午分工
* 28 下午 14 点碰头
* 28 下午 18 点碰头
* 28 晚上 21 点碰头

<hr><br>

# 超级玛丽音乐

```
1/do/c
2/re/d
3/mi/e
4/fa/f
5/so/g
6/la/a
7/xi/b
3331355
1536
7765
35645312715
3677653
564532154433561
```

<hr><br>

# 路演

* 开始
* 游戏开始
* 未来

大家好，先问个问题，大家有玩过节奏大师么？

玩过的朋友知道，游戏很好玩，但是需要用手指去点击那么小一个屏幕，玩起来太累。
今天给大家就尝试颠覆一下他们，给大家带来一款体感游戏，有自己的肢体来玩游戏。

我们先请小草演示一下如何演奏，哈，看，我们还做了一把吉他。



OK 游戏开始了，屏幕正中央是我们音乐的 MV，没错，就是大家耳熟能详的超级玛丽。

左下角是当前音调的提示音，我们将复杂的音调简化为数字。

右下角是当前用户演奏出来的音调，最右边是用户的得分。

可以看到，当用户演奏出来的音调正确时候，用户可以获得积分，给予用户正向回馈。

<hr><br>

# 问题

* 推广：开发积分系统，提供排名，分享到朋友圈，口碑营销
* 盈利：卖硬件

<hr><br>

# How To Use

0x01.将树莓派、web服务器、web客户端放置于一个网段，分别获取他们ip

0x02.修改 `client/browser/scripts/main.js` web端 `WS_URI`，为服务器ip

0x03.修改 `client/raspberry/controler/app.py` raspberry端 `WS_URL`，为服务器ip

0x04.修改服务器ip `server/server.php`

0x05.运行 sever `$php server/server.php`， 运行树莓派 `$python client/raspberry/controler/app.py`，访问web端。

0x06.Have fun.

<hr><br>

# About


![讨论方案](http://xiaocao.u.qiniudn.com/blog/2015-03-30-hackathon-7.jpg)

<hr><br>

![团队照片](http://xiaocao.u.qiniudn.com/blog/2015-03-30-hackathon-5.jpg)

<hr><br>

![获奖照片](http://xiaocao.u.qiniudn.com/blog/2015-03-30-hackathon-6.jpg)

