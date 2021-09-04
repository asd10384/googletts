
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
  const text = req.body.text || null;
  if (!text) return err(res, '메세지칸을 비워둘수 없습니다.');
  let fileurl = await tts(text);
  if (fileurl == '오류') return err(res, 'tts 변환 실패');
  return res.status(200).redirect(`file/${fileurl}`);
});
// 메인 끝

function err(res, text = new String) {
  return res.status(404).render('err', {
    title: '트윕 TTS ERROR',
    dec: '트윕 TTS 에러 사이트',
    domain: process.env.DOMAIN,
    url: `http://${process.env.DOMAIN}`,
    err: text
  });
}

module.exports = router;
