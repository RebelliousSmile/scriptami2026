<script setup lang="ts">
const props = defineProps<{
  project: {
    name: string
    release: string
    image: string
    link: string
    description?: string
    stack?: string[]
    theme?: string
  }
}>()

const showDescription = ref(false)

const hasValidLink = computed(() => props.project.link && props.project.link !== '#' && props.project.link !== '/')
</script>

<template>
  <div
    class="group relative flex flex-col gap-1 rounded-lg border border-white/10 bg-zinc-900/80 p-1 shadow-2xl shadow-zinc-950/50 backdrop-blur-sm"
  >
    <div class="flex gap-1 px-1 py-[2px]">
      <div class="size-2 rounded-full bg-red-500/90 transition-all duration-300 group-hover:bg-red-500/90 sm:bg-white/10" />
      <div class="size-2 rounded-full bg-yellow-500/90 transition-all duration-300 group-hover:bg-yellow-500/90 sm:bg-white/10" />
      <div class="size-2 rounded-full bg-green-500/90 transition-all duration-300 group-hover:bg-green-500/90 sm:bg-white/10" />
    </div>
    <div class="relative flex h-56 justify-center overflow-hidden rounded-lg">
      <NuxtLink
        v-if="hasValidLink"
        :to="project.link"
        target="_blank"
        :aria-label="project.name + ' project link'"
        class="h-full w-full"
      >
        <NuxtImg
          width="1536"
          :alt="project.name + ' project image'"
          class="h-full w-full rounded-lg object-cover transition-all duration-300 hover:scale-105"
          :src="project.image"
        />
      </NuxtLink>
      <NuxtImg
        v-else
        width="1536"
        :alt="project.name + ' project image'"
        class="h-full w-full rounded-lg object-cover"
        :src="project.image"
      />
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        leave-active-class="transition-all duration-200 ease-in"
        enter-from-class="translate-y-full opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-from-class="translate-y-0 opacity-100"
        leave-to-class="translate-y-full opacity-0"
      >
        <div
          v-if="showDescription && project.description"
          class="absolute inset-0 flex items-center justify-center rounded-lg bg-black/80 px-6 pb-10 pt-4"
        >
          <div class="flex flex-col items-center gap-3">
            <p class="text-center text-sm leading-relaxed text-white/90">
              {{ project.description }}
            </p>
            <div
              v-if="project.stack?.length"
              class="flex flex-wrap justify-center gap-1.5"
            >
              <span
                v-for="tech in project.stack"
                :key="tech"
                class="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-white/70"
              >
                {{ tech }}
              </span>
            </div>
          </div>
        </div>
      </Transition>
    </div>
    <div class="absolute bottom-0 flex w-full justify-center">
      <div
        class="rounded-t-lg border-x border-t border-b-transparent px-4 py-[5px] shadow-md backdrop-blur-md sm:w-2/3"
        :class="project.theme === 'light' ? 'border-black/10' : 'border-white/10'"
      >
        <div class="flex items-center justify-between gap-2">
          <span
            class="whitespace-nowrap text-sm font-semibold"
            :class="project.theme === 'light' ? 'text-zinc-900' : 'text-white/90'"
          >
            {{ project.name }}
          </span>
          <button
            v-if="project.description"
            type="button"
            :aria-label="'Toggle ' + project.name + ' description'"
            class="flex items-center justify-center rounded-full border border-transparent p-1 shadow-md backdrop-blur-md transition-all duration-300"
            :class="[
              showDescription ? 'rotate-0 border-white/20 bg-white/10' : '',
              project.theme === 'light' ? 'hover:border-black/10' : 'hover:border-white/10',
            ]"
            @click="showDescription = !showDescription"
          >
            <UIcon
              name="heroicons:information-circle"
              class="size-4"
              :class="project.theme === 'light' && !showDescription ? 'text-zinc-900' : 'text-white'"
            />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
