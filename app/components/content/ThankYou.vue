<template>
  <section class="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center gap-6 p-7 text-center">
    <div class="flex size-16 items-center justify-center rounded-full bg-primary/10">
      <UIcon name="heroicons-check-circle" class="size-9 text-primary" />
    </div>
    <h1 class="font-newsreader italic text-white-shadow text-4xl">
      <slot name="title" mdc-unwrap="p" />
    </h1>
    <p class="text-lg font-extralight text-muted">
      <slot name="subtitle" mdc-unwrap="p" />
    </p>
    <div class="mt-4 flex flex-col items-center gap-3 sm:flex-row">
      <UButton as="NuxtLinkLocale" to="/" variant="outline" icon="heroicons-home">
        <slot name="back" mdc-unwrap="p" />
      </UButton>
      <MeetingButton />
    </div>
  </section>
</template>
