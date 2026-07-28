<template>
  <div class="min-h-screen flex items-center justify-center px-6" v-if="show">
    <div class="w-full max-w-md">
      <div class="text-center mb-8">
        <h1 class="font-serif font-black text-4xl text-ink">Snack Survey</h1>
        <p class="font-sans text-sm text-muted mt-1">Đăng nhập để tiếp tục</p>
      </div>
      <div class="bg-surface border-[2px] border-ink rounded-2xl shadow-neo-md p-6 flex flex-col gap-5">
        <div v-if="mode === 'register'" class="relative">
          <label class="block font-mono font-black text-[11px] uppercase tracking-[.1em] text-ink mb-1.5">Tên người dùng</label>
          <input
            v-model="username"
            placeholder="Nguyễn Văn A"
            class="w-full font-sans text-base text-ink bg-surface border-[2px] border-ink rounded-xl px-4 py-3 outline-none transition-shadow duration-100 placeholder:text-subtle shadow-neo focus:shadow-neo-md"
            :class="errorClass"
            @focus="suggestionsOpen = true"
            @keyup.enter="submit"
          />
          <div
            v-if="suggestionsOpen && suggestedAccounts.length"
            class="absolute z-20 mt-1 w-full bg-surface border-[2px] border-ink rounded-xl shadow-neo max-h-48 overflow-y-auto"
          >
            <div
              v-for="acct in suggestedAccounts"
              :key="acct.id"
              class="flex items-center gap-3 px-3 py-2.5 cursor-pointer hover:bg-cream transition-colors duration-75 border-b border-ink/10 last:border-b-0"
              @click="pickSuggestion(acct)"
            >
              <UiAvatar :src="acct.avatar" :fallback="acct.username" size="sm" />
              <div class="flex-1 min-w-0">
                <span class="font-sans text-sm font-bold text-ink block truncate">{{ acct.username }}</span>
                <span v-if="acct.email" class="font-mono text-[10px] text-muted truncate block">{{ acct.email }}</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <label class="block font-mono font-black text-[11px] uppercase tracking-[.1em] text-ink mb-1.5">Email</label>
          <input
            v-model="email"
            type="email"
            placeholder="your@email.com"
            class="w-full font-sans text-base text-ink bg-surface border-[2px] border-ink rounded-xl px-4 py-3 outline-none transition-shadow duration-100 placeholder:text-subtle shadow-neo focus:shadow-neo-md"
            :class="errorClass"
            @keyup.enter="submit"
          />
        </div>
        <div>
          <label class="block font-mono font-black text-[11px] uppercase tracking-[.1em] text-ink mb-1.5">Mật khẩu</label>
          <input
            v-model="password"
            type="password"
            placeholder="••••••••"
            class="w-full font-sans text-base text-ink bg-surface border-[2px] border-ink rounded-xl px-4 py-3 outline-none transition-shadow duration-100 placeholder:text-subtle shadow-neo focus:shadow-neo-md"
            :class="errorClass"
            @keyup.enter="submit"
          />
        </div>
        <div v-if="error && message" class="font-mono text-[10px] font-semibold text-terracotta -mt-2 ml-1">
          {{ message }}
        </div>
        <UiButton variant="primary" size="lg" block :disabled="loading" @click="submit">
          {{ loading ? 'Đang xử lý...' : mode === 'login' ? 'Đăng nhập' : 'Đăng ký' }}
        </UiButton>
        <p class="font-sans text-sm text-center text-muted">
          {{ mode === 'login' ? 'Chưa có tài khoản?' : 'Đã có tài khoản?' }}
          <button class="font-bold text-ink underline hover:text-terracotta transition-colors ml-1" @click="toggleMode">{{ mode === 'login' ? 'Đăng ký' : 'Đăng nhập' }}</button>
        </p>
      </div>
    </div>
  </div>

  <div class="min-h-screen flex flex-col px-6 py-8" v-if="!show">
    <div class="w-full max-w-4xl mx-auto">
      <div class="flex justify-between items-center mb-8">
        <h1 class="font-serif font-black text-3xl text-ink">Snack Survey</h1>
        <div class="flex items-center gap-4">
          <span class="font-sans text-lg font-bold text-ink">{{ accountInfo.username }}</span>
          <UiButton variant="danger" size="sm" shape="rounded" @click="logout">Đăng xuất</UiButton>
        </div>
      </div>

      <div class="bg-cream border-[2px] border-ink rounded-2xl shadow-neo-md p-5 flex flex-col gap-4 mb-6">
        <div class="flex items-end gap-2">
          <div class="flex-1">
            <UiInput
              v-model="searchTerm"
              label="Tìm topic"
              compact
              placeholder="Tìm topic..."
            />
          </div>
          <UiButton variant="secondary" size="icon" shape="rounded" @click="debouncedSearch">
            <i class="mdi mdi-magnify"></i>
          </UiButton>
        </div>
      </div>

      <div
        v-if="searchedTopics && searchedTopics.length"
        class="flex flex-col gap-4"
      >
        <div v-for="topic in searchedTopics" :key="topic.id">
          <UiCard variant="interactive" class="!p-6" :class="isTopicOpen(topic) ? '!border-transparent animate-border-spin !border-[3px]' : ''" @click="goTopicVote(topic.id)">
            <div class="flex items-start gap-4">
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-3 mb-3">
                  <span
                    class="font-mono font-black text-[10px] uppercase tracking-[.08em] border-[2px] border-ink rounded-full px-3 py-1 shrink-0"
                    :class="isTopicOpen(topic) ? 'bg-sage text-white' : 'bg-retro-pink text-ink'"
                  >
                    {{ isTopicOpen(topic) ? 'Mở' : 'Đóng' }}
                  </span>
                  <span class="font-sans text-xl font-bold text-ink">{{ topic.name }}</span>
                </div>
                <div
                  v-if="topicTopOptions[topic.id]?.length"
                  class="flex gap-3 flex-wrap"
                  @click.stop
                >
                  <div
                    v-for="(opt, oi) in topicTopOptions[topic.id]"
                    :key="opt.id"
                    class="flex items-center gap-2 border-[2px] border-ink rounded-xl px-3 py-2 min-w-0 cursor-default max-w-[360px] flex-1"
                    :class="[
                      oi === 0 ? 'bg-retro-yellow/30' : '',
                      oi === 1 ? 'bg-stone-100' : '',
                      oi === 2 ? 'bg-amber-50/60' : ''
                    ]"
                  >
                    <div class="relative shrink-0">
                      <img
                        :src="RANK_ICON[oi]"
                        class="absolute -top-6 -left-5 w-10 h-10 z-10 drop-shadow-[1px_1px_0_rgba(28,25,23,0.6)]"
                      />
                      <img
                        :src="opt.thumbnail || DEFAULT_CARD_IMG"
                        class="w-8 h-8 rounded-lg object-cover border-[2px] border-ink"
                      />
                    </div>
                    <span class="font-sans text-sm font-bold text-ink truncate">{{ opt.title }}</span>
                    <span class="font-mono text-[10px] font-black text-ink border-[2px] border-ink rounded-full px-2.5 py-0.5 shrink-0 ml-1 whitespace-nowrap bg-retro-yellow shadow-neo-sm">{{ opt.voteCount }} vote{{ opt.voteCount > 1 ? 's' : '' }}</span>
                  </div>
                </div>
              </div>
              <span
                v-if="topic.voteBy"
                class="rounded-full border-[2px] border-ink bg-retro-yellow w-9 h-9 flex items-center justify-center font-mono font-black text-sm shrink-0 cursor-pointer mt-0.5"
                :title="`${topic.voteBy.length} người đã vote`"
                @click.stop="onClickAvatar(topic.voteBy)"
              >
                {{ topic.voteBy.length }}
              </span>
            </div>
          </UiCard>
        </div>
      </div>

      <div
        v-else-if="!loading"
        class="bg-surface border-[2px] border-ink rounded-2xl shadow-neo-md p-5"
      >
        <UiAlert type="warning" message="Hiện tại không có topic nào" />
      </div>
    </div>
  </div>

  <UiDialog v-model="dialog" title="Danh sách vote">
    <hr class="border-ink/20 my-3">
    <div class="flex flex-col gap-2 max-h-[300px] overflow-y-auto pr-1">
      <div v-for="user in listVoteBy" :key="user.username" class="flex items-center gap-2 py-1">
        <UiAvatar :src="user.avatar || ''" :fallback="user.username" size="sm" :title="user.username" />
        <span class="font-sans text-sm text-ink ml-1">{{ user.username }}</span>
      </div>
    </div>
  </UiDialog>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive, watch, computed, onBeforeUnmount } from 'vue'
