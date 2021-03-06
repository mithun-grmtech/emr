<template>
  <div>
    <!-- Goal: Print 2 notes side by side -->
    <div v-if="cfNumberOfNotesToCompare.length > 1">
      <el-drawer
        :visible.sync="dUidrawerToShowComparisonOf2Notes"
        direction="ttb"
        size="95%"
        @close="handleDrawerClosed()"
        :with-header="false"
      >
        <el-row>
          <el-col :span="12"
            ><apptNotePrintableView
              :propShowNoteForApptId="lowerValueForComparisonClientUniqRowId"
              :key="lowerValueForComparisonClientUniqRowId"
            /> </el-col
          ><el-col :span="12"
            ><apptNotePrintableView
              :propShowNoteForApptId="higherValueForComparisonClientUniqRowId"
              :key="higherValueForComparisonClientUniqRowId"
          /></el-col>
        </el-row>
      </el-drawer>
    </div>
    <!-- Goal: Print a single note -->
    <div v-else>
      <apptNotePrintableView
        :propShowNoteForApptId="firstNoteForComparisonClientUniqRowId"
        :key="firstNoteForComparisonClientUniqRowId"
      />
    </div>
  </div>
</template>

<script>
// This component to show 2 notes side by side
import apptNotePrintableView from '@/components/non-temporal/printable-appt-note-with-amendment-or-modify-feature/given-appt-id-print-all-sections-together.vue'
import clientTblOfLeftSideViewCards from '@/components/non-temporal/components-container-in-lhs-of-layer1/db/client-side/structure/left-hand-side-table-of-cards.js'
import clientTblOfAppointments from '@/components/temporal/appointments/db/client-side/structure/appointment-client-side-table.js'

export default {
  data() {
    return {
      dUidrawerToShowComparisonOf2Notes: false,
      firstNoteForComparisonClientUniqRowId: 0,
      secondNoteForComparisonClientUniqRowId: 0,
    }
  },

  components: { apptNotePrintableView },

  mounted: function () {},
  methods: {
    handleDrawerClosed() {
      // Once drawer is closed I need to empty the 2nd param so the prev and next button work properly and do not open the drawer
      const updateState = clientTblOfLeftSideViewCards.update({
        clientSideUniqRowId: 2,
        secondParameterGivenToComponentBeforeMounting: 0,
      })
    },
    mfGetPrevAppt(pApptClientUniqRowId) {
      let secondNoteForComparisonClientUniqRowId = 0
      const clientSideArray = clientTblOfAppointments
        .query()
        .where((record) => {
          return record['apptStatus'] === 'unlocked' || record['apptStatus'] === 'locked'
        })
        .get()

      for (let i = 0; i < clientSideArray.length; i++) {
        if (clientSideArray[i]['clientSideUniqRowId'] < pApptClientUniqRowId) {
          secondNoteForComparisonClientUniqRowId = clientSideArray[i]['clientSideUniqRowId']
        }
      }
      return secondNoteForComparisonClientUniqRowId
    },
    mfGetNextAppt(pApptClientUniqRowId) {
      let secondNoteForComparisonClientUniqRowId = 0
      const clientSideArray = clientTblOfAppointments
        .query()
        .where((record) => {
          return record['apptStatus'] === 'unlocked' || record['apptStatus'] === 'locked'
        })
        .get()

      for (let i = 0; i < clientSideArray.length; i++) {
        if (clientSideArray[i]['clientSideUniqRowId'] > pApptClientUniqRowId) {
          secondNoteForComparisonClientUniqRowId = clientSideArray[i]['clientSideUniqRowId']
        }
      }
      return secondNoteForComparisonClientUniqRowId
    },
  },
  computed: {
    // Goal: Lower appt ID should come on the left. Since lower ID means happened before.
    lowerValueForComparisonClientUniqRowId() {
      if (this.firstNoteForComparisonClientUniqRowId > this.secondNoteForComparisonClientUniqRowId) {
        return this.secondNoteForComparisonClientUniqRowId
      } else {
        return this.firstNoteForComparisonClientUniqRowId
      }
    },
    higherValueForComparisonClientUniqRowId() {
      if (this.firstNoteForComparisonClientUniqRowId > this.secondNoteForComparisonClientUniqRowId) {
        return this.firstNoteForComparisonClientUniqRowId
      } else {
        return this.secondNoteForComparisonClientUniqRowId
      }
    },

    cfNumberOfNotesToCompare() {
      let numberOfNotesToCompare = 0
      const apptNoteComponentObj = clientTblOfLeftSideViewCards.find(2)

      let noteIDs = new Array()

      if (apptNoteComponentObj['firstParameterGivenToComponentBeforeMounting']) {
        numberOfNotesToCompare++
        this.firstNoteForComparisonClientUniqRowId =
          apptNoteComponentObj['firstParameterGivenToComponentBeforeMounting']

        noteIDs.push(this.firstNoteForComparisonClientUniqRowId)
      }
      if (apptNoteComponentObj['secondParameterGivenToComponentBeforeMounting']) {
        numberOfNotesToCompare++
        this.secondNoteForComparisonClientUniqRowId =
          apptNoteComponentObj['secondParameterGivenToComponentBeforeMounting']
        noteIDs.push(this.firstNoteForComparisonClientUniqRowId)
      }

      // If this ct was asked to display itself without the note ID then the high locked or unlockjed note id will be its ID
      if (this.firstNoteForComparisonClientUniqRowId > 0) {
      } else {
        const apptObj = clientTblOfAppointments
          .query()
          .where('apptStatus', 'locked')
          .orWhere('apptStatus', 'unlocked')
          .orderBy('clientSideUniqRowId', 'desc')
          .get()

        const updateState = clientTblOfLeftSideViewCards.update({
          clientSideUniqRowId: 2,
          currentDisplayStateOfComponent: 1,
          firstParameterGivenToComponentBeforeMounting: apptObj[0]['clientSideUniqRowId'],
        })

        this.firstNoteForComparisonClientUniqRowId = apptObj[0]['clientSideUniqRowId']
        noteIDs[0] = this.secondNoteForComparisonClientUniqRowId
      }

      if (noteIDs.length === 2) this.dUidrawerToShowComparisonOf2Notes = true

      return noteIDs
    },
  },
}
</script>
<style>
/* Make drawer scrollable */
.el-drawer__body {
  height: 100%;
  box-sizing: border-box;
  overflow-y: auto;
}

.slide-fade-enter-active {
  transition: all 0.1s ease;
}
.slide-fade-leave-active {
  transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for <2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
