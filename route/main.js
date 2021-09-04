
require('dotenv').config();
const express = require('express');
const router = express.Router();
const tts = require('../tts');

// 메인 시작
router.get('/', async (req, res) => {
  return res.status(200).render('main', {
    title: '트윕 TTS',
    dec: '트윕 TTS mp3 파일로 직접 제작',
    domain: process.env.DOMAIN,
    url: `http://${process.env.DOMAIN}`
  });
});
router.post('/', async (req, res) => {
  const text = req.body.text || '테스트';
  let fileurl = await tts(text);
  if (fileurl == '오류') return res.status(404).send({err: 'tts 변환 실패'});
  return res.status(200).redirect(`file/${fileurl}`);
});
// 메인 끝


module.exports = router;
