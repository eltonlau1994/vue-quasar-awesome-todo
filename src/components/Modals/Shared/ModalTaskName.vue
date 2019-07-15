<template>
  <div class="row q-mb-sm">
    <q-input
      v-select-all
      outlined
      :value="name"
      @input="$emit('update:name', $event)"
      label="Task name"
      class="col"
      autofocus
      :rules="[val => !!val || 'Field is required']"
      ref="name"
      clearable
    />
  </div>
</template>

<script>
import { selectAll } from '../../../directives/directive-select-all'

export default {
  props: ['name'],
  directives: {
    selectAll
  }
}
</script>
