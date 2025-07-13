<template>
  <div class="flex min-h-screen bg-gray-50 text-gray-900">
    <aside class="w-64 bg-gray-800 text-white border-r border-gray-700 shadow-lg p-6 flex flex-col">
      <h2 class="text-2xl font-semibold tracking-wide mb-12">Painel</h2>

      <nav class="flex flex-col gap-2 pt-5">
        <RouterLink
          to="/clientes"
          class="flex items-center gap-3 px-4 py-2 rounded-md transition-colors duration-200 hover:bg-gray-700"
          :class="{ 'bg-gray-700 font-semibold': $route.path === '/clientes' }"
        >
          <User class="w-5 h-5" />
          <span>Clientes</span>
        </RouterLink>
      </nav>
    </aside>

    <main class="flex-1 p-6 overflow-y-auto">
      <router-view />
    </main>
  </div>
</template>
<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { User } from 'lucide-vue-next'
</script>
