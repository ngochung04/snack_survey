<template>
  <div class="relative">
    <img
      v-if="rank !== null && rank !== undefined"
      :src="RANK_ICON[rank]"
      class="absolute -top-3 -left-3 w-12 h-12 z-20 drop-shadow-[1px_1px_0_rgba(28,25,23,0.6)] pointer-events-none"
    />
    <div
      class="border-[2px] border-ink rounded-xl bg-surface shadow-neo flex flex-col h-full overflow-hidden hover:translate-x-[1px] hover:translate-y-[1px] transition-[transform,box-shadow] duration-75"
    >
      <div class="w-full h-[150px]">
        <img :src="option?.thumbnail || DEFAULT_CARD_IMG" class="w-full h-full object-cover" />
      </div>
      <div class="flex flex-col flex-1 p-4">
      <p class="font-sans text-base font-bold text-ink truncate">{{ option?.title ?? '' }}</p>
      <a :href="option?.link" target="_blank" class="block text-sm text-muted truncate mt-0.5 hover:text-terracotta hover:underline">{{ option?.link }}</a>
      <div class="flex items-center justify-between mt-auto pt-3">
        <div class="flex -space-x-2">
          <UiAvatar
            v-for="user in option?.voteBy?.slice(0, 3)"
            :key="user.username"
            :src="user.avatar"
            :fallback="user.username"
            size="sm"
            class="!w-7 !h-7 border-[2px] border-ink rounded-full ring-2 ring-surface"
          />
          <div
            v-if="option?.voteBy?.length > 3"
            class="w-7 h-7 rounded-full border-2 border-ink bg-retro-blue font-mono font-bold text-[9px] flex items-center justify-center cursor-pointer"
            :title="`${option?.voteBy?.length - 3} others`"
            @click.stop="onClickSeeMore(option)"
          >
            +{{ option?.voteBy?.length - 3 }}
          </div>
        </div>
        <i
          class="mdi mdi-thumb-up text-2xl cursor-pointer transition-transform duration-75 hover:scale-110 active:scale-90"
          :class="option.voteBy.some((voter) => voter.id === currentAccount?.id) ? 'text-terracotta' : 'text-retro-blue'"
          @click.prevent="handleChangeVote(index)"
        />
      </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IOption } from '@/core/interfaces/model/option'
import type { IUser } from '@/core/interfaces/model/user'
import { DEFAULT_CARD_IMG, RANK_ICON } from '@/core/constants/app'
import { UiAvatar } from '@/components/ui'

defineProps<{
  index: number
  option: IOption
  currentAccount: IUser | null
  rank?: number | null
}>()

const emits = defineEmits<{
  (e: 'handleChangeVote', index: number): void
  (e: 'onClickSeeMore', payload: IOption): void
}>()

const handleChangeVote = (index: number) => emits('handleChangeVote', index)
const onClickSeeMore = (payload: IOption) => emits('onClickSeeMore', payload)
</script>
