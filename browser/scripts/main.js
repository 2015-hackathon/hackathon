(function() {
    // -12 0 c
    // key http://tieba.baidu.com/p/1622260506
    var ECHO_WS_URI = 'ws://html5rocks.websocket.org/echo';
    var WS_URI = 'ws://121.41.107.136:9300/';
    var HOLD_THRESHOLD = 0.2; // s, hold time
    var MIN_DISTANCE = 0; // cm
    var MAX_DISTANCE = 50; // cm
    var MAGIC_DIV = MAX_DISTANCE / 24.0;

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
            console.debug('Server: ' + e.data);
            var json_data = JSON.parse(e.data);
            //_.throttle()
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
            Player.playASound(parseInt(key / MAGIC_DIV));
            last_ts = ts;
        };
    }

    function gameInit() {
        // TODO
    }

    function gameStart() {
        // TODO
    }

    //initWebSocket();
    //Player.demoPlay(14);
    Player.playMario();

})();

