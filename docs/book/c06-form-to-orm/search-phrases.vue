<template><div></div></template>
<script>
import clientSideTblSearchPhrasesOfCt from "@/components/core/search-phrases/db/client-side/structure/search-phrases-of-components-table";
export default {
  data() {
    return {};
  },
  mounted() {
    clientSideTblSearchPhrasesOfCt.insert({
      data: {
        value: "Sixth chapter",
        ctAbbr: "c6",
        ctToShow: "book/c06-form-to-orm/view-layer/table-ct.vue", // PtsVl -> Present time state - part of - view layer
        displayLocation: "ptsVl",
      },
    });
    clientSideTblSearchPhrasesOfCt.insert({
      data: {
        value: "Sixth chapter - change",
        ctAbbr: "c6-c",
        ctToShow: "book/c06-form-to-orm/change-layer/table-ct.vue",
        displayLocation: "cl",
        ctWidthInCl: "small",
      },
    });
  },
};
</script>
