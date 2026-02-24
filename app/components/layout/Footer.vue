<template>
  <div class="mt-6 pb-20">
    <Divider />
    <footer class="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-6">
      <span class="text-center text-sm text-muted">
        © 2026 <ULink to="https://fxguillois.email" target="_blank">François-Xavier Guillois</ULink> — Nom de marque Scriptami — {{ $t("global.all_rights_reserved") }}
      </span>
      <NuxtLinkLocale
        to="/mentions-legales"
        class="text-xs text-muted hover:text-primary transition-colors duration-200"
      >
        {{ $t("global.legal_notice") }}
      </NuxtLinkLocale>
    </footer>
  </div>
</template>
