import * as types from '../mutation-types'
import $http from '../../components/http'
import _ from 'lodash'

const state = {
  isFetching: false,
  lastUpdated: null,
  user: {
    id: 0,
    nick_name: '',
    real_name: '',
    user_name: '',
    img_url: ''
  },
  org: {
    name: '',
    id: 0,
    list: []
  }
}

const getters = {}

const mutations = {
  [types.FETCH_SESSION] (state) {
    state.isFetching = true
  },
  [types.FETCH_SESSION_SUCCESS] (state, { data }) {
    state.isFetching = false
    state.lastUpdated = Date.now()
    state.user = data
  },
  [types.FETCH_SESSION_FAILURE] (state) {
    state.isFetching = false
  },
  [types.SET_SESSION_ORGIZATIONS] (state, { data }) {
    state.org.list = data
    const storeOrgId = window.localStorage.getItem('ampm_org_id')
    let _target = _.find(data, { id: Number(storeOrgId) })
    if (storeOrgId && _target) {
    } else {
      _target = data[0]
    }

    state.org.name = _target.name
    state.org.id = _target.id
  }
}

const actions = {
  updateSession ({ commit, state }) {
    commit(types.FETCH_SESSION)
    $http.get('/users/avatar').then(
      (res) => {
        commit(types.FETCH_SESSION_SUCCESS, { data: res.data })
      },
      () => {
        commit(types.FETCH_SESSION_FAILURE)
      }
    )
  },

  fetchOrginzations ({ commit, state }) {
    $http.get('/auth/corporations').then(
      (res) => {
        commit(types.SET_SESSION_ORGIZATIONS, { data: res.data })
      },
      () => {}
    )
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
