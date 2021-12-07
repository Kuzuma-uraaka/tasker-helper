export default class VoiceAssistant {
  constructor(resultCallback = null, errorCallBack = null) {
    this.resultCallback = resultCallback
    this.errorCallBack = errorCallBack
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    this.initRecogniction(recognition)
    this.recognition = recognition
  }
  initRecogniction(recognition) {
    let lang = localStorage.getItem("lang") || "en-US"
    recognition.interimResults = true
    recognition.maxAlternatives = 1
    recognition.lang = lang
    recognition.addEventListener("result", (e) => {
      let last = e.results.length - 1
      let guess = e.results[last][0].transcript
    })
    recognition.addEventListener("speechend", () => {
      recognition.stop()
    })
    recognition.addEventListener("error", (e) => {
      "Error: " + e.error
    })
  }
  set lang(code){
    this.recognition.lang = code
  }
  
  get lang(){
     return this.recognition.lang
  }
  start() {
    this.recognition.start()
  }
  stop() {
    this.recognition.stop()
  }
  setResultCallBack(fn) {
    if (!fn) return
    this.recognition.removeEventListener("result", this.resultCallback, true)
    this.recognition.addEventListener("result", (e) => {
      let last = e.results.length - 1
      let guess = e.results[last][0].transcript
      fn(guess)
    })
    this.resultCallback = fn
  }

  setErrorCallBack(fn) {
    if (!fn) return
    this.recognition.removeEventListener("error", this.resultCallback, true)
    this.recognition.addEventListener("error", fn)
    this.errorCallBack = fn
  }

  setLanguage(code) {
    this.recognition.lang = code
  }
}
