<template>
  <div>
    <showContentInCardComponent
      propMainCardName="Vitals"
      :propActionsThatCanBeInvokedFromCardHeader="[
        {
          actionDescription: 'Toggle card display',
          isDefaultAction: true,
        },
      ]"
    >
      <el-card
        slot="bodySlotContentFromParentToShowAboveChildCards"
        class="box-card sc-individual-child-card"
        shadow="hover"
      >
        <ctWeightGraph form-type="embedded"></ctWeightGraph>
      </el-card>
      <el-card
        slot="bodySlotContentFromParentToShowAboveChildCards"
        class="box-card sc-individual-child-card"
        shadow="hover"
      >
        <ctHeightGraph form-type="embedded"></ctHeightGraph>
      </el-card>
      <el-card
        slot="bodySlotContentFromParentToShowAboveChildCards"
        class="box-card sc-individual-child-card"
        shadow="hover"
      >
        <ctTemperatureGraph form-type="embedded"></ctTemperatureGraph>
      </el-card>
      <el-card
        slot="bodySlotContentFromParentToShowAboveChildCards"
        class="box-card sc-individual-child-card"
        shadow="hover"
      >
        <ctBloodPressureGraph form-type="embedded"></ctBloodPressureGraph>
      </el-card>
      <el-card
        slot="bodySlotContentFromParentToShowAboveChildCards"
        class="box-card sc-individual-child-card"
        shadow="hover"
      >
        <ctBloodSugarGraph form-type="embedded"></ctBloodSugarGraph>
      </el-card>
      <el-card
        slot="bodySlotContentFromParentToShowAboveChildCards"
        class="box-card sc-individual-child-card"
        shadow="hover"
      >
        <ctWaistCircumferenceGraph form-type="embedded"></ctWaistCircumferenceGraph>
      </el-card>
      <el-card
        slot="bodySlotContentFromParentToShowAboveChildCards"
        class="box-card sc-individual-child-card"
        shadow="hover"
      >
        <ctPulseGraph form-type="embedded"></ctPulseGraph>
      </el-card>
      <el-card
        slot="bodySlotContentFromParentToShowAboveChildCards"
        class="box-card sc-individual-child-card"
        shadow="hover"
      >
        <ctOxygenSaturationGraph form-type="embedded"></ctOxygenSaturationGraph>
      </el-card>
    </showContentInCardComponent>
  </div>
</template>

<script>
import showContentInCardComponent from '@/components/non-temporal/display-manager/show-content-in-card-component.vue'
import ctWeightGraph from '@/components/1time-eachField-1value/vital-signs/sub-cts/weight/view-layer/line-graph-ct.vue'
import ctHeightGraph from '@/components/1time-eachField-1value/vital-signs/sub-cts/height/view-layer/line-graph-ct.vue'
import ctTemperatureGraph from '@/components/1time-eachField-1value/vital-signs/sub-cts/temperature/view-layer/line-graph-ct.vue'
import ctBloodPressureGraph from '@/components/1time-eachField-1value/vital-signs/sub-cts/blood-pressure-levels/view-layer/line-graph-ct.vue'
import ctBloodSugarGraph from '@/components/1time-eachField-1value/vital-signs/sub-cts/blood-sugar-levels/view-layer/line-graph-ct.vue'
import ctWaistCircumferenceGraph from '@/components/1time-eachField-1value/vital-signs/sub-cts/waist-circumference/view-layer/line-graph-ct.vue'
import ctPulseGraph from '@/components/1time-eachField-1value/vital-signs/sub-cts/pulse/view-layer/line-graph-ct.vue'
import ctOxygenSaturationGraph from '@/components/1time-eachField-1value/vital-signs/sub-cts/oxygen-saturation/view-layer/line-graph-ct.vue'
export default {
  components: {
    showContentInCardComponent,
    ctWeightGraph,
    ctHeightGraph,
    ctTemperatureGraph,
    ctBloodPressureGraph,
    ctBloodSugarGraph,
    ctWaistCircumferenceGraph,
    ctPulseGraph,
    ctOxygenSaturationGraph,
  },
  data: function () {
    return {}
  },
  methods: {
    mfTablePageChanged(pNewPageNumber) {
      this.tablePageNumber = pNewPageNumber
    },
    mfIconMultiDeleteClickedOnChildCard(val) {
      this.daSelectedRemForDelete = val
    },
  },
}
</script>

<style scoped>
/* Ref: https://www.freecodecamp.org/news/a-beginners-guide-to-css-grid-3889612c4b35/

Q) Why use grid and not use flex or breakpoints?
Breakpoints is 7 year old tech. The breakpoints were small / medium / large.
Flex is 4 year old tech
Grid is 2 year old tech
"There is no method in flexbox to tell items in one row to line up with items in the row above"
Ref: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Mastering_Wrapping_of_Flex_Items
Hence using the grid system

Q) Where can i see the example of flex?
The previous commit (d72c5110df1450385bdc8a5ec867095cde453e1e) was flex I did not say the number of columns. 
The number of columns was being auto-decided depending on the space available.
 */
</style>
