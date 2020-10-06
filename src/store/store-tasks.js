import Vue from "vue";
import { uid } from 'quasar';

const state = {
    tasks: {
        'id1': {
            id: 1,
            name: "Go to shop",
            completed: true,
            dueDate: "1399/06/01",
            dueTime: "17:29",
        },
        'id2': {
            id: 2,
            name: "Buy apples",
            completed: false,
            dueDate: "1398/07/01",
            dueTime: "16:30",
        },
        'id3': {
            id: 3,
            name: "Buy Bananas",
            completed: false,
            dueDate: "1400/07/01",
            dueTime: "16:30",
        },
        'id4': {
            id: 4,
            name: "Goto Bed",
            completed: false,
            dueDate: "1400/07/01",
            dueTime: "16:30",
        },
        'id5': {
            id: 1,
            name: "Go to shop",
            completed: true,
            dueDate: "1399/06/01",
            dueTime: "17:29",
        },
        'id7': {
            id: 2,
            name: "Buy apples",
            completed: false,
            dueDate: "1398/07/01",
            dueTime: "16:30",
        },
        'id8': {
            id: 3,
            name: "Buy Bananas",
            completed: false,
            dueDate: "1400/07/01",
            dueTime: "16:30",
        },
        'id10': {
            id: 4,
            name: "Goto Bed",
            completed: false,
            dueDate: "1400/07/01",
            dueTime: "16:30",
        },
        'id12': {
            id: 1,
            name: "Go to shop",
            completed: true,
            dueDate: "1399/06/01",
            dueTime: "17:29",
        },
        'id16': {
            id: 2,
            name: "Buy apples",
            completed: false,
            dueDate: "1398/07/01",
            dueTime: "16:30",
        },
        'id13': {
            id: 3,
            name: "Buy Bananas",
            completed: false,
            dueDate: "1400/07/01",
            dueTime: "16:30",
        },
        'id17': {
            id: 4,
            name: "Goto Bed",
            completed: false,
            dueDate: "1400/07/01",
            dueTime: "16:30",
        },
    },
    search: '',
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
    }
}

const actions = {
    updateTask({ commit }, payload) {
        commit('updateTask', payload)
    },
    deleteTask({ commit }, id) {
        commit('deleteTask', id)
    },
    addTask({ commit }, task) {
        let id = uid()
        let payload = {
            id: id,
            task: task
        }
        commit('addTask', payload)
    },
    setSearch({ commit }, searchPhrase) {
        commit('setSearch', searchPhrase)
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