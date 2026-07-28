<template>
  <!-- Modal create option for topic -->
  <UiDialog v-model="dialogVisible" title="Option">
    <form @submit.prevent>
      <UiInput
        v-if="props.topicState.data && checkTitleRequired(props.topicState.data)"
        v-model="optionFormData.title"
        label="Tiêu đề"
      />
      <UiInput v-else v-model="optionFormData.title" label="Tiêu đề" />

      <UiInput
        v-if="props.topicState.data && checkLinkRequired(props.topicState.data)"
        v-model="optionFormData.link"
        label="Link"
      />
      <UiInput v-else v-model="optionFormData.link"  class="mt-4" label="Link" />

      <div class="flex gap-4 mt-4">
        <UiButton type="submit" block variant="secondary" @click="handleClose">Đóng</UiButton>
        <UiButton type="submit" block variant="primary" @click="createOption">Tạo mới</UiButton>
      </div>
    </form>
    <UiAlert
      v-if="message"
      class="mt-2"
      :type="hasError ? 'error' : 'success'"
      :message="message"
    />
  </UiDialog>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { UiButton, UiDialog, UiInput, UiAlert } from '@/components/ui'
import { initOption } from './Admin.state'
import {
  handleValidateAddOption,
  linkRules,
  titleRules,
  checkTitleRequired,
  checkLinkRequired
} from './Admin.validate'
import { getOptionsByTopicId, postNewOption } from '@/services/option.service'
import { ENotificationColor } from '@/core/constants/enum'
import type { IOption } from '@/core/interfaces/model/option'
import type { IState } from '@/core/interfaces/model/state'
import type { ITopic } from '@/core/interfaces/model/topic'

const props = defineProps<{
  topicState: IState<ITopic>
}>()
const emits = defineEmits(['onClose'])

// State
const dialogVisible = ref(true)
const hasError = ref<boolean>(false)
const message = ref<string>('')
const optionFormData = reactive<IOption>(initOption)

/**
 * close dialog
 */
const handleClose = () => {
  optionFormData.title = ''
  optionFormData.link = ''
  dialogVisible.value = false
  emits('onClose')
}
/**
 * validate topic data and create option
 */
const createOption = async () => {
  const topicStateData = props.topicState.data
  try {
    if (
      topicStateData &&
      optionFormData &&
      handleValidateAddOption(optionFormData, topicStateData) === true
    ) {
      const topicData = await getOptionsByTopicId(topicStateData.id)
      setTimeout(async () => {
        const optionList = topicData.value as IOption[]
        let checkIsDuplicate = false
        optionList.forEach((option) => {
          if (
            option.title === optionFormData?.title ||
            (optionFormData?.link && optionFormData.link === option.link)
          ) {
            hasError.value = true
            message.value = 'Option này đã tồn tại, vui lòng nhập lại!'
            checkIsDuplicate = true
            return
          }
        })
        if (!checkIsDuplicate) {
          await postNewOption(optionFormData.title, optionFormData.link, topicStateData.id)
          hasError.value = false
          message.value = 'Tạo mới thành công'
        }
      }, 200)
    }
  } catch {
    hasError.value = false
    message.value = 'Tạo mới không thành công!'
  } finally {
    setTimeout(() => {
      optionFormData.title = ''
      optionFormData.link = ''
      message.value = ''
    }, 2000)
  }
}
</script>

