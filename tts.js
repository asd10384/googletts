
require('dotenv').config();
const { writeFileSync, existsSync, mkdirSync, readdirSync, unlinkSync } = require('fs');
const db = require('quick.db');

const { TextToSpeechClient } = require('@google-cloud/text-to-speech');
const ttsclient = new TextToSpeechClient({
  keyFile: 'googlettsapi.json',
  fallback: false,
});

const audiofile = 'audiofile';
if (existsSync(audiofile)) {
  readdirSync(audiofile).forEach((f, i) => {
    unlinkSync(`${audiofile}/${f}`);
  });
} else {
  mkdirSync(audiofile);
}

module.exports = async function play(text = new String) {
  let output = await gettext(text);
  if (!output) return '오류';

  let number = rn();
  let fileurl = `${audiofile}/${number}.mp3`;
  writeFileSync(fileurl, output);
  return fileurl;
}

let numberlist = [];
function rn() {
  let num;
  while (true) {
    num = Math.random();
    if (!numberlist.includes(num)) break;
  }
  numberlist.push(num);
  return num.toString().replace(/.+\./g, '');
}


async function gettext(text = new String) {
  let response;
  response = await ttsclient.synthesizeSpeech({
    input: { text: text },
    voice: {
      languageCode: 'ko-KR',
      name: 'ko-KR-Standard-A'
    },
    audioConfig: {
      audioEncoding: 'MP3', // 형식
      speakingRate: 0.905, // 속도
      pitch: 0, // 피치
      // sampleRateHertz: 16000, // 헤르츠
      // effectsProfileId: ['medium-bluetooth-speaker-class-device'] // 효과 https://cloud.google.com/text-to-speech/docs/audio-profiles
    },
  }).catch((err) => {
    return null;
  });
  if (!response) return null;
  return response[0].audioContent;
}
// 출력 끝
