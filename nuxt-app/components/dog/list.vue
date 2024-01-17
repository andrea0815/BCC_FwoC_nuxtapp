<template>
    <ul class="list-none">
    <DogBreed v-for="dog in dogs" class="btn1 my-6">  
        <NuxtLink :to="`/dogs/${dog.id}`">
            {{ dog.attributes.name }}
        </NuxtLink>
    </DogBreed>
</ul>
</template>

<script setup>
    defineProps(['dogs']);
</script>