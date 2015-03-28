(function() {
    // -12 0 c
    // key http://tieba.baidu.com/p/1622260506
    var ECHO_WS_URI = 'ws://html5rocks.websocket.org/echo';
    var WS_URI = 'ws://121.41.107.136:9300/';
    var HOLD_THRESHOLD = 0.2; // s, hold time
    var MIN_DISTANCE = 0; // cm
    var MAX_DISTANCE = 50; // cm
    var MAGIC_DIV = MAX_DISTANCE / 24.0; 
    var TARGET_VIDEO = document.getElementById('video');
    var TARGET_CODE = document.getElementById('code');
    var TARGET_START = document.getElementById('start');
    var IS_FIRST_PLAY = true;
    var SCORE = 0;
    var MAIBAO_NOTES = [
        ["E4", 0.5], ["E4", 0.5], ["E4", 0.5], ["C4", 0.25], ["E4", 0.25], ["G4", 0.5], ["G3", 0.5], ["C4", 0.25], ["G3", 0.25], ["E3", 0.5], ["A3", 0.5], ["B3", 0.5], ["Bb3", 0.25], ["A3", 0.5], ["G3", 0.5], ["E4", 0.5], ["G4", 0.25], ["A4", 0.25], ["F4", 0.25], ["G4", 0.25], ["E4", 0.25], ["C4", 0.25], ["D4", 0.25], ["B3", 0.5], ["C4", 0.5], ["G3", 0.25], ["E3", 0.25], ["A3", 0.5], ["B3", 0.25], ["Bb3", 0.5], ["A3", 0.5], ["G3", 0.5], ["E4", 0.5], ["G4", 0.5], ["A4", 0.5], ["F4", 0.5], ["G4", 0.5], ["E4", 0.5], ["D4", 0.25], ["C4", 0.25], ["B3", 1], ["G4", 0.5], ["F4", 0.25], ["F4", 0.25], ["E4", 0.5], ["E4", 0.5], ["G3", 0.5], ["A3", 0.5], ["C4", 0.5], ["A3", 0.25], ["C4", 0.25], ["D4", 0.5], ["G4", 0.25], ["F4", 0.25], ["F4", 0.5], ["E4", 0.5], ["E4", 0.5], ["C5", 0.5], ["C5", 0.5], ["C5", 0.5], ["G4", 0.25], ["F4", 0.25], ["F4", 0.25], ["E4", 0.5], ["E4", 0.5], ["G3", 0.25], ["A3", 0.25], ["C4", 0.5], ["A3", 0.25], ["C4", 0.25], ["D4", 0.5], ["E4", 0.5], ["D4", 0.5], ["C4", 0.5], ["G4", 0.5], ["F4", 0.25], ["F4", 0.25], ["E4", 0.25], ["E4", 0.25], ["G3", 0.25], ["A3", 0.25], ["C4", 0.5], ["A3", 0.25], ["C4", 0.25], ["D4", 0.25], ["G4", 0.5], ["F4", 0.25], ["F4", 0.25], ["E4", 0.5], ["E4", 0.5], ["C4", 0.5], ["C4", 0.5], ["C4", 0.5], ["G4", 0.25], ["F4", 0.25], ["F4", 0.25], ["E4", 0.25], ["E4", 0.5], ["G3", 0.25], ["A3", 0.25], ["C4", 0.5], ["A3", 0.5], ["C4", 0.25], ["D4", 0.25], ["E4", 0.5], ["D4", 0.5], ["C4", 0.5], ["C4", 0.25], ["C4", 0.25], ["C4", 0.25], ["C4", 0.25], ["D4", 0.25], ["E4", 0.25], ["C4", 0.25], ["A3", 0.25], ["G3", 1], ["C4", 0.25], ["C4", 0.5], ["C4", 0.25], ["C4", 0.25], ["D4", 0.25], ["E4", 0.25], ["C4", 0.25], ["C4", 0.25], ["C4", 0.5], ["C4", 0.25], ["D4", 0.25], ["E4", 0.25], ["C4", 0.25], ["A3", 0.5], ["G3", 0.5], ["E4", 0.25], ["E4", 0.25], ["E4", 0.5], ["C4", 0.25], ["E4", 0.25], ["G4", 0.5], ["G3", 0.5], ["C4", 0.5], ["G3", 0.5], ["E3", 0.5], ["A3", 0.5], ["B3", 0.5], ["Bb3", 0.5], ["A3", 0.5], ["G3", 0.5], ["E4", 0.25], ["F4", 0.25], ["A4", 0.25], ["F4", 0.25], ["G4", 0.5], ["E4", 0.25], ["C4", 0.25], ["D4", 0.5], ["B3", 0.5], ["C4", 0.25], ["G3", 0.25], ["E3", 1], ["A3", 0.5], ["B3", 0.5], ["Bb3", 0.5], ["A3", 0.5], ["G3", 0.5], ["E4", 0.5], ["F4", 0.25], ["A4", 0.25], ["F4", 0.25], ["G4", 0.5], ["E4", 0.25], ["C4", 0.25], ["D4", 0.5], ["B3", 0.5], ["C4", 0.5], ["G3", 0.5], ["E3", 1], ["A3", 0.5], ["B3", 0.5], ["Bb3", 0.5], ["A3", 0.5], ["G3", 0.5], ["E4", 0.5], ["G4", 0.25], ["A4", 0.25], ["F4", 0.25], ["G4", 0.25], ["E4", 0.25], ["C4", 0.25], ["D4", 0.25], ["B3", 0.5], ["E4", 0.25], ["C4", 0.25], ["G3", 0.25], ["G3", 0.25], ["A3", 0.25], ["F4", 0.5], ["F4", 0.5], ["A3", 0.5], ["B3", 0.5], ["A4", 0.5], ["A4", 0.5], ["A4", 0.5], ["G4", 0.5], ["F4", 1], ["E4", 1], ["C4", 1], ["A3", 0.5], ["G3", 0.5], ["E4", 0.25], ["C4", 0.25], ["G3", 0.5], ["G3", 0.25], ["A3", 0.25], ["F4", 0.25], ["F4", 0.25], ["A3", 1], ["B3", 0.5], ["F4", 0.5], ["F4", 0.25], ["F4", 0.5], ["E4", 0.25], ["D4", 0.25], ["C4", 0.25], ["E3", 0.5], ["E3", 0.25], ["C4", 0.5]
    ];

    function initWebSocket() {
        var connection = new WebSocket(WS_URI);
        var last_ts = Math.floor(Date.now() / 1000);
        connection.onopen = function () {
            //connection.send('Ping');
        }
        connection.onerror = function (error) {
            console.log('WebSocket Error ' + error);
        };
        connection.onmessage = function (e) {
            //console.debug('Server: ' + e.data);
            var json_data = JSON.parse(e.data);
            //_.throttle()
            //计算延时误差
            var ts = json_data.time;
            if (ts - last_ts < HOLD_THRESHOLD) { // move too quick
                return;
            }
            var key = json_data.data;
            log(key);
            if (key <= MIN_DISTANCE || key > MAX_DISTANCE) {
                return;
            }
            log(parseInt(key / MAGIC_DIV));
            //Player.playASound(parseInt(key / MAGIC_DIV));
            last_ts = ts;

            //计算正误
            //Player.rhythm;
            console.log( 'play', Player.rhythm);
            console.log('key', key);
            if( Math.abs(Player.rhythm - key) < 8){
                plusScore(10);
            }  
        };
    }

    function playLater(){//延时6s启动
        setTimeout( function(){ 
            TARGET_VIDEO.volume=0; 
            Player.playMario();
            scrollCode();
            // 44s后节奏结束，重新播放
            //setTimeout(
            //    function(){Player.playMario();
            //}, 45000);
        }, 6000);//TODO
    }

    function playVideo(){
        if( TARGET_VIDEO.paused ){// not play
            if (IS_FIRST_PLAY){
                playLater();//延时启动开始
                IS_FIRST_PLAY=false;
            }
            TARGET_VIDEO.play();
        }else{
            TARGET_VIDEO.pause();
        }
    }

    function stopVideo(){

    }

    function scrollCode(){//字体滚动
        $('#code').html(MAIBAO_NOTES);
        $('#code').sinescroller();
    }

    function plusScore(value){//加分以及动画
        var n= value;//Math.round(Math.random()*10);
        var $i=$("<b>").text("+"+n);
        var x=836, y=379;
        SCORE += value;
        //var x=e.pageX,y=e.pageY;
        $i.css( {top:y-20,left:x,position:"absolute",color:"#E94F06"} );
        $("body").append($i);
        $i.animate( {top:y-180,opacity:0,"font-size":"20em"}, 1500, function(){
            $i.remove();
        });
    }

    function gameInit() {
        // TODO
        gameStart();
    }

    function gameStart() {
        // 启动开始
        TARGET_START.addEventListener('click', function(){
            playVideo();
        }, false);
    }

    initWebSocket();
    //Player.demoPlay(14);
    gameInit();

})();

