<template>
  <div class="row q-mb-sm">
    <q-input outlined :value="dueTime" @input="$emit('update:dueTime', $event)" label="Due time">
      <template v-slot:append>
        <q-icon name="access_time" class="cursor-pointer">
          <q-popup-proxy>
            <q-time :value="dueTime" @input="$emit('update:dueTime', $event)" />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
</div>
</template>

<script>
export default {
  props: ['dueTime']
}
</script>
