<template>
  <div>
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>Mental status exam</span>
        <el-button
          style="float: right; padding: 3px 0"
          type="text"
          @click="mfOpenEditCtInEditLayer"
          icon="el-icon-edit"
        ></el-button>
      </div>
      <div class="grid-container">
        <div v-for="ss in cfArOfMentalStatusExamForDisplay" :key="ss.clientSideUniqRowId">
          <el-button @click="mfDeleteMentalStatusExam(ss.clientSideUniqRowId)" type="primary"
            >{{ ss.tblMentalStatusExamMasterLink.mentalStatusExamCategory }}:
            {{ ss.tblMentalStatusExamMasterLink.mentalStatusExamDescription }}</el-button
          >
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import clientTblOfMasterMentalStatusExam from '../db/client-side/structure/master-table-of-mental-status-exam.js'
import clientTblOfPatientMentalStatusExam from '../db/client-side/structure/patient-table-of-mental-status-exam.js'

export default {
  computed: {
    cfArOfMentalStatusExamForDisplay() {
      const arOfObjectsFromClientDB = clientTblOfPatientMentalStatusExam
        .query()
        .with('tblMentalStatusExamMasterLink')
        .where('ROW_END', 2147483648000)
        .get()
      return arOfObjectsFromClientDB
    },
  },
  methods: {
    mfDeleteMentalStatusExam(pClientUniqRowId) {
      clientTblOfPatientMentalStatusExam.update({
        where: pClientUniqRowId,
        data: {
          ROW_END: Math.floor(Date.now()),
        },
      })
    },
    mfOpenEditCtInEditLayer() {
      this.$store.commit('mtfShowNewFirstTabInEditLayerFromSearchPhrase', {
        searchTerm: 'edit mental status exam',
      })
    },
  },
  async mounted() {},
}
</script>
