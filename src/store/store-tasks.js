import Vue from 'vue'
import { uid, Notify } from 'quasar'
import { fireStoreDb, firebaseAuth } from '../boot/firebase';
import { showErrorMessage } from '../functions/function-show-error-message';


const state = {
  tasks: {
    // 'ID1': {
    //   name: "Go to shop",
    //   completed: false,
    //   dueDate: '2019/07/06',
    //   dueTime:'18:30'
    // },
    // 'ID2': {
    //   name: "Get bananas",
    //   completed: false,
    //   dueDate: '2019/07/13',
    //   dueTime:'20:30'
    // },
    // 'ID3': {
    //   name: "Get apples",
    //   completed: false,
    //   dueDate: '2019/07/19',
    //   dueTime:'09:30'
    // }
  },
  search: '',
  tasksDownloaded: false
}

const mutations = {
  updateTask(state, payload) {
    Object.assign(state.tasks[payload.id], payload.updates)
  },
  deleteTask(state, id) {
    Vue.delete(state.tasks, id)
  },
  addTask(state, payload) {
    Vue.set(state.tasks, payload.id, payload.task)
  },
  setSearch(state, value) {
    state.search = value
  },
  setTasksDownloaded(state, value) {
    state.tasksDownloaded = value
  },
  clearTasks(state) {
    state.tasks = {}
  }
}

const actions = {
  updateTask({ dispatch }, payload) {
    dispatch('fbUpdateTask', payload)
  },
  deleteTask({ dispatch }, id) {
    dispatch('fbDeleteTask', id)
  },
  addTask({ dispatch }, task) {
    let taskId = uid()
    let payload = {
      id: taskId,
      task: task
    }
    dispatch('fbAddTask', payload)
  },
  setSearch({ commit }, value) {
    commit('setSearch', value)
  },
  fbReadData({ commit }) {
    let userId = firebaseAuth.currentUser.uid
    let tasksRef = fireStoreDb.collection('users').doc(userId).collection('tasks')
    tasksRef.onSnapshot(snapshot => {
      snapshot.forEach(doc => {
        commit('addTask', {
          id: doc.id,
          task: doc.data()
        })
      })
    })
    commit('setTasksDownloaded', true)
  },
  fbAddTask({ }, payload) {
    let userId = firebaseAuth.currentUser.uid
    let tasksRef = fireStoreDb.collection('users').doc(userId).collection('tasks')
    tasksRef.doc(payload.id).set(payload.task)
    .then(() => {
      Notify.create('Task added!')
    })
    .catch(error => {
      showErrorMessage(error)
    })
  },
  fbUpdateTask({ }, payload) {
    let userId = firebaseAuth.currentUser.uid
    let tasksRef = fireStoreDb.collection('users').doc(userId).collection('tasks')
    tasksRef.doc(payload.id).update(payload.updates)
    .then(() => {
      let keys = Object.keys(payload.updates)
      console.log(keys)
      if (!(keys.includes('completed') && keys.length == 1)) {
        Notify.create('Task edited!')
      }
    })
    .catch(error => {
      showErrorMessage(error)
    })
  },
  fbDeleteTask({ commit }, taskId) {
    let userId = firebaseAuth.currentUser.uid
    let tasksRef = fireStoreDb.collection('users').doc(userId).collection('tasks')
    tasksRef.doc(taskId).delete()
    .then(() => {
      commit('deleteTask', taskId)
    })
    .then(() => {
      Notify.create('Task deleted!')
    })
  }
}

const getters = {
  tasksTodo: (state, getters) => {
    let tasksFiltered = getters.tasksFiltered
    let tasks = {}
    Object.keys(tasksFiltered).forEach(function (key) {
      let task = tasksFiltered[key]
      if (!task.completed) {
        tasks[key] = task
      }
    })
    return tasks
  },
  tasksCompleted: (state, getters) => {
    let tasksFiltered = getters.tasksFiltered
    let tasks = {}
    Object.keys(tasksFiltered).forEach(function (key) {
      let task = tasksFiltered[key]
      if (task.completed) {
        tasks[key] = task
      }
    })
    return tasks
  },
  tasksFiltered: (state) => {
    let tasksFiltered = {}
    if (state.search) {
      Object.keys(state.tasks).forEach(function (key) {
        let task = state.tasks[key], taskNameLowerCase = task.name.toLowerCase(), searchLowerCase = state.search.toLowerCase()
        if (taskNameLowerCase.includes(searchLowerCase)) {
          tasksFiltered[key] = task
        }
      })
      return tasksFiltered
    }
    return state.tasks
  }
}


export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
