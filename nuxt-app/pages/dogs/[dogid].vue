<template>
    <VueSection>
        
        <h1 class="hl">Dog Details</h1>
    
        
        <div v-if="pending">loading ... </div>
        <div v-else class="max-w-3xl flex flex-col items-center">
            <h2> {{ da.name  }} </h2>
            <p> {{ da.description  }} </p>
        </div>

        <NuxtLink to="/dogs" class="btn1 my-8">back to dogs</NuxtLink>


    </VueSection>
</template>

<script setup>
// How do I get the ID?
const route = useRoute();

// import { onMounted } from 'vue';
const dogAPI = `https://dogapi.dog/api/v2/breeds/${route.params.dogid}`;

const { pending, data: details } = useFetch(dogAPI);

// return dog attributes
const da = computed(() => {
    if (details.value) return details.value.data.attributes;
})

</script>