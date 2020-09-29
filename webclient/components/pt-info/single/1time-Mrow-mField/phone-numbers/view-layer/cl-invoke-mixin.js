// Reference implementation

// Ref: https://stackoverflow.com/questions/43841778/vue-js-how-to-use-in-mixins-in-single-file-template
import clientSideTable from '~/components/pt-info/single/1time-Mrow-1Field/reminder/db/client-side/structure/reminders-of-a-patient-table.js'

export default {
  methods: {
    mxOpenAddCtInEditLayer() {
      this.$store.commit('mtfShowNewFirstTabInEditLayerFromSearchPhrase', {
        searchTerm: 'add phone number',
      })
    },
    mxOpenMultiEditCtInEditLayer() {
      this.$store.commit('mtfShowNewFirstTabInEditLayerFromSearchPhrase', {
        searchTerm: 'multi edit phone numbers',
      })
    },
    mxOpenDDialog() {
      let confirmMessage = 'Are you sure you want to delete all the selected phone numbers?'
      if (this.daSelectedRemForDelete.length === 0) {
        confirmMessage = 'No phoneNumber selected. Please select at least one phoneNumber.'
      }

      this.$confirm(confirmMessage, 'Multi delete', {
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
        type: 'warning',
      })
        .then(async () => {
          if (this.daSelectedRemForDelete.length > 0) {
            const status = await clientSideTable.fnSendMultiDeleteDataToServer(
              this.daSelectedRemForDelete
            )
            if (status.success > 0) {
              this.$message({
                type: 'success',
                message: status.success + ' phoneNumber deleted.',
              })
            }
            if (status.failed > 0) {
              this.$message({
                type: 'error',
                message: status.failed + ' phoneNumber failed to delete. Please try again later.',
              })
            }
          }
          console.log('daSelectedRemForDelete=====>', this.daSelectedRemForDelete)
        })
        .catch(() => {
          console.log('multi delete cancelled')
        })
    },
    async mxOpenTrashCanCtInEditLayer() {
      const deletedRows = await clientSideTable.fnGetDeletedRows()
      const arDrawerData = []
      deletedRows.forEach((item) => {
        const arRow = []
        arRow.content = item.description
        const date = new Date(item.ROW_END * 1000)
        arRow.deletedAt = date.toLocaleString()

        arDrawerData.push(arRow)
      })
      console.log('deletedRows====>', deletedRows)
      this.$store.commit('mtfSetDeletedDrawerValue', {
        visibility: true,
        drawerTitle: 'Deleted phone numbers',
        drawerData: arDrawerData,
      })
    },
    mxOpenEditCtInEditLayer(pOrmDataRowId) {
      /*
       We need rowID of vuexORM inside the change ct. Since change ct needs the exiting Desc of the reminber to change
       Option 1: Send the whole data row
       Option 2: Send just the ID in a prop.
        +ves:
          1. At some places I may need to call change where I have the phoneNumber ID but
          i do not have the remainder of the data row. Hence this makes the Change Ct possible
          to use at other places
          2. When I send a paramter it is like calling a function. Sending the whole data row
          is like working on a gloal variable. So other Cts can also modify this global variable.
      */
      const payload = { searchTerm: 'edit phone number', pPropsToGiveToCt: pOrmDataRowId }
      this.$store.commit('mtfShowNewFirstTabInEditLayerFromSearchPhrase', payload)
    },
    mxOpenDPrompt(pOrmDataRowId) {
      const arResultsFromOrm = clientSideTable.find(pOrmDataRowId)

      this.$prompt(arResultsFromOrm.description, 'Delete phone number', {
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
        inputPlaceholder: 'Enter delete note',
      })
        .then(async ({ value }) => {
          const status = await clientSideTable.fnSendDeleteDataToServer(
            pOrmDataRowId,
            arResultsFromOrm.uuid,
            value
          )
          if (status === 1) {
            this.$message({
              type: 'success',
              message: 'Reminder deleted.',
            })
          } else {
            this.$message({
              type: 'error',
              message: 'Something went wrong. Please try again later.',
            })
          }
          console.log('delete status ======> ', status)
        })
        .catch(() => {
          console.log('Delete cancelled')
        })
    },
    mxHandleSelectionForDelete(val) {
      this.daSelectedRemForDelete = val
    },
  },
}
