<!-- Reference implementation -->
<!-- To understand how this works show-auto-complete-search-box-and-handle-search-selection.vue -->
<template>
  <div></div>
</template>

<script>
import clientTblOfCtSearchPhrases from '@/components/non-temporal/search-phrases/db/client-side/structure/table-to-store-search-phrases-given-by-each-components.js'

export default {
  data() {
    return {}
  },
  mounted() {
    clientTblOfCtSearchPhrases.insert({
      data: {
        value: 'chief-complaint',
        ctAbbr: 'rem',
        ctToShow: 'temporal/chief-complaint/view-layer/timeline-ct.vue',
        displayLocation: 'PresentTimeStateViewLayer',
      },
    })
    clientTblOfCtSearchPhrases.insert({
      data: {
        value: 'add chief-complaint',
        ctAbbr: 'arem',
        ctToShow: 'temporal/chief-complaint/edit-layer/add-chief-complaint.vue',
        displayLocation: 'edit-layer',
        ctWidthInEditLayer: 'small',
      },
    })
    clientTblOfCtSearchPhrases.insert({
      data: {
        value: 'edit chief-complaint',
        ctAbbr: 'crem',
        ctToShow: 'temporal/chief-complaint/edit-layer/edit-design-1.vue',
        displayLocation: 'edit-layer',
        ctWidthInEditLayer: 'small',
        needsRowIdToWork: 'yes',
      },
    })
    clientTblOfCtSearchPhrases.insert({
      data: {
        value: 'multi edit chief-complaint',
        ctAbbr: 'mcrem',
        ctToShow: 'temporal/chief-complaint/edit-layer/medit-design-1.vue',
        displayLocation: 'edit-layer',
        ctWidthInEditLayer: 'large',
      },
    })
    clientTblOfCtSearchPhrases.insert({
      data: {
        value: 'deleted chief-complaint',
        ctAbbr: 'drem',
        ctToShow: 'temporal/chief-complaint/view-layer/deleted.vue',
        displayLocation: 'edit-layer',
        ctWidthInEditLayer: 'large',
      },
    })
  },
}
</script>
