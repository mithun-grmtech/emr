// This file is structured based on https://github.com/client-side/vuex-orm-examples-nuxt/tree/master/store
import Vue from 'vue'
import Vuex from 'vuex'

import VuexclientSideTblOfCtSearchPhrases from '@vuex-orm/plugin-search'
import VuexORM from '@vuex-orm/core'
import axios from 'axios'
import VuexORMAxios from '@vuex-orm/plugin-axios'

// Ref: https://github.com/eldomagan/vuex-orm-localforage#installation
import vstOfTabsAndDialogInEditLayerModule from '~/components/core/edit-layer-tabs/vst-of-tabs-and-dialog-in-cl'

import VueStateOfFeedDrawerModule from '~/components/ptinfo-combined/left-screen-extension/vue-state-of-feed-drawer'
import VueStateOfMapDrawerModule from '~/components/ptinfo-combined/map/vue-state-of-map-drawer'
import VueStateOfDeletedDrawerModule from '~/components/core/ct-deleted-rows/vue-state-of-deleted-drawer'

import database from '~/store/import-tables-and-register-to-client-side-database'

// Ref: https://stackoverflow.com/a/62247034
const { v1: uuidv1 } = require('uuid')
VuexORM.use(VuexORMAxios, { axios })
VuexORM.use(VuexclientSideTblOfCtSearchPhrases, {
  tokenize: true, // Ref: https://github.com/client-side/plugin-search#configurations needed so "goal add" works when list has "add goal"
  matchAllTokens: true, // needed so "goal add" shows only opyion 1 when list has "add goal" and "multi rate goal"
  threshold: 0.1, // height and weight are very close and need to be distinguished so set thresold to .1
})

Vue.use(uuidv1)

Vue.use(Vuex)

const createStore = () => {
  return new Vuex.Store({
    state: () => ({}),
    modules: {
      vstObjTabsInCL: vstOfTabsAndDialogInEditLayerModule,

      // Full form: view state object feed drawer
      vstObjFeedDrawer: VueStateOfFeedDrawerModule,
      vstObjMapDrawer: VueStateOfMapDrawerModule,
      vstObjDeletedDrawer: VueStateOfDeletedDrawerModule,
    },
    plugins: [VuexORM.install(database)],
  })
}

export default createStore
