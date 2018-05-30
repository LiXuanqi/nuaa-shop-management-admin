<template>
  <div class="app-container">
    <h1>申请店铺</h1>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'sid'
    ])
  }
}
</script>
