"auto";
var searchUsers = [
    {'userName':'用户测试','state':''},
    {'userName':'yonghu1','state':''},
    {'userName':'yonghu2','state':''},
    {'userName':'yonghu3','state':''},
    {'userName':'yonghu4','state':''},
    {'userName':'yonghu5','state':''},
    {'userName':'yonghu6','state':''}
]
    //     {'userName':'trullaxx','state':''},
var sendMessage = ['halou', 'hi1', 'hi2', 'hi3', 'hi4', 'hi5']
var command = 1;  //命令: 0空闲, 1私信, 2视频评论, 3直播间评论, 4关注
var g_width = 0
var g_height = 0
var deviceId = getHandsetId()
var path = files.cwd() //返回脚本的"当前工作文件夹路径"。
var g_runTimes = 0;
// log('path', path)
// var s = require('D:/pro-XM/03douyin/autojs-tiktok/myPublic.js')
// var s = require('myPublic.js')
//remi 2340*1080  benji: 2160*1080
log('设备ID:'+deviceId, g_width, g_height)
var 悬浮窗 = floaty.window(
    <frame h="auto" w="auto" gravity="center" bg="#00000000">
        <button id="console" text="暂停" />
    </frame>
);
悬浮窗.setPosition(40, g_height/2-100)   //设置位置（x，y）
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
// 创建OCR对象，需要先在Auto.js Pro的插件商店中下载官方PaddleOCR插件。
var ocr = $ocr.create({
    models: 'slim', // 指定精度相对低但速度更快的模型，若不指定则为default模型，精度高一点但速度慢一点
});
threads.start(function(){
    text("立即开始").findOne().click()
})
requestScreenCapture(); //请求截图权限
//点击控件,参数是一个对象
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
i = 0
j = 0
function mainSub(){
    auto.waitFor();
    // log('设备ID:'+deviceWidth+","+deviceHeight)
    // console.show();  //显示日志
    // toast('打开tiktok')
    // launchApp("TikTok");
	// sleep(4000);
    // s.killApp('TikTok')
    var l_loop = true;
    var runTimes = 0;
    while(l_loop){
        isZanting()
        sleep(1000);
        if(command==0){
            log('等待指令'+runTimes)
        }else if(command==1){
            tk_sixin()
            log(searchUsers)
        }else if(command==2){
            tk_pinglun_sp()
        }else if(command==3){
            tk_pinglun_zb()
        }else if(command==4){
            tk_guanzhu()
        }
        runTimes ++
        if(runTimes >= 10){
            log('运行结束')
            searchUsers = [
                {'userName':'用户测试','state':''},
                {'userName':'yonghu1','state':''},
                {'userName':'yonghu2','state':''},
                {'userName':'yonghu3','state':''},
                {'userName':'yonghu4','state':''},
                {'userName':'yonghu5','state':''},
                {'userName':'yonghu6','state':''}
            ]
            // break
        }
    }
}

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
function tk_pinglun_sp()
{
    log('视频评论')
}  
function tk_pinglun_zb()
{
    log('直播间评论')
    var userNum = 0;
    var mesNum = 0;
    var p_X = 0;
    var p_Y = 0;
    var roomName = '';
    var roomName1 = '';
    while(userNum<searchUsers.length){
        isZanting()
        mesNum = random(0, sendMessage.length)
        sleep(500)
        qidongtk()
        let searchOjb = searchUsers[userNum]
        if(searchOjb.state!=''){
            userNum++
            continue
        }
        let comName = currentActivity()
        log('comName', comName)
        // comName com.ss.android.ugc.aweme.main.MainActivity 首页,包括好友,收件箱, 个人主页都算主页
        if(comName.indexOf('com.ss.android.ugc.aweme.main.MainActivity')>-1){
            if(className('android.widget.ImageView').depth(20).exists()){
                click_Ojb(className('android.widget.ImageView').depth(20))
            }else if(className('android.widget.ImageView').depth(19).exists()){
                click_Ojb(className('android.widget.ImageView').depth(19))
            }else{
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
            //点击搜索
            click_Ojb(packageName('com.ss.android.ugc.trill').className('android.widget.FrameLayout').depth(10).drawingOrder(3))
            sleep(2000)
            //点击用户
            click_Ojb(className('android.widget.TextView').depth(15).drawingOrder(1).text('用户'))
            sleep(5000)
            //直接点击第一个用户,进去再判断是不是搜索的用户,这个页面判断不准, 第一个用户没有坐标就执行一下 findUiReturnTop
            if(p_X == 0 && p_Y == 0){
                // let pos = s.findUiReturnTop(className('android.widget.FrameLayout').depth(21).drawingOrder(1))
                // // click_Ojb(className('android.widget.FrameLayout').depth(21).drawingOrder(1))
                // if(pos.length=2){
                //     //用户第一行坐标有了就不再获取了
                //     if(p_X == 0 && p_Y == 0){
                //         p_X = parseInt(pos[0])
                //         p_Y = parseInt(pos[1])
                //     }
                // }
                p_X = g_width / 2
                p_Y = g_height * 0.172
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
                //用户存在  判断是否有正在直播
                if(className("android.widget.TextView").text('直播').exists()){
                    log('正在直播')
                    roomName = className("android.widget.TextView").depth(15).findOne(1000).text()
                    log('roomName', roomName)
                    click_Ojb(className('android.widget.ImageView').depth(20).drawingOrder(1))
                }else{
                    roomName = ''
                    log('用户没有在直播.')
                    searchUsers[userNum].state = '用户没直播'
                    userNum ++
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
        }
        //直播间页....
        if(comName.indexOf('live.LivePlayActivity')>-1){
            roomName1 = className("android.widget.LinearLayout").depth(20).findOne(1000).bounds()
            log('在直播间'+roomName1)
        }else{
            roomName1 = '';
        }
    }
}    
function tk_guanzhu()
{
    log('关注')
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
/** 字符串是否为空 */
function isEmpty(txt){
    if(txt==""||txt==null||txt==undefined){
       return true;
    }else{
        return false;
    }
}
//返回所有UI中最上面那个,返回坐标
function findUiReturnTop(c_ojb){
    var UiCollection = []
    var retPos = []
    for(var i=0;i<10;i++){
        UiCollection = c_ojb.find()
        if(UiCollection){break}
        sleep(300)
    }
    var minTop = 3000;
    var minX = 0;
    var minY = 0;
    for (let index = 0; index < UiCollection.length; index++) {
        let element = UiCollection[index].bounds();
        let lstxt = text_getMid(String(element), '(', ' -')
        let ls_array = lstxt.split(',')
        // log('element',element, lstxt,ls_array)
        if(ls_array.length==2 ) {
            if(parseInt(ls_array[1]) < minTop){
                minTop = parseInt(ls_array[1])
                minX = parseInt(ls_array[0])+random(5,10)
                minY = parseInt(ls_array[1])+random(5,10)
                retPos=[]
                retPos.push(minX)
                retPos.push(minY)
            }
        }
    }
    // log('retPos', retPos)
    return retPos
}
//取出中间文本
function text_getMid(txt,txt1,txt2) {
    var str = txt;
    var aPos = str.indexOf(txt1);
    var bPos = str.indexOf(txt2,aPos + txt1.length);
    var retstr = str.substr(aPos + txt1.length, txt.length - (aPos + txt1.length) - (txt.length - bPos));
    return retstr;
}
//截图识字本地ocr
function ocr(){
    for (let i = 0; i < 5; i++) {
        let capture = captureScreen('/sdcard/1.png');
        // 检测截图文字并计算检测时间，首次检测的耗时比较长
        // 检测时间取决于图片大小、内容、文字数量
        // 可通过调整$ocr.create()的线程、CPU模式等参数调整检测效率
        let start = Date.now();
        let result = ocr.detect(capture);
        let end = Date.now();
        console.log(result);
    
        toastLog(`第${i + 1}次检测: ${end - start}ms`);
        sleep(3000);
    }
    // ocr.release(); //脚本停止时会自动释放,这里可以不释放
}
mainSub()