<template>
    <div
      class="card-container"
      :class="{ flipped: cardData.flipped, matched: cardData.matched }"
      @click="handleClick"
    >
      <div class="card-before"></div>
      <div class="card-after">
        <!-- <img :src="imageSrc" class="image"/> -->
        <MemoryThreeCube :modelSrc="modelSrc"></MemoryThreeCube>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    cardData: Object,
    imageSrc: String,
    modelSrc: String,
  });
  
  const emit = defineEmits(['card-click']);
  
  const handleClick = () => {
    console.log();
    if (!props.cardData.matched) {
      emit('card-click', props.cardData);
    }
  };

  </script>