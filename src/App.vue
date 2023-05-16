<template>
    <div class="container">
        <h1>Список задач</h1>
        <form @submit.prevent="addTask">
            <input type="text" v-model="newTask" placeholder="Новая задача" required>
            <button type="submit">Добавить задачу</button>
        </form>
        <input type="text" v-model="searchQuery" placeholder="Поиск задач">
        <ul>
            <li v-for="task in filteredTasks" :key="task.id">
                <input type="checkbox" v-model="task.completed" @change="updateTask(task)">
                <span :class="{ completed: task.completed }">{{ task.title }}</span>
                <button @click="deleteTask(task.id)">Удалить</button>
            </li>
        </ul>
    </div>
</template>

<script setup>
import {ref, computed, onMounted} from 'vue';
import { useStore } from 'vuex';

    const store = useStore();

    const newTask = ref('');
    const searchQuery = ref('');

    const tasks = computed(() => store.state.tasks);

    const filteredTasks = computed(() => {
        const query = searchQuery.value.toLowerCase();
        return tasks.value.filter(task => task.title.toLowerCase().includes(query));
    });

    const addTask = () => {
        if (newTask.value.trim() === '') return;

        store.dispatch('addTask', { title: newTask.value, completed: false });
        newTask.value = '';
    };

    const updateTask = task => {
        store.commit('updateTask', task);
    };
    const deleteTask = taskId => {
        store.commit('deleteTask', taskId);
    };

    onMounted(() => {
        store.dispatch('initializeStore');
    })
</script>

<style>
.container {
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
}

h1 {
    font-size: 24px;
    margin-bottom: 20px;
}

form {
    margin-bottom: 20px;
}

input[type="text"] {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 10px;
}

button {
    padding: 8px 16px;
    background-color: #4caf50;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}

.completed {
    text-decoration: line-through;
}

button.delete {
    margin-left: 10px;
    background-color: #f44336;
}

span {
    margin-right: 10px;
}

</style>
