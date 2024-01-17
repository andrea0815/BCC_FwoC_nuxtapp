<template>
        <audio :src="`/sounds/${sound}.wav`" controls ref="audioTag" class="hide" @ended="ended"></audio>
        <button @click="playSound" ref="buttonTag" class="btn1 my-4 mx-4" :class="{ playing: isPlaying }">{{ sound }}</button>
</template>

<script setup>

import { ref } from 'vue'

const audioTag = ref();
const buttonTag = ref();
const props = defineProps(['sound']);
let isPlaying = ref(false);

const playSound = () => {
    isPlaying.value = true;
    audioTag.value.play(); // .value is IMPOTRANT because it gives you the value of the current audioTag

}


const ended = () => {
    isPlaying.value = false;
}

</script>

