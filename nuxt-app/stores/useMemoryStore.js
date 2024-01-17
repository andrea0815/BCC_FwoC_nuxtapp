import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

const items = [
    { name: "01", image: "01.glb" },
    { name: "02", image: "02.glb" },
    { name: "03", image: "03.glb" },
    { name: "04", image: "04.glb" },
    { name: "05", image: "05.glb" },
    { name: "06", image: "06.glb" },
    { name: "07", image: "07.glb" },
    { name: "09", image: "09.glb" },
];

export function useMemoryStore() {
    const cards = ref([]);
    const movesCount = ref(0);
    const seconds = ref(0);
    const minutes = ref(0);
    const isGameRunning = ref(false);
    const resultMessage = ref('');

    let firstCard = null;
    let secondCard = null;
    let winCount = 0;
    let interval = null;

    const formattedTime = computed(() => {
        const secondsValue = seconds.value < 10 ? `0${seconds.value}` : seconds.value;
        const minutesValue = minutes.value < 10 ? `0${minutes.value}` : minutes.value;
        return `${minutesValue}:${secondsValue}`;
    });

    function timeGenerator() {
        seconds.value += 1;
        if (seconds.value >= 60) {
            minutes.value += 1;
            seconds.value = 0;
        }
    }

    function startGame() {
        isGameRunning.value = true;
        initializeCards();
        interval = setInterval(timeGenerator, 1000);
    }

    function stopGame() {
        isGameRunning.value = false;
        clearInterval(interval);
    }

    function handleCardClick(card) {
        if (!isGameRunning.value || card.matched) {
            return;
          }

          if (firstCard && secondCard) {
            return;
          }

            card.flipped = !card.flipped;

            if (!firstCard) {
              firstCard = card;
         
          } else if (firstCard && !secondCard) {
              movesCount.value++;
              secondCard = card;
 
              
              if (firstCard.name === secondCard.name) {
                firstCard.matched = true;
                secondCard.matched = true;
              
                firstCard = null;
                secondCard = null;
                winCount++;
          
                if (winCount === cards.value.length / 2) {
                  resultMessage.value = 'You Won!';
                  stopGame();
                }
              } else {
                setTimeout(() => {
                  firstCard.flipped = false;
                  secondCard.flipped = false;
  
                  firstCard = null;
                  secondCard = null;
  
                }, 1500);
  
              }
            }
    }

    function initializeCards() {
        movesCount.value = 0;
        seconds.value = 0;
        minutes.value = 0;
        winCount = 0;
        resultMessage.value = '';
      
        const tempArray = [...items];
        let cardValues = [];
      
        const size = 4; // 4x4 matrix
        const totalPairs = (size * size) / 2; // 8 paris
      
        for (let i = 0; i < totalPairs; i++) {
          const randomIndex = Math.floor(Math.random() * tempArray.length);
          const card = { ...tempArray[randomIndex], flipped: false, matched: false };
          // Clone the card object to create a pair, so they are not referencing the same object.
          const pairCard = { ...card };
          cardValues.push(card, pairCard);
          tempArray.splice(randomIndex, 1);
        }
      
        cardValues.sort(() => Math.random() - 0.5);
      
        cards.value = cardValues;
        console.log(cards);
      }

    return {
        cards,
        movesCount,
        formattedTime,
        isGameRunning,
        resultMessage,
        startGame,
        stopGame,
        handleCardClick,
    };
}