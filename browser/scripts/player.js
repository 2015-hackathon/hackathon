(function() {
    var SOUNDS = _.range(-12, 14).map(function(i) {
        return new Audio(Notes.getDataURI(i, {freq: 440, seconds: 0.1}));
    });
    var LAST_PLAYED_KEY = null;
    var SUPER_MARIO = [
        3, 3, 3, 1, 3, 5, -2, null,
        //1, 5 - 7, 3 - 7, 6 - 7, null,
        //0, 0, -1, -2, -3, 3, 5, 6, 4, 5, 3, 1, 2, 0, 1, -2, null,
        //-4, 1, 3, 5, 6, 4, 5, 3, 1, 2, null
    ]
    var note_map = {//换算公式
        'C': 1,
        'D': 2,
        'E': 3,
        'F': 4,
        'G': 5,
        'A': 6,
        'B': 7,
    };
    var SUPER_MARIO_NOTES = [
        ["E4", 0.5], ["E4", 0.5], ["E4", 0.5], ["C4", 0.25], ["E4", 0.25], ["G4", 0.5], ["G3", 0.5], ["C4", 0.25], ["G3", 0.25], ["E3", 0.5], ["A3", 0.5], ["B3", 0.5], ["Bb3", 0.25], ["A3", 0.5], ["G3", 0.5], ["E4", 0.5], ["G4", 0.25], ["A4", 0.25], ["F4", 0.25], ["G4", 0.25], ["E4", 0.25], ["C4", 0.25], ["D4", 0.25], ["B3", 0.5], ["C4", 0.5], ["G3", 0.25], ["E3", 0.25], ["A3", 0.5], ["B3", 0.25], ["Bb3", 0.5], ["A3", 0.5], ["G3", 0.5], ["E4", 0.5], ["G4", 0.5], ["A4", 0.5], ["F4", 0.5], ["G4", 0.5], ["E4", 0.5], ["D4", 0.25], ["C4", 0.25], ["B3", 1], ["G4", 0.5], ["F4", 0.25], ["F4", 0.25], ["E4", 0.5], ["E4", 0.5], ["G3", 0.5], ["A3", 0.5], ["C4", 0.5], ["A3", 0.25], ["C4", 0.25], ["D4", 0.5], ["G4", 0.25], ["F4", 0.25], ["F4", 0.5], ["E4", 0.5], ["E4", 0.5], ["C5", 0.5], ["C5", 0.5], ["C5", 0.5], ["G4", 0.25], ["F4", 0.25], ["F4", 0.25], ["E4", 0.5], ["E4", 0.5], ["G3", 0.25], ["A3", 0.25], ["C4", 0.5], ["A3", 0.25], ["C4", 0.25], ["D4", 0.5], ["E4", 0.5], ["D4", 0.5], ["C4", 0.5], ["G4", 0.5], ["F4", 0.25], ["F4", 0.25], ["E4", 0.25], ["E4", 0.25], ["G3", 0.25], ["A3", 0.25], ["C4", 0.5], ["A3", 0.25], ["C4", 0.25], ["D4", 0.25], ["G4", 0.5], ["F4", 0.25], ["F4", 0.25], ["E4", 0.5], ["E4", 0.5], ["C4", 0.5], ["C4", 0.5], ["C4", 0.5], ["G4", 0.25], ["F4", 0.25], ["F4", 0.25], ["E4", 0.25], ["E4", 0.5], ["G3", 0.25], ["A3", 0.25], ["C4", 0.5], ["A3", 0.5], ["C4", 0.25], ["D4", 0.25], ["E4", 0.5], ["D4", 0.5], ["C4", 0.5], ["C4", 0.25], ["C4", 0.25], ["C4", 0.25], ["C4", 0.25], ["D4", 0.25], ["E4", 0.25], ["C4", 0.25], ["A3", 0.25], ["G3", 1], ["C4", 0.25], ["C4", 0.5], ["C4", 0.25], ["C4", 0.25], ["D4", 0.25], ["E4", 0.25], ["C4", 0.25], ["C4", 0.25], ["C4", 0.5], ["C4", 0.25], ["D4", 0.25], ["E4", 0.25], ["C4", 0.25], ["A3", 0.5], ["G3", 0.5], ["E4", 0.25], ["E4", 0.25], ["E4", 0.5], ["C4", 0.25], ["E4", 0.25], ["G4", 0.5], ["G3", 0.5], ["C4", 0.5], ["G3", 0.5], ["E3", 0.5], ["A3", 0.5], ["B3", 0.5], ["Bb3", 0.5], ["A3", 0.5], ["G3", 0.5], ["E4", 0.25], ["F4", 0.25], ["A4", 0.25], ["F4", 0.25], ["G4", 0.5], ["E4", 0.25], ["C4", 0.25], ["D4", 0.5], ["B3", 0.5], ["C4", 0.25], ["G3", 0.25], ["E3", 1], ["A3", 0.5], ["B3", 0.5], ["Bb3", 0.5], ["A3", 0.5], ["G3", 0.5], ["E4", 0.5], ["F4", 0.25], ["A4", 0.25], ["F4", 0.25], ["G4", 0.5], ["E4", 0.25], ["C4", 0.25], ["D4", 0.5], ["B3", 0.5], ["C4", 0.5], ["G3", 0.5], ["E3", 1], ["A3", 0.5], ["B3", 0.5], ["Bb3", 0.5], ["A3", 0.5], ["G3", 0.5], ["E4", 0.5], ["G4", 0.25], ["A4", 0.25], ["F4", 0.25], ["G4", 0.25], ["E4", 0.25], ["C4", 0.25], ["D4", 0.25], ["B3", 0.5], ["E4", 0.25], ["C4", 0.25], ["G3", 0.25], ["G3", 0.25], ["A3", 0.25], ["F4", 0.5], ["F4", 0.5], ["A3", 0.5], ["B3", 0.5], ["A4", 0.5], ["A4", 0.5], ["A4", 0.5], ["G4", 0.5], ["F4", 1], ["E4", 1], ["C4", 1], ["A3", 0.5], ["G3", 0.5], ["E4", 0.25], ["C4", 0.25], ["G3", 0.5], ["G3", 0.25], ["A3", 0.25], ["F4", 0.25], ["F4", 0.25], ["A3", 1], ["B3", 0.5], ["F4", 0.5], ["F4", 0.25], ["F4", 0.5], ["E4", 0.25], ["D4", 0.25], ["C4", 0.25], ["E3", 0.5], ["E3", 0.25], ["C4", 0.5]
    ];
    SUPER_MARIO_NOTES = _.union(SUPER_MARIO_NOTES, SUPER_MARIO_NOTES);
    var MAIBAO_SOUNDS = _.map(MAIBAO_NOTES, function(note) {
        var a = note[0];
        var b = note[b];
        return new Audio(Notes.getDataURI(a, {freq: 440, seconds: 0.1}));
    });

    var Player = {
        _self : this,
        simpleSheetMusic: new simple_player(),
        simpleSheetMusicOneNote: new simple_player(),
        rhythm : '', //当前权值，对外接口 
        playASound: function(key) {
            //key = parseInt(key, 10) % 24;
            if (key < 0) {
                return;
            }
            //if (LAST_PLAYED_KEY == key) {
            //    return;
            //}
            SOUNDS[key].play();
            LAST_PLAYED_KEY = key;
        },

        playAMusic: function(music) {
            var sleepTime = 0;
            $.each(music, function (index, value) { // TODO 一点点小问题
                setTimeout(function() {
                    Player.simpleSheetMusicOneNote.playOneNote(value);
                    //console.log(value[0]);
                    Player.rhythm = Player.getRhythm( value[0].slice(0,1), value[0].slice(1,2) );
                }, sleepTime);
                sleepTime += value[1] * 60 * 1000 / Player.simpleSheetMusicOneNote.tempo;
            });
            //Player.simpleSheetMusic.play(music);
        },

        demoPlay: function(keyDelta) { // TODO 调整音高 / 调整间隔
            _.each(SUPER_MARIO, function (key, i) {
                setTimeout(function () {
                    if (key != null) {
                        Player.playASound(key + keyDelta);
                    }
                }, 400 * i);
            });
        },

        getRhythm : function(key1, key2){
            // TODO 换算结果
            var value = Number(key2)*7+note_map[key1];
            return Number(value);
        },

        playMario: function() {
            Player.playAMusic(MAIBAO_NOTES);
        }

    };
    window.Player = Player;
})();

