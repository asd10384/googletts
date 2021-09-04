
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
  return res.status(200).render('check', {audiolist: text});
});
router.post('/audio/check', async (req, res) => {
});
// 메인 끝


module.exports = router;
