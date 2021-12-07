export default [
  {
    when: ["language", "语言", "言語"],
    do(cmd, assitant) {
      const cn = ["mandarin", "chinese" , "中国語", "ちゅうごく", "中文"]
      const en = ["english", "英語", "英文", "英语"]
      const jp = ["japanese", "日本語", "日语"]
      const containsAny = (text, arr) => arr.some((it) => new RegExp(it, "i").test(text))
      if (containsAny(cmd, cn)) {
        assitant.lang = "zh-CN"
        console.debug("中文语音识别已开启")
      } else if (containsAny(cmd, en)) {
        assitant.lang = "en-US"
        console.debug("Voice assistant is running.")
      } else if (containsAny(cmd, jp)) {
        assitant.lang = "ja-JP"
        console.debug("ヴオイスアシスタント起動します")
      } else {
        console.debug("Language not support")
        return
      }
      localStorage.setItem("lang",assitant.lang)
      location.reload(true)
    }
  },
  {
    // This tasker well call tasker hello
    when: "hello",
    jump: {
      task: "hello"
    }
  },
  {
    when: ["timeout", /set.*timeou/],
    do: "tasker://xxxx"
  },
  {
    when: (cmd) => {},
    do(cmd) {}
  }
]
