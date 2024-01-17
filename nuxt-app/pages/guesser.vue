<template>

    <VueSection>
        <h1 class="hl">The Guesser Game</h1>

<!-- Keep track of deck id -->
<h3>Your current DeckID: {{ state.deckId }}</h3>
<p>{{ state.deckCount }} cards left</p>
<button @click="state.createNewDeck" class="btn1 my-4">Grab new deck</button>

<!-- Buttons to pick a color  -->

<div class="gameArea">

    <h2>State {{ state.score }} Points</h2>

    <div id="btnBox" class="my-4">
    <button class="btn1 mx-4" @click="() => state.chosenColor = 'red'">Pick red</button>
    <button class="btn1 mx-4" @click="() => state.chosenColor = 'black'">Pick black</button>
</div>


<div>Current Pick: {{ state.chosenColor }}</div>

<!-- Show the score -->

<div id='imgBox'>
    <!-- Show the drawn card -->
    <img  v-if="state.card" :src="state.card.image" :alt="state.card.code">
</div>

<button class="btn1 mx-4" @click="state.drawCard" v-if="state.chosenColor">draw card</button>

</div>

    </VueSection>

   
    
</template>

<script setup>

import { ref, computed } from 'vue'
import { useGuesserStore } from '~/stores/useGuesserStore';
const state = useGuesserStore();

</script>