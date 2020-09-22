// For docs read webclient/docs/models.md
import clientSideTableManage from '~/components/core/crud/manage-rows-of-table-in-client-side-orm.js'

import clientSideTblMasterDiagnosis from './master-of-diagnosis-table'
const { v1: uuidv1 } = require('uuid')

let count = 0
const intUniqueID = () => ++count

export default class clientSideTblPatientDiagnosis extends clientSideTableManage {
  static entity = 'tablePatientOfDiagnosis'

  static primaryKey = 'clientSideUniqRowId'

  static fields() {
    return {
      ...super.fields(),

      clientSideUniqRowId: this.uid(() => intUniqueID()),
      masterDiagnosisId: this.uid(() => uuidv1()), // This is service statement ID assigned to this patient coming from master table
      patientUUID: this.string(null),
      recordChangedByUUID: this.string(null),
      recordChangedFromIPAddress: this.string(null),
      recordChangedFromSection: this.string(null),

      ROW_START: this.number(0),
      ROW_END: this.number(2147483647.999999), 
      
      linkWithMaster: this.belongsTo(
        clientSideTblMasterDiagnosis,
        'masterDiagnosisId'
      ),
    }
  }
}
