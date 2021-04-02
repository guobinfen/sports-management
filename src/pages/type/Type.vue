<template>
  <div class="container">
    <common-title></common-title>
    <div class="main">
      <common-options></common-options>
      <div class="content">
        <type-search></type-search>
      </div>
    </div>
  </div>
</template>

<script>
import CommonTitle from 'common/Title'
import CommonOptions from 'common/Options'
import TypeSearch from './components/Search'
export default {
  name: 'Type',
  components: {
    CommonTitle,
    CommonOptions,
    TypeSearch
  }
}
</script>

<style lang="stylus" scoped>
.main>>>.optionsContainer {
  height: 100vh !important;
}

.main {
  display: flex;

  .content {
    flex: 1;
    height: 100vh;
    background-color: #fafbfc;
  }
}
</style>
