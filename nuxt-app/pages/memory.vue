<template>
    <VueSection>
        <h1 class="mb-8">Geometric Memory</h1>
        <div class="wrapper">
    
          <div v-if="isGameRunning" class="stats-container flex justify-between items-center">
            <div id="time"><span>Time:</span> {{ formattedTime }}</div>
            <button v-if="isGameRunning" id="stop" class="btn1" @click="stopGame">Stop Game</button>
            <div id="moves-count"><span>Moves:</span> {{ movesCount }}</div>
          </div>
          <div v-if="isGameRunning" class="game-container grid-cols-4 grid-rows-4">
            
            <MemoryCard
              v-for="(card, index) in cards"
              :cardData="card"          
              :key="index"
              :imageSrc="'/memoryCards/' + card.image" 
              :modelSrc="'/memoryCards/' + card.image" 
              :cardName="card.name"
              :onCardClick="handleCardClick"
            />
            
          </div>
    
          
          <div v-if="!isGameRunning" class="controls-container">
            <p v-if="resultMessage" id="result">{{ resultMessage }}</p>
            <p v-if="resultMessage" class="mt-4">It took you <span>{{ formattedTime }}</span> minutes and <span>{{ movesCount }}</span> moves</p>
            <ThreeCubeStatic></ThreeCubeStatic>
            <button id="start" class="btn1" @click="startGame">Start Game</button>
          </div>
        </div>
    </VueSection>
  </template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import MemoryCard from '../components/memory/MemoryCard.vue';
import { useMemoryStore } from '../stores/useMemoryStore';
import ThreeCubeStatic from '~/components/memory/threeCubeStatic.vue';

const {
  cards,
  movesCount,
  formattedTime,
  isGameRunning,
  resultMessage,
  startGame,
  stopGame,
  handleCardClick,
} = useMemoryStore();
</script>
