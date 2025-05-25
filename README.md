# Ginateacher TTS API

這是一個部署在 Vercel 的語音伺服器，使用 Google Cloud Text-to-Speech。

## 使用方式：

1. 在 Vercel 設定環境變數 GOOGLE_TTS_KEY_JSON，值為你的金鑰 JSON 壓縮成一行。
2. 部署完成後，可使用 `/api/tts?word=hello` 來播放語音 🎧
