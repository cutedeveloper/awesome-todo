import Vue from "vue";
import { uid } from 'quasar';
import { firebaseAuth, firebaseDb } from 'boot/firebase'

const state = {
    tasks: {
    },
    search: '',
    tasksDownloaded: false
}

const mutations = {
    updateTask(state, payload) {
        Object.assign(state.tasks[payload.id], payload.updates)
    },
    deleteTask(state, id) {
        console.log('delete', id);
        Vue.delete(state.tasks, id);
    },
    addTask(state, payload) {
        console.log('submit', payload)
        Vue.set(state.tasks, payload.id, payload.task)
    },
    setSearch(state, searchPhrase) {
        state.search = searchPhrase
    },
    setTasksDownloaded(state, value) {
        state.tasksDownloaded = value
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
        let id = uid()
        let payload = {
            id: id,
            task: task
        }
        dispatch('fbAddTask', payload)
    },
    setSearch({ commit }, searchPhrase) {
        commit('setSearch', searchPhrase)
    },
    fbReadData({ commit }) {
        let currentUser = firebaseAuth.currentUser;
        let tasks = firebaseDb.ref('tasks/' + currentUser.uid)

        tasks.once('value', snapshot => {
            commit('setTasksDownloaded', true)
        })
        tasks.on('child_added', snapshot => {
            let task = snapshot.val()
            let payload = {
                id: snapshot.key,
                task: task
            }
            commit('addTask', payload)
        })

        tasks.on('child_changed', snapshot => {
            let task = snapshot.val()
            let payload = {
                id: snapshot.key,
                updates: task
            }

            commit('updateTask', payload)
        })

        tasks.on('child_removed', snapshot => {
            commit('deleteTask', snapshot.key)
        })
    },
    fbAddTask({}, payload) {
        let currentUser = firebaseAuth.currentUser;
        let taskRef = firebaseDb.ref('tasks/' + currentUser.uid + '/' + payload.id)
        taskRef.set(payload.task)
    },
    fbUpdateTask({}, payload) {
        let currentUser = firebaseAuth.currentUser;
        let taskRef = firebaseDb.ref('tasks/' + currentUser.uid + '/' + payload.id)
        taskRef.update(payload.updates)
    },
    fbDeleteTask({}, taskId) {
        let currentUser = firebaseAuth.currentUser;
        let taskRef = firebaseDb.ref('tasks/' + currentUser.uid + '/' + taskId)
        taskRef.remove()
    }
}

const getters = {
    tasksFiltered: (state) => {
        let tasksFiltered = {}
        if (state.search) {
            Object.keys(state.tasks).forEach(function (key) {
                let task = state.tasks[key],
                    taskNameLowerCase = task.name.toLowerCase(),
                    searchLowerCase = state.search.toLowerCase()
                if (taskNameLowerCase.includes(searchLowerCase)) {
                    tasksFiltered[key] = task
                }
            })
            return tasksFiltered
        }
        return state.tasks
    },
    tasksTodo: (state, getters) => {
        let tasksFiltered = getters.tasksFiltered
        let tasks = {}
        Object.keys(tasksFiltered).forEach(function (key) {
            let task = state.tasks[key]
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
            let task = state.tasks[key]
            if (task.completed) {
                tasks[key] = task
            }
        })
        return tasks
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}