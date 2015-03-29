(function() {
    // -12 0 c
    // key http://tieba.baidu.com/p/1622260506
    var ECHO_WS_URI = 'ws://html5rocks.websocket.org/echo';
    //var WS_URI = 'ws://121.41.107.136:9300/';
    var WS_URI = 'ws://192.168.1.114:9300/';
    var HOLD_THRESHOLD = 0.1; // s, hold time
    var MIN_DISTANCE = 0; // cm
    var MAX_DISTANCE = 50; // cm
    var MAGIC_DIV = MAX_DISTANCE / 24.0; 
    var TARGET_VIDEO = document.getElementById('video');
    var TARGET_CODE = document.getElementById('code');
    var TARGET_START = document.getElementById('start');
    var IS_FIRST_PLAY = true;
    var SCORE = 0;
    var IS_GAME_STARTED = false;
    var DENO_PLAY_LAST_KEY = null;

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
            var distance = json_data.data;
            if (distance <= MIN_DISTANCE || distance > MAX_DISTANCE) {
                return;
            }
            //Player.playASound(parseInt(key / MAGIC_DIV));
            last_ts = ts;
            var key = Math.ceil(distance / 4.17); // 4.17 = 50 / (MAX_NOTE / MIN_NOTE), via player.js

            if (!IS_GAME_STARTED) {
                if (DENO_PLAY_LAST_KEY === key) {
                    return;
                }
                Player.playASound(key + 24);
                $('#played_code').html(key);
                DENO_PLAY_LAST_KEY = key;
                return;
            }

            //计算正误
            console.debug('play', Player.rhythm);
            console.debug('key', key);
            $('#played_code').html(key);
            if( Math.abs(Player.rhythm - key -24) < 1){
                plusScore(10);
            }  
        };
    }

    function playLater(){//延时6s启动
        IS_GAME_STARTED = true;
        setTimeout( function(){
            TARGET_VIDEO.volume=0; 
            Player.playMario();
        }, 6000);
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

    function onLrcUpdate(value_1, value_2, value_3, value_4, value_5) {
        $('#code_1').html(value_1);
        $('#code_2').html(value_2);
        $('#code_3').html(value_3);
        $('#code_4').html(value_4);
        $('#code_5').html(value_5);
    }

    function onPlayEnd(){
        document.getElementById('endBtn').click();
        var score = localStorage.getItem('SCORE') ? localStorage.getItem('SCORE') : 0;
        document.getElementById('result-body').innerHTML='感谢您的支持，您的得分是：'+score;
        IS_GAME_STARTED = false;
        TARGET_VIDEO.volume = 1;
    }

    function plusScore(value){//加分以及动画
        if (!IS_GAME_STARTED) {
            return;
        }
        var n= value;//Math.round(Math.random()*10);
        var $i=$("<b>").text("+"+n);
        var x=836, y=379;
        SCORE += value;
        localStorage.setItem('SCORE',SCORE);
        $i.css( {top:y-20,left:x,position:"absolute",color:"#E94F06"} );
        $("body").append($i);
        $i.animate( {top:y-180,opacity:0,"font-size":"20em"}, 1500, function(){
            $i.remove();
        });
        document.getElementById('played_score').innerHTML = SCORE;
    }

    function gameInit() {
        gameStart();
        localStorage.setItem('SCORE',0);
        Player.simpleSheetMusicOneNote.tempo = 80;
    }

    function gameStart() {
        // 启动开始
        TARGET_START.addEventListener('click', function(){
            playVideo();
        }, false);
    }

    initWebSocket();
    gameInit();
    Player.onLrcUpdate = onLrcUpdate;
    Player.onPlayEnd = onPlayEnd;

})();

