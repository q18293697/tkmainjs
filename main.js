"auto";
var searchUsers = [
    {'userName':'用户测试','state':''},
    {'userName':'yonghu1','state':''},
    {'userName':'yonghu2','state':''},
    {'userName':'yonghu3','state':''},
    {'userName':'yonghu4','state':''},
    {'userName':'yonghu5','state':''},
    {'userName':'yonghu6','state':''}
];
var sendMessage = ['halou', 'hi1', 'hi2', 'hi3', 'hi4', 'hi5']
var command = 1;  //命令: 0空闲, 1私信, 2视频评论, 3直播间评论, 4关注
var g_width = 0;
var g_height = 0;
var deviceId = getHandsetId();
var path = files.cwd(); //返回脚本的"当前工作文件夹路径"。
var g_runTimes = 0;
// log('path', path)
// var s = require('D:/pro-XM/03douyin/autojs-tiktok/myPublic.js')
// var s = require('myPublic.js')
//remi 2340*1080  benji: 2160*1080
log('设备ID:'+deviceId, g_width, g_height)
threads.start(function(){
    text("立即开始").findOne().click()
})
requestScreenCapture(); //请求截图权限
// console.show()
var 悬浮窗 = floaty.window(
    <frame h="auto" w="auto" gravity="center" bg="#00000000">
        <button id="console" text="暂停" />
    </frame>
);
悬浮窗.setPosition(40, g_height/2 - 100)   //设置位置（x，y）
悬浮窗.setAdjustEnabled(true)   //显示三个按钮
悬浮窗.exitOnClose()    //关闭悬浮窗时自动结束脚本运行
//指定确定按钮点击时要执行的动作
悬浮窗.console.click(function () {
    反状态 = 悬浮窗.console.getText();  //获得id="console"的按钮的文字
    if (反状态 == "暂停") {
        toast("脚本已暂停");
        ui.run(function () {
            悬浮窗.console.setText("开始");  //设置按钮文本
        });
    }
    else {
        toast("脚本已继续");
        ui.run(function () {
            悬浮窗.console.setText("暂停");
        });
    }
});
function isZanting() {
    var isShow = false;
    while (1) {
        反状态 = 悬浮窗.console.getText();   
        //log(反状态)
        if (反状态 == "开始") {//反状态为开始时，脚本要暂停，即被阻塞
            if(!isShow){
                isShow = true
                // console.show()
            }
            toastLog("脚本暂停中");
            sleep(2000) //这个只影响主程序，就是你可以在这期间点开始运行，在sleep结束后，主程序会继续运行
        }
        else{//反状态为暂停时，脚本要运行，即跳出死循环
            if(isShow){
                isShow = false
                // console.hide()
                // console.clear()
            }
            break
        }
        g_runTimes ++
    }
}
function mainSub(){
    while(1){
        log(searchUsers)
        isZanting()
        sleep(1000)
        tk_sixin()
    }
}
//获取设备ID
function getHandsetId(){
    let id='';
    if(device.sdkInt<29){
        id = device.getIMEI();
    }else{
        id = device.getAndroidId();
    }
    g_width = device.width
    g_height = device.height
    log(g_width,g_height)
    return id;
}
//私信子程序
function tk_sixin()
{
    log('私信')
    var sixinTimes = 0;
    var userNum = 0;
    var mesNum = 0;
    var p_X = 0;
    var p_Y = 0;
    while(userNum<searchUsers.length){
        isZanting()
        mesNum = random(0, sendMessage.length)
        sleep(500)
        qidongtk()
        sixinTimes++
        let searchOjb = searchUsers[userNum]
        if(searchOjb.state!=''){
            userNum++
            continue
        }
        let comName = currentActivity()
        log('comName', comName)
        // comName com.ss.android.ugc.aweme.main.MainActivity 首页,包括好友,收件箱, 个人主页都算主页
        if(comName.indexOf('aweme.main.MainActivity')>-1){
            if(className('android.widget.ImageView').depth(20).exists()){
                click_Ojb(className('android.widget.ImageView').depth(20))
            }else if(className('android.widget.ImageView').depth(19).exists()){
                click_Ojb(className('android.widget.ImageView').depth(19))
            }
            else{
                click('首页')
            }
        }
        //搜索页
        if(comName.indexOf('search.pages.core.ui.activity.SearchResultActivity')>-1){
            log('在搜索页')
            //清空内容键
            click_Ojb(className('android.widget.ImageView').depth(11).clickable(true).drawingOrder(5))
            sleep(500)
            //输入要搜索的文本
            setText(searchOjb.userName)
            sleep(500)
            //点击搜索  控件位置不固定,选择用坐标点击
            // click_Ojb(packageName('com.ss.android.ugc.trill').className('android.widget.FrameLayout').depth(9).drawingOrder(3))
            click(g_width * 0.851852, g_height * 0.037037)
            sleep(2000)
            //点击用户
            click_Ojb(className('android.widget.TextView').depth(15).drawingOrder(1).text('用户'))
            sleep(5000)
            //直接点击第一个用户,进去再判断是不是搜索的用户,这个页面判断不准, 第一个用户没有坐标就执行一下 findUiReturnTop
            if(p_X == 0 && p_Y == 0){
                p_X = g_width / 2
                p_Y = g_height * 0.172
                // let pos = s.findUiReturnTop(className('android.widget.FrameLayout').depth(21).drawingOrder(1))
                // // click_Ojb(className('android.widget.FrameLayout').depth(21).drawingOrder(1))
                // if(pos.length=2){
                //     //用户第一行坐标有了就不再获取了
                //     if(p_X == 0 && p_Y == 0){
                //         p_X = g_width / 2
                //         p_Y = g_height * 0.172
                //     }
                // }
            }
            if(p_X>0&&p_Y>0){
                click(p_X, p_Y)
            }
            sleep(5000)
            // if(className("android.widget.TextView").text(searchName).exists()){
            //     log('找到用户')
            //     click_Ojb(className("android.widget.TextView").text(searchName))
            // }else{
            //     log('没有找到')
            //     //没找到用户, 下标加1
            //     userNum ++
            // }
        }
        //用户页 
        if(comName.indexOf('host.TikTokHostActivity')>-1){
            //判断用户是不是我们搜索的用户
            if(className("android.widget.TextView").text('@'+searchOjb.userName).exists()){
                for (let index = 0; index < 10; index++) {
                    //有关注按钮就点关注
                    click_Ojb(className('android.widget.TextView').depth(18).drawingOrder(1).clickable(true))
                    //有发送按钮点发送
                    click_Ojb(className('android.widget.TextView').depth(18).drawingOrder(2).clickable(true))
                    //右上角,私信发消息的界面\
                    sleep(3000)
                    if(className("android.widget.LinearLayout").clickable(true).depth(11).exists()){
                        break
                    }
                }
            }else{
                searchUsers[userNum].state = '用户不存在'
                userNum ++
                back()
                sleep(500)
                back()
                sleep(500)
                back()
            }
            if(className("android.widget.LinearLayout").clickable(true).depth(11).exists()){
                if(text("由于该用户没有关注你，因此无法向其发送消息").exists()){
                    log('无法发送')
                    //无法发送用户,下标加1
                    searchUsers[userNum].state = '用户无法发送'
                    userNum ++
                }else if(className("android.widget.EditText").clickable(true).depth(12).exists()){
                    setText(sendMessage[mesNum])
                    sleep(1000)
                    click_Ojb(className("android.widget.ImageView").clickable(true).depth(11).drawingOrder(3))
                    sleep(1000)
                    //消息发送完毕,下标加1
                    searchUsers[userNum].state = '发送成功'
                    userNum ++
                }
                //操作完成,点击返回键
                back()
                sleep(500)
                back()
                sleep(500)
                back()
                sleep(500)
            }
        }
    }
}   
// 启动tiktok
function qidongtk(){
    let comName = currentActivity()
    log(comName)
    if(comName){
        if(comName.indexOf('com.ss.android')==-1){
            log('tiktok-APP不存在,启动tiktok')
            launchApp("TikTok");
            // launchApp("com.zhiliaoapp.musically");
        }
    }
}
//点击控件,参数是一个对象
function click_Ojb(c_ojb){
    let retVuale = false;
    let isexists = c_ojb.exists()
    if(!isexists){
        return retVuale
    };
    let rect = c_ojb.findOne();
    if(rect){
        click( rect.bounds().left+random(3, 8),rect.bounds().top+random(3, 8));
        retVuale = true;
    }
    return retVuale
}
mainSub()