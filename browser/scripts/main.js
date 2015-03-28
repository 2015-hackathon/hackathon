(function() {
    // -12 0 c
    // key http://tieba.baidu.com/p/1622260506
    var ECHO_WS_URI = 'ws://html5rocks.websocket.org/echo';
    var WS_URI = 'ws://121.41.107.136:9300/';

    function initWebSocket() {
        var connection = new WebSocket(WS_URI);
        connection.onopen = function () {
            //connection.send('Ping');
        }
        connection.onerror = function (error) {
            console.log('WebSocket Error ' + error);
        };
        connection.onmessage = function (e) {
            console.log('Server: ' + e.data);
            //_.throttle()
            Player.playASound(e.data);
        };
    }

    function gameInit() {
        // TODO
    }

    function gameStart() {
        // TODO
    }

    initWebSocket();
    //Player.demoPlay();

})();

