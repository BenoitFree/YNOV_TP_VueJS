import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        errors: [],
        todos: [
            {
                name: "george",
                hours: 23,
                responsable: 'Fred',
                commpleted: false
            }
        ],
        name: '',
        hours: '',
        responsable: '',
        editing: null,
        oldTodo: '',
        filter: 'all',
    },
    mutations: {
        getTodo(state, todo) {
            state.todos = todo
        },
        addTodo(state) {
            if(state.name && state.hours && state.responsable) {
                state.todos.push({
                    name: state.name,
                    hours: state.hours,
                    responsable: state.responsable,
                    completed: false,
                })
            }
            state.errors = [];
            if (!state.name) {
                state.errors.push('Titre requis.');
            }
            if (!state.hours) {
                state.errors.push('Durée requise.');
            }
            if (!state.responsable) {
                state.errors.push('Responsable requis.');
            }
        },
        deleteTodo(state, todo) {
            state.todos = state.todos.filter(i => i !== todo)
        },
        deleteCompleted(state) {
            state.todos = state.todos.filter(todo => !todo.completed)
        },
        editTodo(state, todo) {
            if(state.editing != todo) {
                state.editing = todo
                state.oldTodo = todo.name
            } else {
                state.cancelEdit()
            }
        },
        doneEdit(state) {
            state.editing = null
        },
        cancelEdit(state) {
            state.editing.name = state.oldTodo
            state.doneEdit()
        }
    },
    actions:{
        getTodo({commit}, todo) {
            commit('getTodo', todo)
        },
        addTodo({commit}){
            commit('addTodo')
        },
        deleteTodo({commit}, todo) {
            commit('deleteTodo', todo)
        },
        deleteCompleted({commit}) {
            commit('deleteCompleted')
        },
        editTodo({commit}, todo) {
            commit('editTodo', todo)
        },
        doneEdit({commit}) {
            commit('doneEdit')
        },
        cancelEdit({commit}) {
            commit('cancelEdit')
        }
    },
    getters: {
        name: state => state.name,
        hours: state => state.hours,
        responsable: state => state.responsable,
        errors: state => state.errors,
        filter: state => state.filter,
        editing: state => state.editing,
        oldTodo: state => state.oldTodo,
        hasTodos: state => state.todos.length > 0,
        remainingTodos: state => state.todos.filter(todo => !todo.completed).length,
        doneTodos: state => state.todos.filter(todo => todo.completed).length,
        filteredTodos: state => {
            if(state.filter === 'todo') {
                return state.todos.filter(todo => !todo.completed)
            } else if(state.filter === 'done') {
                return state.todos.filter(todo => todo.completed)
            }
            return state.todos
        }
    }
})
export default store;