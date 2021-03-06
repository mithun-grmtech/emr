<template>
  <!-- SECTION 7 MENTAL STATUS EXAM-->
  <div>
    <el-row type="flex" justify="left" class="mseh3 sectionHeader" style="padding: 0rem; margin: 0rem">
      <el-col :span="9" class="sectionHeading"> Mental status exam </el-col>
      <el-col :span="2"
        ><div class="grid-content">
          <div v-if="currentApptObj['apptStatus'] === 'locked'">
            <el-popover placement="right" width="400" v-model="isAddendumPopoverVisible">
              <div style="text-align: right; margin: 0">
                <el-input type="textarea" :rows="4" v-model="amendmentData"></el-input>
                <el-button
                  v-if="amendmentData.length > 0"
                  type="success"
                  icon="el-icon-check"
                  style="position: absolute; bottom: 15px; right: 15px"
                  size="mini"
                  @click="mfSaveAddendum(amendmentData, 'mentalStatusExam')"
                  circle
                ></el-button>
              </div>
              <el-button
                slot="reference"
                class="el-icon-edit-outline"
                size="mini"
                style="padding: 0px; color: #c0c4cc; border: none; display: none; float: left"
              >
              </el-button>
            </el-popover>
          </div>
          <div v-else>
            <el-button
              class="el-icon-money"
              size="mini"
              @click="mfOpenMultiEditCtInEditLayer"
              style="padding: 0px; color: #c0c4cc; border: none; display: none; float: left"
            ></el-button>
          </div>
        </div>
      </el-col>
    </el-row>
    <div :style="cfGetMentalStatusExamStyle">
      <div v-for="row in mfGetArOfMentalStatusExam(this.currentApptObj)" :key="`mse - ${row.clientSideUniqRowId}`">
        {{ row['tblMentalStatusExamMasterLink']['mentalStatusExamCategory'] }}
        {{ row['tblMentalStatusExamMasterLink']['mentalStatusExamDescription'] }}
      </div>
    </div>

    <div v-if="cfArOfAddendumForDisplay('mentalStatusExam') && cfArOfAddendumForDisplay('mentalStatusExam').length > 0">
      <h4>Addendum:</h4>
      <div v-for="row in cfArOfAddendumForDisplay('mentalStatusExam')" :key="row.clientSideUniqRowId">
        <div style="margin: 5px 0">
          {{ row.description }}
          <br />
          <span style="font-size: 10px">Added by {{ row.addedBy }} at {{ row.ROW_START | moment }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Data tables
import clientTblOfAddendums from '~/components/temporal/amendment/db/client-side/structure/amendment-client-side-table.js'
import clientTblOfAppointments from '@/components/temporal/appointments/db/client-side/structure/appointment-client-side-table.js'
import clientTblOfMentalStatusExam from '@/components/1time-eachField-1value/mental-status-exam/db/client-side/structure/patient-table-of-mental-status-exam.js'
import clientTblOfLeftSideViewCards from '@/components/non-temporal/components-container-in-lhs-of-layer1/db/client-side/structure/left-hand-side-table-of-cards.js'
import moment from 'moment'

export default {
  data() {
    return {
      currentApptObj: [],
      debug: false,
      amendmentData: '',
      isAddendumPopoverVisible: false,
    }
  },
  props: {
    propApptId: {
      type: Number,
      required: true,
    },
  },
  async mounted() {
    if (!this.propApptId === 0) {
      return
    }
    this.currentApptObj = await clientTblOfAppointments.find(this.propApptId)
  },
  methods: {
    mfOpenMultiEditCtInEditLayer() {
      this.$store.commit('mtfShowNewFirstTabInEditLayerFromSearchPhrase', {
        searchTerm: 'edit mental status exam',
      })
    },
    mfSaveAddendum(pAddendumData, component) {
      clientTblOfAddendums.insert({
        data: {
          appointmentId: this.currentApptObj.clientSideUniqRowId,
          component: component,
          description: pAddendumData,
          ROW_START: Math.floor(Date.now()),
        },
      })

      // remove modal value after save
      this.amendmentData = ''
    },

    mfGetArOfMentalStatusExam(pApptObj) {
      if (!pApptObj) return

      let arOfObjectsFromClientDB = []
      if (pApptObj['apptStatus'] === 'unlocked') {
        arOfObjectsFromClientDB = clientTblOfMentalStatusExam
          .query()
          .with('tblMentalStatusExamMasterLink')
          .where('ROW_END', 2147483648000)
          .get()
      } else {
        arOfObjectsFromClientDB = clientTblOfMentalStatusExam
          .query()
          .with('tblMentalStatusExamMasterLink')
          .where('ROW_END', (value) => value > pApptObj['ROW_END'])
          .where('ROW_START', (value) => value < pApptObj['ROW_END'])
          .get()
      }
      console.log(arOfObjectsFromClientDB)
      return arOfObjectsFromClientDB
    },
  },
  computed: {
    cfGetMentalStatusExamStyle() {
      let secondaryDuringComparisonApptObj = {}
      let secondaryDuringComparisonMentalStatusExamArray = {}

      const printableApptNoteComponentCardObj = clientTblOfLeftSideViewCards.find(2)

      /* Goal: Find if current ID matches with firstParam or secondParam inside printableApptNoteComponentCardObj.
       It has to match with either firstParameter or secondParameter inside  printableApptNoteComponentCardObj */
      if (printableApptNoteComponentCardObj['secondParameterGivenToComponentBeforeMounting'] === this.propApptId) {
        /* Handle the case when the current ID matches with the second param.
        Hence during comparison:
        1. SecondParameter is primary.
        2. FirstParamter is Seconday  */
        secondaryDuringComparisonApptObj = clientTblOfAppointments.find(
          printableApptNoteComponentCardObj['firstParameterGivenToComponentBeforeMounting']
        )
        secondaryDuringComparisonMentalStatusExamArray = this.mfGetArOfMentalStatusExam(
          secondaryDuringComparisonApptObj
        )
        if (
          secondaryDuringComparisonMentalStatusExamArray.length >
          this.mfGetArOfMentalStatusExam(this.currentApptObj).length
        ) {
          return 'border:1px solid #E6A23C'
        } else if (
          secondaryDuringComparisonMentalStatusExamArray.length <
          this.mfGetArOfMentalStatusExam(this.currentApptObj).length
        ) {
          return 'border:1px solid #67C23A'
        } else {
          /* The length of MSE on left and right is same. This 90% probability means that they are same. ONLY on right the MSE should be in light grey color.
           There are 2 possibilities this.propApptId appears on left or right.
           this.propApptId is equqal to printableApptNoteComponentCardObj['secondParameterGivenToComponentBeforeMounting'] 
           Hence it will appear on right if:
           this.propApptId is greateer then printableApptNoteComponentCardObj['firstParameterGivenToComponentBeforeMounting']
          */
          if (this.propApptId > printableApptNoteComponentCardObj['firstParameterGivenToComponentBeforeMounting'])
            return 'color:grey;'
        }
      } else {
        //
        // Case when this appt is not the 2nd param so it is the first param
        //

        // there may or may not be a second paramters. If no second parameter then there is no comparison to be made
        if (printableApptNoteComponentCardObj['secondParameterGivenToComponentBeforeMounting']) {
          // Need to compare with second
          secondaryDuringComparisonApptObj = clientTblOfAppointments.find(
            printableApptNoteComponentCardObj['secondParameterGivenToComponentBeforeMounting']
          )

          secondaryDuringComparisonMentalStatusExamArray = this.mfGetArOfMentalStatusExam(
            secondaryDuringComparisonApptObj
          )
          if (
            secondaryDuringComparisonMentalStatusExamArray.length >
            this.mfGetArOfMentalStatusExam(this.currentApptObj).length
          ) {
            return 'border:1px solid #E6A23C'
          } else if (
            secondaryDuringComparisonMentalStatusExamArray.length <
            this.mfGetArOfMentalStatusExam(this.currentApptObj).length
          ) {
            return 'border:1px solid #67C23A'
          } else {
            /* The length of psych ros on left and right is same. This 90% probability means that they are same. On right the psych ros should be in light grey color.
             There are 2 possibilities this.propApptId appears on left or right.
             this.propApptId will appear on right if it is greateer then printableApptNoteComponentCardObj['firstParameterGivenToComponentBeforeMounting']
             */
            if (this.propApptId > printableApptNoteComponentCardObj['secondParameterGivenToComponentBeforeMounting'])
              return 'color:grey;'
          }
        }
      }
      // Nothing to compare with
    },

    cfArOfAddendumForDisplay() {
      const arFromClientTblOfAddendums = clientTblOfAddendums
        .query()
        .where('appointmentId', this.propApptId)
        .orderBy('ROW_START', 'asc')
        .get()

      const arAddendums = []
      arFromClientTblOfAddendums.forEach((row) => {
        if (typeof arAddendums[row.component] === 'undefined') {
          arAddendums[row.component] = []
        }
        arAddendums[row.component].push(row)
      })

      /**
       * component is computed function parameter
       * ref: https://ednsquare.com/question/how-to-pass-parameters-in-computed-properties-in-vue-js-------MQVlHT
       */
      return (component) => arAddendums[`${component}`]
    },
  },
}
</script>

<style scoped>
.mseh3:hover .el-icon-edit-outline {
  display: inline-block !important;
  position: absolute;
}
.mseh3:hover .el-icon-money {
  display: inline-block !important;
  position: absolute;
}
h3 {
  border-bottom: 1px solid #dcdfe6;
  margin-top: 1rem;
  width: 100%;
  float: none;
  display: flex;
}
.sectionHeader {
  margin-top: 1rem !important;
  padding-bottom: 0.1rem !important;
  border-bottom: 1px solid #dcdfe6;
}
.sectionHeading {
  font-size: 1rem;
  color: #606266;
}
</style>
