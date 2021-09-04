
require('dotenv').config();
const express = require('express');
const router = express.Router();
const { audiofilelist } = require('../tts');

// 메인 시작
router.get('/audio/check', async (req, res) => {
  var text = '';
  for (f of audiofilelist()) {
    text += `\n      <figure><figcaption>${f}</figcaption><audio controls src="/file/audiofile/${f}">오디오 파일이 지원되지 않는 브라우저 입니다.</audio></figure>`;
  }
  return res.status(200).render('check', {
    title: '트윕 TTS 리스트 확인',
    dec: '제작된 트윕 TTS 리스트 보기',
    domain: process.env.DOMAIN,
    url: `http://${process.env.DOMAIN}`,
    audiolist: text
  });
});
// 메인 끝


module.exports = router;
