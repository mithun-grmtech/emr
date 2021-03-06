// For ref implementation see name/db/structure/table.js
import clientTblManage from '~/components/non-temporal/crud/manage-rows-of-table-in-client-side-orm.js'

const { v1: uuidv1 } = require('uuid')
let count = 0
const intUniqueId = () => ++count

export default class ptWaistCircumference extends clientTblManage {
  static entity = 'tblWaistCircumference'
  static apiUrl = 'http://localhost:8000/public/api/waist-circumference/v20'

  static graphSeries1FieldName = 'waistCircumferenceInInches'
  static graphSeries1Unit = 'Inches'

  static primaryKey = 'clientSideUniqRowId'

  static fields() {
    return {
      ...super.fields(),

      clientSideUniqRowId: this.uid(() => intUniqueId()),
      serverSideRowUuid: this.uid(() => uuidv1()),

      waistCircumferenceInInches: this.number(null), // number type of vuex-orm will also store decimals
      timeOfMeasurementInMilliseconds: this.number(null), // refer to /name/db/structure/table.js notes for ROW_END
      notes: this.string(null),
      recordChangedByUuid: this.string(null),
      recordChangedFromIPAddress: this.string(null),
      recordChangedFromSection: this.string(null),

      ROW_START: this.number(0),
      ROW_END: this.number(2147483648000),
    }
  }
}
