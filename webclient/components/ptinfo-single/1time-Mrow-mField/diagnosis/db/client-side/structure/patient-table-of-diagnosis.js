// For docs read webclient/docs/models.md
import clientSideTableManage from '~/components/others/crud/manage-rows-of-table-in-client-side-orm.js'

import clientSideTblMasterDiagnosis from './master-table-of-diagnosis'
const { v1: uuidv1 } = require('uuid')
let count = 0
const intUniqueId = () => ++count

export default class clientSideTblPatientDiagnosis extends clientSideTableManage {
  static entity = 'tablePatientOfDiagnosis'

  static apiUrl = 'http://localhost:8000/public/api/diagnosis/v20'

  static primaryKey = 'clientSideUniqRowId'

  static fields() {
    return {
      ...super.fields(),

      clientSideUniqRowId: this.uid(() => intUniqueId()),
      serverSideRowUuid: this.uid(() => uuidv1()),
      masterDiagnosisId: this.number(null),
      patientUuid: this.string(null),
      discontinueNote: this.string(null),
      recordChangedByUuid: this.string(null),
      recordChangedFromIPAddress: this.string(null),
      recordChangedFromSection: this.string(null),

      ROW_START: this.number(0),
      ROW_END: this.number(2147483648000),

      linkWithMaster: this.belongsTo(clientSideTblMasterDiagnosis, 'masterDiagnosisId'),
    }
  }
}
