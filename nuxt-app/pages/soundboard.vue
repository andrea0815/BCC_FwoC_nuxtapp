<template>
   <VueSection>

        <h1 class="hl"> Soundboard </h1>
        <div class="flex flex-row">
         <audioButton v-for="sound in sounds" :sound="sound"></audioButton>

        </div>

   </VueSection>
</template>

<script setup>

import audioButton from '../components/soundboard/audioButton.vue';

const sounds = ['clap', 'hihat', 'kick', 'perc', 'snare', 'tom'];

// we dont need this because we use vite
// export default {
//    setup() {

//     return {
//         message,
//     };
//    }
// }

</script> 