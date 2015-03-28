(function() {
    var SOUNDS = _.range(-12, 14).map(function(i) {
        return new Audio(Notes.getDataURI(i));
    });
    var SUPER_MARIO = '3331355 ';

    function demoPlay(music, keyDelta) { // TODO 调整音高 / 调整间隔
        _.each(music, function(key, i) {
            setTimeout(function() { SOUNDS[key + keyDelta].play(); }, 1000 * i);
        });
    }

    //demoPlay(_.map(SUPER_MARIO.replace(' ', '').split(''), _.partial(parseInt, _, 10)), 15);
    var Player = {
        playASound: function(key) {
            //key = parseInt(key, 10) % 24;
            SOUNDS[key].play();
        },
        demoPlay: demoPlay

    };
    window.Player = Player;
})();

