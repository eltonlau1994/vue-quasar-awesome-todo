<template>
<div>
    <q-card-section class="row">
    <div class="text-h6"><slot></slot></div>
    <q-space />
    <q-btn flat dense round icon="close" v-close-popup />
  </q-card-section>
</div>
</template>

<script>
export default {

}
</script>

