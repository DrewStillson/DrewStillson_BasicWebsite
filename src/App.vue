<template>
  <div class = "app">
    <AppHeader />

    <main class = "container">
      <router-view />
    </main>
  </div>
</template>

<style>
:root {
  font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
}

.app {
  min-height: 100vh;
  background: black;
  color: white;
}

.container {
  max-width: 980px;
  margin: 0 auto;
  padding: 24px;
}

a {color: inherit;}
</style>
