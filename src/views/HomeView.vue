<script setup lang="ts"></script>

<template>
  <main
    class="container animate-fade-in-up flex flex-col-reverse sm:flex-row gap-4 justify-center items-center my-[100px]"
  >
    <div class="flex-1">
      <h1 class="font-bold text-[38px]">
        Transforme suas ideias em ação:<br />
        Crie seu Business Model Canvas online em minutos!
      </h1>

      <p class="mt-3 mb-6">
        Nosso sistema facilita a criação do seu Business Model Canvas, permitindo que você foque no
        que realmente importa: transformar sua ideia em um negócio sólido e escalável.
      </p>

      <RouterLink to="/business-model-canvas" class="button"
        >Criar Meu Business Model Canvas</RouterLink
      >
    </div>

    <div class="max-w-[400px]">
      <img alt="TO DO" src="@/assets/undraw_to_do_re_jaef.svg" />
    </div>
  </main>
</template>
