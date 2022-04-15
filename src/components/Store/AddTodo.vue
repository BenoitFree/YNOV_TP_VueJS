<template>
    <form class="form" @submit.prevent="addTodo">
        <div class="form-group">
            <label for="name">Titre</label>
            <input type="text" name="name" :value="name" placeholder="Nom de la tâche">
        </div>
        <div class="form-group">
            <label for="time">Durée</label>
            <input type="number" name="time" :value="hours" placeholder="Durée de la mission" min="1">
        </div>
        <div class="form-group">
            <label for="responsable">Responsable</label>
            <select name="responsable" :value="responsable">
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
</template>

<script>
    export default {
        methods: {
            addTodo() {
                this.$store.dispatch('addTodo')
            }
        },
        computed: {
            name() {
                return this.$store.getters.name
            },
            hours() {
                return this.$store.getters.hours
            },
            responsable() {
                return this.$store.getters.responsable
            },
            errors() {
                return this.$store.getters.errors
            }
        }
    }
</script>

<style scoped>
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