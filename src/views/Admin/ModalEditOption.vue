<template>
  <!-- Modal edit option -->
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
        <UiButton type="submit" block variant="primary" @click="updateOption">Cập nhật</UiButton>
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
import {
  handleValidateAddOption,
  linkRules,
  titleRules,
  checkLinkRequired,
  checkTitleRequired
} from './Admin.validate'
import { ENotificationColor } from '@/core/constants/enum'
import { getOptionsByTopicId, putOptionData } from '@/services/option.service'
import type { IOption } from '@/core/interfaces/model/option'
import type { IState } from '@/core/interfaces/model/state'
import type { ITopic } from '@/core/interfaces/model/topic'

const props = defineProps<{
  option: IOption
  optionList: IOption[]
  topicState: IState<ITopic>
}>()

const emits = defineEmits(['onClose', 'update:optionList'])

// State
const dialogVisible = ref(true)
const hasError = ref<boolean>(false)
const message = ref<string>('')
const optionFormData = reactive<IOption>({ ...props.option })

/**
 * close dialog
 */
const handleClose = () => {
  dialogVisible.value = false
  emits('onClose')
}
/**
 * validate topic data and create option
 */
const updateOption = async () => {
  try {
    if (
      props.topicState.data &&
      optionFormData &&
      handleValidateAddOption(optionFormData, props.topicState.data) === true
    ) {
      await putOptionData(optionFormData)
      const topicData = await getOptionsByTopicId(props.topicState.data.id)
      emits('update:optionList', topicData.value)
      hasError.value = false
      message.value = 'Cập nhật thành công'
    }
  } catch {
    hasError.value = true
    message.value = 'Cập nhật không thành công!'
  } finally {
    setTimeout(() => {
      message.value = ''
    }, 2000)
  }
}
</script>

