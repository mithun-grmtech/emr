<template>
  <div>
    <showContentInCardComponent
      propMainCardName="Correlate"
      :propActionsThatCanBeInvokedFromCardHeader="[
        {
          actionDescription: 'Toggle card display',
          isDefaultAction: true,
        },
      ]"
      :propClientRowLevelActions="[{}]"
      propGridDesignTopMostParentBody="s-css-class-top-most-card-body-grid"
    >
      <div slot="bodySlotContentFromParentToShowAboveChildCards"><graph></graph></div>
    </showContentInCardComponent>
  </div>
</template>

<script>
import showContentInCardComponent from '@/components/non-temporal/display-manager/show-content-in-card-component.vue'
import graph from '@/components/non-temporal/correlate/graph-design-1.vue'

export default {
  components: {
    showContentInCardComponent,
    graph,
  },
  data: function () {
    return {}
  },
}
</script>
