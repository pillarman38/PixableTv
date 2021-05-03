'use strict';

app.factory('CONSTANT', function () {
    var ITEM = {
        loaded: false
    };

    return {
        ITEM: ITEM,
        ITEMS: [ITEM, ITEM, ITEM, ITEM, ITEM],
        CATEGORY: {
            COLORS: 0,
            HOMEVIDLIST: 1,
            SELECTEDHOMEVIDFILE: 2,
            SUBTITLES: 3,
            AUDIO: 4,
           
        },
        EFFECT_DELAY_TIME: 500,
        SCROLL_HEIGHT_OF_INDEX: 297, //269, //369, 265+28
        MEDIA_CONTROLLER_TIMEOUT: 3500,
        KEY_CODE: {
            RETURN: 10009,
            ESC: 27
        },
        /*
        CLASS_NAMES: {
            BTN: '.btn',
            BTN_PLAY: '.btn-play',
            BTN_RESUME: '.btn-resume',
            BTN_RESTART: '.btn-restart',
            BTN_ADD_MY_TALKS: '.btn-add-talks',
            BTN_REMOVE_MY_TALKS: '.btn-remove-talks',
            BTN_PLAYER_MY_TALKS: '.player_talks',
            BTN_PLAYER_MY_TALKS_ACTIVE: '.player_talks_active',
            BTN_ABOUT_SPEAKER: '.btn-about-speaker',
            BTN_ABOUT_TALK: '.btn-about-talk',
            VIDEO_INFORMATION: '.video-information',
            CONTROLS_BAR: '.controls-bar',
            SUBTITLE_BOTTOM: 'subtitle-bottom',
            SUBTITLE_MID: 'subtitle-mid',
            SUBTITLE: '#subtitle'
        },*/
        PREPARED_DATA: {
            COLORS: [],
            SUBTITLES: [],
            AUDIO: [],
            HOMEVIDLIST: [],
            SELECTEDHOMEVIDFILE: []
        }
    };
});