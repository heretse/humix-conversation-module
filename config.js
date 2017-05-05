module.exports = {

    lang: 'cht', // 'en', 'cht' or 'chs'
    'stt-engine': 'watson', // 'watson' or 'google',
    'tts-engine': 'itri', // 'watson' or 'itri' or 'iflytek'
    stt: {
        sttSilenceInterval: 125,
        sttSampleRate: 16000,
        sttChannels: 1,
        sttDebug: false,
        sttDevice: 'plughw:1',
        watson: {
            username: '6e2d666d-e7f4-4624-a68a-64bf3167599f',
            passwd: 'ch7KlSx7axcg'
        },
        google: {
            username: 'xxxxx',
            passwd: '',
            googleCredentialFile: '', //the location of your google auth credential file.
            googleProjectName: '', //the project name which create your credential file.
            googleLan: 'cmn-Hant-TW', // en-Us or cmn-Hant-TW
        }
    },
    tts: {
        watson: {
            username: '',
            passwd: ''
        },
        iflytek: {
            appid: '<app_id>'
        },
        itri: {
            username: 'heretse',
            passwd: 'nn9759',
            speaker: 'Bruce',
        }
    }
};