import { getAccounts } from '@/services/account.service'
import { getOpenTopicList, getCloseTopicList } from '@/services/topic.service'
import { debounce } from 'vue-debounce'
import { getAllOptions } from '@/services/option.service'
import { signIn, signUp, signOut as authSignOut } from '@/services/auth.service'
import type { ITopic } from '@/core/interfaces/model/topic'
import type { IOption } from '@/core/interfaces/model/option'
import type { IUser } from '@/core/interfaces/model/user'
import { UiButton, UiCard, UiDialog, UiInput, UiAvatar, UiAlert } from '@/components/ui'
import { DEFAULT_CARD_IMG, RANK_ICON } from '@/core/constants/app'

import useCommon from '@/core/hooks/useCommon'
const { handleRouter } = useCommon('useCommonStore')

const show = ref<boolean>(true)
const topics = ref<ITopic[]>([])
const searchedTopics = ref<ITopic[]>([])
const options = ref<IOption[]>([])
const error = ref<boolean>(false)
const dialog = ref<boolean>(false)
const message = ref<string>('')
const loading = ref(false)
const searchTerm = ref('')
const mode = ref<'login' | 'register'>('login')
const email = ref('')
const password = ref('')
const username = ref('')
const suggestionsOpen = ref(false)
const accountInfo: {
  username?: string
  avatar?: string
  team?: string
} = reactive({ username: '', avatar: '', team: '' })
const listVoteBy = ref<IUser[]>([])

