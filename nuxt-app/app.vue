<template>
  <div id="app">
    <header class="flex flex-row justify-between w-screen">
      <p class="title">FWoC SS23 – cc221017</p>
      <nav>
        <NuxtLink to="/">Home</NuxtLink>
        <NuxtLink to="/soundboard">Soundboard</NuxtLink>
        <NuxtLink to="/dogs/">Dogs</NuxtLink>
        <NuxtLink to="/guesser">Guesser</NuxtLink>
        <NuxtLink to="/memory">Memory</NuxtLink>
      </nav>
    </header>

    <NuxtPage/>

  </div>
</template>