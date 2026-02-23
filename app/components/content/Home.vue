<template>
  <section class="relative pt-12">
    <!-- grid -->
    <div class="pointer-events-none absolute inset-0 bg-center bg-grid-white/10 bg-grid-16 [mask-image:radial-gradient(white,transparent_85%)]" />

    <div class="relative mx-auto flex max-w-7xl flex-col justify-center gap-4 px-4 py-8 sm:px-6 lg:px-8 lg:py-16">
      <!-- spotlight -->
      <div
        class="absolute -top-8 left-1/2 size-72 -translate-x-1/2 rounded-full bg-white/25 blur-[120px] lg:-top-8 lg:size-[32rem] lg:blur-[200px]"
      />

      <div class="z-20 flex flex-col items-center justify-center">
        <!-- definition -->
        <p
          class="font-mono text-xs text-white/30 text-center max-w-lg mb-3"
          style="--stagger: 1; --delay: 0ms"
          data-animate
        >
          <slot
            name="definition"
            mdc-unwrap="p"
          />
        </p>

        <!-- title -->
        <div
          class="font-geist"
          style="--stagger: 2; --delay: 10ms"
          data-animate
        >
          <h1 class="mx-auto font-medium text-center text-pretty bg-gradient-to-b from-white/90 to-white/30 bg-clip-text text-3xl text-transparent lg:max-w-3xl lg:text-4xl">
            <slot
              name="hero_title"
              mdc-unwrap="p"
            />
          </h1>
        </div>

        <SettingsAvailability
          background
          class="mt-2"
          style="--stagger: 3"
          data-animate
        />

        <!-- social -->
        <HomeSocial
          style="--stagger: 4"
          data-animate
        />

        <!-- cta -->
        <HomeCTA
          style="--stagger: 5"
          data-animate
        />

        <!-- services -->
        <div
          style="--stagger: 6"
          data-animate
          class="mt-12 flex w-full max-w-3xl flex-col gap-6 lg:mt-16"
        >
          <slot name="services" />
        </div>

        <Divider class="my-9" />

        <!-- projects -->
        <div
          style="--stagger: 7"
          data-animate
          class="flex w-full max-w-3xl flex-col gap-4"
        >
          <HomeProjects />
        </div>

        <Divider class="my-9" />

        <HomeFaq
          style="--stagger: 8"
          data-animate
        />
      </div>
    </div>
  </section>
</template>