const errorClass = computed(() =>
  error.value && !message.value.includes('Vui lòng')
    ? 'border-terracotta shadow-[2px_2px_0_0_rgba(224,122,95,0.8)]'
    : ''
)

const isTopicOpen = (topic: ITopic) => {
  const deadline = (topic.date as any)?.seconds
    ? new Date((topic.date as any).seconds * 1000)
    : topic.date
  return topic.status === true && deadline && deadline >= new Date()
}

const topicTopOptions = computed(() => {
  const map: Record<string, IOption[]> = {}
  options.value.forEach((opt) => {
    if (!map[opt.topicId]) map[opt.topicId] = []
    map[opt.topicId].push(opt)
  })
  for (const id in map) {
    map[id].sort((a, b) => b.voteCount - a.voteCount)
    map[id] = map[id].slice(0, 3)
  }
  return map
})

const loadTopics = async (team: string | null) => {
  loading.value = true
  try {
    const [openList, closeList] = await Promise.all([
      getOpenTopicList(team),
      getCloseTopicList(team)
    ])
    topics.value = [...openList, ...closeList]
    getTopicOptions()
  } finally {
    loading.value = false
  }
}

const removeDiacritics = (s: string) =>
  s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()

const suggestedAccounts = computed(() => {
  if (!username.value) return []
  const q = removeDiacritics(username.value)
  return getAccounts.value.filter((item: IUser) =>
    item.username && removeDiacritics(item.username).includes(q)
  ).slice(0, 8)
})

const pickSuggestion = (acct: IUser) => {
  username.value = acct.username
  if (acct.email) email.value = acct.email
  suggestionsOpen.value = false
}

const closeSuggestions = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  if (!target.closest('.relative')) {
    suggestionsOpen.value = false
  }
}

const toggleMode = () => {
  mode.value = mode.value === 'login' ? 'register' : 'login'
  error.value = false
  message.value = ''
  suggestionsOpen.value = false
}

const setAccountInfo = (account: IUser) => {
  localStorage.setItem('account_info', account.id)
  localStorage.setItem('account_avatar', account.avatar ?? '')
  localStorage.setItem('account_username', account.username ?? '')
  localStorage.setItem('account_team', account.team ?? '')
  accountInfo.avatar = account.avatar ?? ''
  accountInfo.username = account.username ?? ''
  accountInfo.team = account.team ?? ''
  show.value = false
  loadTopics(account.team ?? '')
}

