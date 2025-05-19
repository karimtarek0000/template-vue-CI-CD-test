<template>
  <div>
    <button @click="dangerousEval">Run Dangerous Eval</button>
    <button @click="dangerousInnerHTML">Set Dangerous HTML</button>
    <div ref="dangerDiv"></div>
  </div>
</template>

<script setup>
  import { ref } from 'vue';

  // Danger 1: Using eval (should be detected by CodeQL)
  function dangerousEval() {
    const code = "alert('Dangerous eval executed!')";

    eval(code);
  }

  // Danger 2: Setting innerHTML directly (should be detected by CodeQL)
  const dangerDiv = ref(null);
  function dangerousInnerHTML() {
    if (dangerDiv.value) {
      dangerDiv.value.innerHTML = "<img src='x' onerror='alert(\"XSS Attack!\")' />";
    }
  }
</script>
