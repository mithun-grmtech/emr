<!-- Reference implementation -->
<template>
  <div>
    <showContentInCardComponent
      propMainCardName="Reminders"
      :propActionsThatCanBeInvokedFromCardHeader="[
        {
          actionDescription: 'Add',
          isDefaultAction: true,
        },
        {
          actionDescription: 'Multi edit',
        },
        {
          actionDescription: 'Multi delete',
        },
        {
          actionDescription: 'Toggle card display',
        },
        {
          actionDescription: 'Show deleted',
        },
      ]"
    >
      <el-card
        slot="bodySlotContentFromParentToShowAboveChildCards"
        v-for="rem in cfArOfRemForDisplayInTable"
        :key="rem.id"
        class="box-card sc-individual-child-card"
        shadow="hover"
        :style="mfGetCssClassNameForEachDataRow(rem)"
      >
        <el-button-group style="float: right; display: none">
          <el-tooltip class="item" effect="light" content="Click to edit" placement="top-start" :open-delay="500">
            <el-button
              style="padding: 3px; color: #c0c4cc; border: none"
              plain
              @click="mxOpenEditCtInEditLayer(rem.clientSideUniqRowId)"
              class="el-icon-edit"
            >
            </el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="light" content="info" placement="top-end" :open-delay="500">
            <el-button style="padding: 3px; color: #c0c4cc; border: none" plain class="el-icon-discover"> </el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="light" content="Click to delete" placement="top-end" :open-delay="500">
            <el-button
              style="padding: 3px; color: #c0c4cc; border: none"
              plain
              @click="mfIconDeleteClickedOnChildCard(rem.clientSideUniqRowId)"
              class="el-icon-circle-close"
            >
            </el-button>
          </el-tooltip>
        </el-button-group>

        <!-- <el-button type="text">{{ rem.description }}</el-button> 
          if I use the button then a long text is not getting divided into multiple lines
          if rowStateInThisSession == 9 then the div should have a orange border
          Why we are doing this?
            Doctor is sitting infront of computer suddenly a new Rem appears. That is a confusing event.
            Instead if the new Rem that came on screen gets a orange border with top right corner saying "New rem added from socket" that is much better UX.
          -->
        <div v-if="rem.vnRowStateInSession === 9">Added from socket {{ rem.description }}</div>
        <div v-else>
          {{ rem.description }}
        </div>
      </el-card>
    </showContentInCardComponent>

    <ctActOnSocketMessages></ctActOnSocketMessages>
  </div>
</template>

<script>
import clientTbl from '../db/client-side/structure/reminders-of-a-patient-table.js'
import ctActOnSocketMessages from '../edit-layer/act-on-socket-messages-from-server-ct.vue'
import clInvokeMixin from './cl-invoke-mixin.js'
import showContentInCardComponent from '@/components/non-temporal/display-manager/show-content-in-card-component.vue'

export default {
  components: { ctActOnSocketMessages, showContentInCardComponent },
  mixins: [clInvokeMixin],
  data() {
    return {
      tablePageNumber: 1,
      daRowStatesNotHavingCD: [2, 24, 2456, 2457, 24578], // Set of array of 'vnRowStateInSession' should not have change and delete button. As per GLOSSARY.md C stands for 'change' and D stands for 'delete'.
      daSelectedRemForDelete: [],
    }
  },
  computed: {
    cfLengthOfDataArray() {
      const arFromClientTbl = clientTbl.fnGetPresentUniqueUuidRows()
      return arFromClientTbl.length
    },

    cfArOfRemForDisplayInTable() {
      // Whenever clientTbl will change this will get called. Even when there are 100 rows in the table when clientTbl rem changes this gets called once'
      const arFromClientTbl = clientTbl.fnGetPresentUniqueUuidNotEmptyRows('description')
      /*  Q) Should this function return the array it gets from ORM or modify the array?
              Option1: Return ORM array
                  -ves:
                    1. Created at needs to be made inside the template
                    2. Making pager would be harder
                  +ves:
                    No need to run the for loop
      */
      const arRemsForDisplay = []
      let obj = {}
      if (arFromClientTbl.length) {
        let date = ''
        const startDataRowInidex = (this.tablePageNumber - 1) * 10
        const endDataRowIndex = startDataRowInidex + 10
        for (let i = startDataRowInidex; i < arFromClientTbl.length && i < endDataRowIndex; i++) {
          obj = {}
          obj.description = arFromClientTbl[i].description
          // For date format ref: /cts/temporal/reminders/view-layer/timeline-ct.vue:53
          date = new Date(arFromClientTbl[i].ROW_START * 1000)
          obj.createdAt =
            date.toLocaleString('default', { month: 'long' }) + '-' + date.getDate() + '-' + date.getFullYear()
          obj.ROW_START = date.toLocaleString()
          obj.ROW_END = new Date(arFromClientTbl[i].ROW_END * 1000).toLocaleString()
          obj.vnRowStateInSession = arFromClientTbl[i].vnRowStateInSession
          obj.uuid = arFromClientTbl[i].serverSideRowUuid
          obj.$id = arFromClientTbl[i].$id
          obj.clientSideUniqRowId = arFromClientTbl[i].clientSideUniqRowId
          obj.cardContentOfTypeStringToShowInBodyOfCards = obj.description
          arRemsForDisplay.push(obj)
        }
      }
      return arRemsForDisplay
    },
  },
  async mounted() {},
  methods: {
    mfTablePageChanged(pNewPageNumber) {
      this.tablePageNumber = pNewPageNumber
    },
    mfIconMultiDeleteClickedOnChildCard(val) {
      this.daSelectedRemForDelete = val
    },
    mfEditIconClicked(pClientDataRowId) {
      this.mxOpenEditCtInEditLayer(pClientDataRowId)
    },
    mfGetCssClassNameForEachDataRow(pRow) {
      const strOfNumber = pRow.vnRowStateInSession.toString()
      const lastCharecter = strOfNumber.slice(-1)
      if (lastCharecter === '4' || lastCharecter === '6') {
        return 'color: #E6A23C;'
      } else {
        return 'color: #202020;'
      }
    },
  },
}
</script>
