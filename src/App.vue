<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import debounce from "lodash-es/debounce"
import { ref, computed, onMounted } from "vue"
import commandList from "./command"
import VoiceAssistant from "./voiceAssistant"
import { useI18n } from 'vue-i18n'
const commandLink = ref(null)
const command = ref("")
const text = ref("")
const param = ref("")
const history = ref([])
var assistant
const aHref = computed(
  () => `tasker://secondary?text=${command.value}&param=${param.value}`
)

if(!localStorage.getItem("lang")){
  localStorage.setItem("lang", "en-US")
  lang = "en-US"
}

function anyMatched(cmdStr, condition){
    if(condition instanceof Array){
      return condition.some(it => anyMatched(cmdStr, it))
    } else if (typeof condition === "function") {
      return condition(cmdStr)
    } else if (typeof condition === "string") {
      return new RegExp(condition, "i").test(cmdStr)
    } else if (condition instanceof RegExp) {
      return condition.test(cmdStr)
    }
}
onMounted(() => {
  assistant = new VoiceAssistant()
  assistant.setResultCallBack(
    debounce((cmd) => {
      console.log(cmd)
      commandList.forEach((it) => {
        if(anyMatched(cmd, it.when)){
          console.debug(`matched ${it.when}`)
          if(it.do){
            it.do(cmd, assistant)
          }
          if(it.jump){
            aHref.value = `tasker://secondary?task=${it.jump}`
            commandLink.value.click()
          }
        }else{

        }
      })
    }, 1000)
  )
})
const start = () => {
  assistant.start()
}
</script>

<template>
  <div id="app">
    <div class="assistant d-flex-column flex-justify-center flex-items-center">
      <div class="text-center"><span class="h1 ">
          {{ $t('message.hello')}}
        </span></div>
      <div class="mt-5 text-center">
        <button @click="start">
          <h2>Talk</h2>
        </button>
        <a class="hide" ref="commandLink" :href="aHref"></a>
      </div>
    </div>
  </div>
</template>

<style>
body {
  margin: 0;
  padding: 0;
}
.assistant {
  width: 100%;
  bottom: 0;
  position: fixed;
  min-height: 20rem;
  height: 40vh;
  border-radius: 2rem 2rem 0 0;
  box-shadow: 0 -0.5rem 1rem #ccc;
}
</style>
