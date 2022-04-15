<template>
    <div class="container">
        <h1>{{ msg }}</h1>
        <!-- Formulaires -->
        <form class="form" @submit.prevent="addTodo">
            <div class="form-group">
                <label for="name">Titre</label>
                <input type="text" name="name" v-model="name" placeholder="Nom de la tâche">
            </div>
            <div class="form-group">
                <label for="time">Durée</label>
                <input type="number" name="time" v-model="hours" placeholder="Durée de la mission" min="1">
            </div>
            <div class="form-group">
                <label for="responsable">Responsable</label>
                <select name="responsable" v-model="responsable">
                    <option>Florian</option>
                    <option>Fred</option>
                    <option>Manon</option>
                </select>
            </div>
            <button type="submit">
                Ajouter
            </button>
            <p v-if="errors.length">
                <b>Une erreure est survenue</b>
                <ul>
                    <li v-for="error in errors" :key="error">{{ error }}</li>
                </ul>
            </p>
        </form>
        <!-- Filtres -->
        <div>
            <div v-if="hasTodos" class="footer-taches filters">
                <button :class="{selected: filter === 'all'}"  @click.prevent="filter = 'all'">Toutes</button>
                <button :class="{selected: filter === 'todo'}" @click.prevent="filter = 'todo'">À faire</button>
                <button :class="{selected: filter === 'done'}" @click.prevent="filter = 'done'">Terminées</button>
            </div>
            <div class="footer-taches">
                <span>{{ remainingTodos }} tâches à faire</span>
                <button v-show="doneTodos" @click.prevent="deleteCompleted">Supprimer toutes les tâches</button>
            </div>
        </div>
        <!-- Listes -->
        <div v-if="hasTodos">
            <h2>Tâche à faire</h2>
            <input type="checkbox" v-model="allDone"> Valider toutes les tâches
            <ul class="group-item">
                <li class="item" v-for="todo in filteredTodos" :key="todo.id" :class="{completed: todo.completed, editing: editing === todo}">
                    <div class="item-title">
                        <label>{{ todo.name }}</label>
                    </div>
                    <div class="item-content">
                        <div class="item-done">
                            <input name="done" type="checkbox" v-model="todo.completed">
                            <label for="done">Terminée</label>
                        </div>
                        
                        <div class="item-info">
                            <p>Durée :</p><label>{{ todo.hours }}</label>
                        </div>
                        <div class="item-info">
                            <p>Responsable :</p><label>{{ todo.responsable }}</label>
                        </div>
                        <button @click.prevent="deleteTodo(todo)">Supprimer</button>
                        <button @click="editTodo(todo)">Editer</button>
                        <input 
                            type="text" 
                            class="edit"
                            v-model="todo.name" 
                            v-show="editing === todo" 
                            @keyup.enter="doneEdit" 
                            v-focus="todo === editing"
                            @blur="doneEdit"
                            @keyup.esc="cancelEdit"
                        >
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'

export default {
    name: 'Todolist',
    props: {
        msg: String
    },
    data() {
        return{
            errors: [],
            todos: [],
            name: '',
            hours: '',
            responsable: '',
            editing: null,
            oldTodo: '',
            filter: 'all',
        }
    },
    methods:{
        addTodo() {
            if(this.name && this.hours && this.responsable) {
                this.todos.push({
                    name: this.name,
                    hours: this.hours,
                    responsable: this.responsable,
                    completed: false,
                })
            }
            this.errors = [];
            if (!this.name) {
                this.errors.push('Titre requis.');
            }
            if (!this.hours) {
                this.errors.push('Durée requise.');
            }
            if (!this.responsable) {
                this.errors.push('Responsable requis.');
            }
        },
        deleteTodo(todo) {
            this.todos = this.todos.filter(i => i !== todo)
        },
        deleteCompleted() {
            this.todos = this.todos.filter(todo => !todo.completed)
        },
        editTodo(todo) {
            if(this.editing != todo) {
                this.editing = todo
                this.oldTodo = todo.name
            } else {
                this.cancelEdit()
            }
        },
        doneEdit() {
            this.editing = null
        },
        cancelEdit() {
            this.editing.name = this.oldTodo
            this.doneEdit()
        }
    },
    computed: {
        hasTodos() {
            return this.todos.length > 0
        },
        remainingTodos() {
            return this.todos.filter(todo => !todo.completed).length
        },
        doneTodos() {
            return this.todos.filter(todo => todo.completed).length
        },
        filteredTodos() {
            if(this.filter === 'todo') {
                return this.todos.filter(todo => !todo.completed)
            } else if(this.filter === 'done') {
                return this.todos.filter(todo => todo.completed)
            }
            return this.todos
        },
        allDone: {
            get() {
                return this.remainingTodos === 0
            },
            set(value) {
                this.todos.forEach(todo => {
                    todo.completed = value
                })
            }
        }
    },
    directives: {
        focus(el, value) {
            if(value) {
                Vue.nextTick(() => {
                    el.focus()
                })
            }
        }
    }
}
</script>

<style scoped>
    .container{
        max-width: 1200px;
        width: 100%;
        margin: 0 auto;
    }
    .form{
        display: flex;
        gap: 1rem;
        justify-content: center;
        border: 1px solid #000;
        padding: 1rem;
    }
    .form-group{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
    .group-item{
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    ul{
        list-style: none;
        padding: 0;
    }
    .item{
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
        flex-wrap: wrap;
        background: #fafafa;
        align-items: center;
        border: 1px solid #000;
        padding: 1rem;
        gap: 1rem;
    }
    .item-content{
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        align-items: center;
        gap: 1rem;
    }
    .item-name{
        font-weight: bold;
    }
    .item.completed{
        border-color: yellowgreen;
    }
    .item.editing{
        background: gray;
    }
    .item-done{
        display: flex;
        gap: 5px;
        align-items: center;
    }
    .item-info{
        display: flex;
        gap: 5px;
        align-items: center;
    }
    .item-info p{
        font-weight: bold;
    }
    .footer-taches{
        display: flex;
        gap: 1rem;
        margin-top: 2rem;
    }
    .filters button.selected{
        border: 2px solid red;
    }
</style>
