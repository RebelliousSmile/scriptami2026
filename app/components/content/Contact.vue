<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '#ui/types'

const { profile } = useAppConfig()
const { t } = useI18n()

const isResendEnabled = useRuntimeConfig().public.resend

const state = ref({
  email: '',
  message: '',
  phone: '',
  fullname: '',
  project_type: '',
  budget: '',
})

const schema = z.object({
  email: z.string().email('Invalid email'),
  message: z.string().min(10, 'Message is too short'),
  project_type: z.string().min(1, 'Please select a project type'),
  fullname: z.string().min(3, 'Name is too short'),
})
type Schema = z.output<typeof schema>

const projectTypeOptions = computed(() => [
  { label: t('contact.project_types.prestashop'), value: 'prestashop', icon: 'heroicons-shopping-cart' },
  { label: t('contact.project_types.pennylane'), value: 'pennylane', icon: 'heroicons-document-text' },
  { label: t('contact.project_types.website'), value: 'website', icon: 'heroicons-globe-alt' },
  { label: t('contact.project_types.api'), value: 'api', icon: 'heroicons-arrows-right-left' },
  { label: t('contact.project_types.app'), value: 'app', icon: 'heroicons-cpu-chip' },
  { label: t('contact.project_types.other'), value: 'other', icon: 'heroicons-ellipsis-horizontal-circle' },
])

const budgetOptions = computed(() => [
  { label: t('contact.budgets.less_1k'), value: 'less_1k' },
  { label: t('contact.budgets.1k_3k'), value: '1k_3k' },
  { label: t('contact.budgets.3k_10k'), value: '3k_10k' },
  { label: t('contact.budgets.more_10k'), value: 'more_10k' },
  { label: t('contact.budgets.unknown'), value: 'unknown' },
])

const loading = ref(false)

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true
  try {
    await $fetch('/api/emails/send', {
      method: 'POST',
      body: event.data,
    })
    state.value = {
      email: '',
      message: '',
      phone: '',
      fullname: '',
      project_type: '',
      budget: '',
    }
    toast.success(t('contact.success'))
  }
  catch {
    toast.error(t('contact.error'))
  }
  loading.value = false
}
</script>

<template>
  <section class="mx-auto mt-4 flex max-w-4xl flex-col p-7 sm:mt-20">
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
    <div class="flex flex-col sm:items-center sm:justify-between">
      <UForm
        :state
        :schema
        class="flex w-full max-w-[40rem] flex-col gap-5"
        @submit="onSubmit"
      >
        <!-- Type de projet -->
        <UFormField
          :label="$t('contact.project_type')"
          name="project_type"
          required
        >
          <div class="mt-1 grid grid-cols-3 gap-2">
            <button
              v-for="option in projectTypeOptions"
              :key="option.value"
              type="button"
              class="flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2.5 text-sm transition-all duration-200"
              :class="state.project_type === option.value
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-neutral-700 bg-neutral-900 text-neutral-300 hover:border-neutral-500 hover:text-white'"
              @click="state.project_type = option.value"
            >
              <UIcon
                :name="option.icon"
                class="size-4 shrink-0"
              />
              <span class="text-left leading-tight">{{ option.label }}</span>
            </button>
          </div>
        </UFormField>

        <!-- Budget -->
        <UFormField
          :label="$t('contact.budget')"
          name="budget"
        >
          <div class="mt-1 grid grid-cols-5 gap-2">
            <button
              v-for="option in budgetOptions"
              :key="option.value"
              type="button"
              class="cursor-pointer rounded-full border px-2 py-1.5 text-center text-sm transition-all duration-200"
              :class="state.budget === option.value
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-neutral-700 bg-neutral-900 text-neutral-300 hover:border-neutral-500 hover:text-white'"
              @click="state.budget = state.budget === option.value ? '' : option.value"
            >
              {{ option.label }}
            </button>
          </div>
        </UFormField>

        <UFormField
          :label="$t('contact.fullname')"
          name="fullname"
          required
        >
          <UInput
            v-model="state.fullname"
            type="text"
            autocomplete="name"
            class="w-full"
            placeholder="Jean Dupont"
          />
        </UFormField>

        <UFormField
          :label="$t('contact.email')"
          name="email"
          required
        >
          <UInput
            v-model="state.email"
            autocomplete="email"
            class="w-full"
            placeholder="jean.dupont@entreprise.fr"
          />
        </UFormField>

        <UFormField
          :label="$t('contact.phone')"
          name="phone"
        >
          <UInput
            v-model="state.phone"
            autocomplete="tel"
            class="w-full"
            placeholder="06 00 00 00 00"
          />
        </UFormField>

        <UFormField
          :label="$t('contact.message')"
          name="message"
          required
        >
          <UTextarea
            v-model="state.message"
            autoresize
            class="w-full"
            :rows="5"
            :placeholder="$t('contact.message_placeholder')"
          />
        </UFormField>

        <div class="flex justify-center">
          <UTooltip
            :disabled="isResendEnabled"
            :text="$t('contact.disabled')"
          >
            <UButton
              :loading
              :disabled="!isResendEnabled"
              type="submit"
              block
            >
              {{ $t("contact.submit") }}
            </UButton>
          </UTooltip>
        </div>
      </UForm>
      <Divider class="my-10" />
      <div class="flex w-full flex-col items-center justify-between gap-4 sm:flex-row">
        <div class="flex flex-col gap-3">
          <dd class="flex items-center gap-3 text-neutral-400">
            <UIcon
              name="heroicons-phone"
              class="size-6"
              aria-hidden="true"
            />
            <span>
              {{ profile.phone }}
            </span>
          </dd>
          <dd class="flex items-center gap-3 text-neutral-400">
            <UIcon
              name="heroicons-envelope"
              class="size-6"
              aria-hidden="true"
            />
            <UTooltip
              :text="$t('global.email')"
              :shortcuts="['⌘', 'O']"
            >
              <NuxtLink
                :to="`mailto:${profile.email}`"
                class="cursor-pointer transition-colors duration-300"
              >
                {{ profile.email }}
              </NuxtLink>
            </UTooltip>
          </dd>
        </div>
        <div>
          <MeetingButton />
        </div>
      </div>
    </div>
  </section>
</template>
