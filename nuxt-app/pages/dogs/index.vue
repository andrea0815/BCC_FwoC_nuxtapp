<template>
    <VueSection>
        
        <H1 class="hl">Dogs</H1>
        <DogList :dogs="breeds"/>
        
    </VueSection>
</template>

<script setup>
// import { onMounted } from 'vue';
const dogsAPI = 'https://dogapi.dog/api/v2/breeds';

const { data: result } = useFetch(dogsAPI);

const breeds = computed(() => {
    if (result.value) return result.value.data;
    return [];
});

</script>