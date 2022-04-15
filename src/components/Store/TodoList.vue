<template>
    <div>
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
            <input type="checkbox" :value="allDone"> Valider toutes les tâches
            <ul class="group-item">
                <li class="item" v-for="todo in filteredTodos" :key="todo.id" :class="{completed: todo.completed, editing: editing === todo}">
                    <div class="item-title">
                        <label>{{ todo.name }}</label>
                    </div>
                    <div class="item-content">
                        <div class="item-done">
                            <input name="done" type="checkbox" :value="todo.completed">
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
                            :value="todo.name" 
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
        methods: {
            deleteTodo(todo) {
                this.$store.dispatch('deleteTodo', todo)
            },
            deleteCompleted() {
                this.$store.dispatch('deleteCompleted')
            },
            editTodo(todo) {
                this.$store.dispatch('editTodo', todo)
            },
            doneEdit() {
                this.$store.dispatch('doneEdit')
            },
            cancelEdit() {
                this.$store.dispatch('cancelEdit')
            }
        },
        computed: {
            hasTodos() {
                return this.$store.getters.hasTodos
            },
            remainingTodos() {
                return this.$store.getters.remainingTodos
            },
            doneTodos: {
                get: function () {
                    return this.$store.getters.doneTodos;
                },
                set: function (doneTodos) {
                    this.$store.getters.doneTodos = doneTodos;
                }
            },
            filteredTodos() {
                return this.$store.getters.filteredTodos
            },
            filter: {
                get: function () {
                    return this.$store.state.filter;
                },
                set: function (filter) {
                    this.$store.state.filter = filter;
                }
            },
            editing() {
                return this.$store.getters.editing
            },
            oldTodo() {
                return this.$store.getters.oldTodo
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
