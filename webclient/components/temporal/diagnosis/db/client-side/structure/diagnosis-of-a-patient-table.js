// For docs read webclient/docs/models.md
import clientTblManage from '~/components/non-temporal/crud/manage-rows-of-table-in-client-side-orm.js'

const { v1: uuidv1 } = require('uuid')
let count = 0
const intUniqueId = () => ++count

export default class diagnosis extends clientTblManage {
  static entity = 'tblDiagnosis'

  /* 
    Goal: Change baseurl as per NODE_ENV value. eg: If NODE_ENV == dev then baseurl = "http://localhost:8000" or If NODE_ENV == test then baseurl = "http://ptserver:8000"
    baseurl is defined in nuxt.config.js
    on 3000 json-server runs
    on 8000 nodejs runs along with sequalize
    On 8001 php/lumen/eloquent is running
    
    To check if the api is working you can enter this in the browser:
    http://127.0.0.1:8000/diagnosis/getAll

    To make post request:
    enter http://127.0.0.1:8000/diagnosis/getAll in https://hoppscotch.io/

    Options:
    1. static apiUrl = process.env.baseUrl + '/diagnosis'

  */

  static apiUrl = 'http://localhost:8000/public/api/diagnosis/v20'

  static primaryKey = 'clientSideUniqRowId'

  static fields() {
    return {
      ...super.fields(),

      clientSideUniqRowId: this.uid(() => intUniqueId()), // if this is not set then update based on primary key will not work
      serverSideRowUuid: this.uid(() => uuidv1()),
      ptUuid: this.string(null),
      diagnosis: this.string(''),
      assessment: this.string(''),
      onset: this.string(''),
      priority: this.number(0),
      recordChangedByUuid: this.string(null),
      recordChangedFromIPAddress: this.string(null),
      recordChangedFromSection: this.string(null),

      ROW_START: this.number(0),
      ROW_END: this.number(2147483648000), // this is unix_timestamp value from mariaDB for ROW_END when a record is created new in MariaDB system versioned table.
    }
  }
}

export const diagnosisFormDef = {
  id: 'diagnosis',
  plural: 'diagnosis',
  singular: 'diagnosis',
  fields: [
    { fieldNameInDb: 'diagnosis', fieldNameInUi: 'Diagnosis', fieldType: 'autocomplete', span: 8 },
    { fieldNameInDb: 'assessment', fieldNameInUi: 'Assessment', fieldType: 'textarea', span: 8 },
    { fieldNameInDb: 'onset', fieldNameInUi: 'Onset', fieldType: '', span: 8 },
  ],
  fieldForCheckingIfRowIsEmpty: 'diagnosis',
}
