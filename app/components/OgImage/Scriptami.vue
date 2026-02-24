<script setup lang="ts">
defineProps<{
  title?: string
  description?: string
}>()
</script>

<template>
  <div
    class="h-full w-full flex flex-col justify-between"
    :style="{ background: '#09090b', fontFamily: 'Inter, sans-serif' }"
  >
    <!-- Accent bar top -->
    <div
      class="w-full"
      :style="{ height: '6px', background: 'linear-gradient(to right, #10b981, #059669)' }"
    />

    <!-- Main content -->
    <div class="flex flex-col flex-1 justify-center px-20 py-12">
      <!-- Brand -->
      <div class="flex items-center mb-10">
        <span :style="{ fontSize: '22px', fontWeight: '600', color: '#10b981', letterSpacing: '-0.5px' }">
          Scriptami
        </span>
        <span :style="{ fontSize: '22px', color: '#52525b', marginLeft: '12px' }">
          · François-Xavier Guillois
        </span>
      </div>

      <!-- Title -->
      <h1
        :style="{
          fontSize: '64px',
          fontWeight: '700',
          color: '#fafafa',
          lineHeight: '1.1',
          margin: '0 0 20px 0',
          display: 'block',
        }"
      >
        {{ title || 'Scriptami' }}
      </h1>

      <!-- Description -->
      <p
        v-if="description"
        :style="{
          fontSize: '26px',
          color: '#a1a1aa',
          margin: '0',
          lineHeight: '1.4',
          display: 'block',
        }"
      >
        {{ description }}
      </p>
    </div>

    <!-- Footer -->
    <div
      class="flex items-center justify-between px-20 py-8"
      :style="{ borderTop: '1px solid #27272a' }"
    >
      <span :style="{ fontSize: '20px', color: '#52525b' }">
        Développeur web indépendant · Rumilly, Haute-Savoie
      </span>
      <span :style="{ fontSize: '20px', color: '#10b981', fontWeight: '500' }">
        scriptami.com
      </span>
    </div>
  </div>
</template>