const submit = async () => {
  if (mode.value === 'register') {
    if (!username.value || !email.value || !password.value) {
      error.value = true
      message.value = 'Vui lòng điền đầy đủ thông tin'
      return
    }
  } else {
    if (!email.value || !password.value) {
      error.value = true
      message.value = 'Vui lòng nhập email và mật khẩu'
      return
    }
  }
  loading.value = true
  error.value = false
  message.value = ''
  try {
    if (mode.value === 'register') {
      const account = await signUp(username.value, email.value, password.value)
      if (!account) {
        error.value = true
        message.value = 'Đăng ký thất bại'
        return
      }
      setAccountInfo(account)
    } else {
      const account = await signIn(email.value, password.value)
      if (!account) {
        error.value = true
        message.value = 'Tài khoản không tồn tại hoặc thông tin không chính xác'
        return
      }
      setAccountInfo(account)
    }
  } catch (e: any) {
    error.value = true
    const code = e?.code
    if (mode.value === 'register') {
      if (code === 'auth/email-already-in-use') {
        message.value = 'Email này đã được đăng ký'
      } else if (code === 'auth/weak-password') {
        message.value = 'Mật khẩu quá yếu (tối thiểu 6 ký tự)'
      } else if (code === 'auth/invalid-email') {
        message.value = 'Email không hợp lệ'
      } else {
        message.value = 'Đăng ký thất bại, vui lòng thử lại'
      }
    } else {
      if (code === 'auth/wrong-password' || code === 'auth/invalid-credential') {
        message.value = 'Sai mật khẩu'
      } else if (code === 'auth/user-not-found') {
        message.value = 'Email không tồn tại trong hệ thống'
      } else if (code === 'auth/invalid-email') {
        message.value = 'Email không hợp lệ'
      } else if (code === 'auth/too-many-requests') {
        message.value = 'Quá nhiều lần thử, vui lòng thử lại sau'
      } else {
        message.value = 'Đăng nhập thất bại, vui lòng thử lại'
      }
    }
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  document.addEventListener('click', closeSuggestions)
  const savedId = localStorage.getItem('account_info')
  if (savedId) {
    show.value = false
    accountInfo.avatar = localStorage.getItem('account_avatar') ?? ''
    accountInfo.username = localStorage.getItem('account_username') ?? ''
    accountInfo.team = localStorage.getItem('account_team') ?? ''
    await loadTopics(localStorage.getItem('account_team'))
  }
})

watch(topics, (newTopics) => {
  searchedTopics.value = newTopics
})

const performSearch = () => {
  searchedTopics.value = topics.value.filter((topic) => topic.name.includes(searchTerm.value))
}
const debouncedSearch = debounce(performSearch, 500)

watch(searchTerm, debouncedSearch)

onBeforeUnmount(() => {
  debouncedSearch.cancel()
  document.removeEventListener('click', closeSuggestions)
})

const getTopicOptions = async () => {
  const topicData = await getAllOptions()
  options.value = topicData
  topics.value.forEach((topic) => {
    const result = options.value.filter((option) => option.topicId === topic.id)
    const map: { [key: string]: IUser } = {}
    const combinedArray = []
    result.forEach((option) => {
      option.voteBy.forEach((obj) => {
        if (!map[obj?.id]) {
          map[obj?.id] = obj
        }
      })
    })
    for (const id in map) {
      if (map.hasOwnProperty(id)) {
        combinedArray.push(map[id])
      }
    }
    topic.voteBy = combinedArray
  })
}

const goTopicVote = (id: string) => {
  handleRouter.pushName('topicVote', { params: { id: id } })
}

const logout = async () => {
  await authSignOut()
  localStorage.clear()
  localStorage.setItem('isResetAccount', 'true')
  topics.value = []
  show.value = true
  email.value = ''
  password.value = ''
  username.value = ''
  mode.value = 'login'
}

const onClickAvatar = (voteBy: IUser[]) => {
  if (voteBy.length > 0) {
    listVoteBy.value = voteBy
    dialog.value = true
  }
}
</script>
