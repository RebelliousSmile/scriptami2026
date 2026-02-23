<script setup lang="ts">
const stack = await queryCollection('stack').first()
</script>

<template>
  <section class="mx-auto mt-4 flex max-w-4xl flex-col p-7 sm:mt-20 text-[var(--ui-text-toned)]">
    <h1 class="font-newsreader italic text-white-shadow text-center text-4xl">
      <slot
        name="title"
        mdc-unwrap="p"
      />
    </h1>
    <h2 class="text-center text-lg font-extralight italic text-muted">
      <slot
        name="subtitle"
        mdc-unwrap="p"
      />
    </h2>
    <Divider class="mb-8 mt-2" />
    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <AboutProfilePicture />
      <div class="flex flex-col gap-3 sm:ml-4">
        <h3 class="text-lg">
          En quelques mots&hellip;
        </h3>
        <div class="flex flex-col gap-4 text-primary [&>p]:my-0">
          <slot
            name="intro"
          />
        </div>
      </div>
    </div>
    <div class="flex justify-end -mt-20">
      <img src="/logos/picto-scriptami.svg" class="h-36 w-auto pointer-events-none select-none" style="filter: grayscale(1) drop-shadow(0 0 1px rgba(255,255,255,1)) drop-shadow(0 0 4px rgba(255,255,255,0.95)) drop-shadow(0 0 10px rgba(255,255,255,0.8)) drop-shadow(0 0 25px rgba(255,255,255,0.5)) drop-shadow(0 0 50px rgba(255,255,255,0.25)); opacity: 0.8;" alt="" aria-hidden="true" />
    </div>
    <Divider class="my-8" />
    <slot
      name="experiences"
      mdc-unwrap="p"
    />
    <div class="mt-14 flex justify-center">
      <UButton
        as="a"
        href="/fxg-cvdevweb-latest.pdf"
        download
        target="_blank"
        icon="lucide:download"
        variant="outline"
        size="sm"
      >
        {{ $t("global.cv") }}
      </UButton>
    </div>
    <Divider class="my-8" />
    <div class="flex flex-col gap-3">
      <div class="mb-6 flex flex-col gap-1">
        <h3 class="text-white-shadow font-newsreader italic text-3xl">
          <slot
            name="stack_title"
            mdc-unwrap="p"
          />
        </h3>
        <p>
          <slot
            name="stack_description"
            mdc-unwrap="p"
          />
        </p>
      </div>
      <div class="flex flex-wrap gap-4">
        <SpotlightCard
          v-for="item in stack!.items"
          :key="item.name"
          white
        >
          <NuxtLink
            :to="item.link"
            target="_blank"
            :aria-label="item.name + ' link'"
            class="flex gap-2 p-6"
          >
            <UIcon
              :name="item.icon"
              class="size-9"
              :font-controlled="false"
              :alt="item.name + ' logo'"
              :aria-label="item.name + ' logo'"
            />
          </NuxtLink>
        </SpotlightCard>
      </div>
    </div>
  </section>
</template>
