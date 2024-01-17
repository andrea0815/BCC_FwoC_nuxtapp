import { defineStore } from 'pinia';

export const useGuesserStore = defineStore('guesser', () => {

// website for DeckId https://deckofcardsapi.com/

const deckId = ref();
const newDeckAPI = computed(() => {
    return `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`;
});
const chosenColor = ref();
const score = ref(0);
const card = ref();
const deckCount = ref(0);
const drawCardAPI = computed(() => {
    return `https://deckofcardsapi.com/api/deck/${deckId.value}/draw/?count=2`;
})

async function drawCard() {
    const { cards, remaining } = await fetch(drawCardAPI.value)
        .then((res) => res.json());
    card.value = cards[0];
    deckCount.value = remaining;

    // console.log(card.value);
    evaluateGuess(card.value);
}

async function createNewDeck() {

    const { deck_id, remaining } = await fetch(newDeckAPI.value)
        .then((res) => res.json());
    deckId.value = deck_id;
    deckCount.value = remaining;

    return 
}

onMounted(() => {
    if (deckCount === 0) {
        createNewDeck();
    }
})

function evaluateGuess({ suit }) {
    // HEARTS, DIAMOND => red
    // CLUB, SPADE => black

    if (chosenColor.value === 'red') {
        if (suit === 'HEARTS' || suit === 'DIAMONDS') {
            return score.value++;
        }
    }

    if (chosenColor.value === "black" && (suit === 'CLUBS' || suit === 'SPADES')) {
        return score.value++;
    }
}

    return {
        score,
        deckId,
        deckCount,
        chosenColor,
        newDeckAPI,
        card,
        drawCardAPI,
        drawCard,
        createNewDeck,
        evaluateGuess
    };
});