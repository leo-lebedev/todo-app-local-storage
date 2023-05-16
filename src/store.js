import { createStore } from 'vuex';

const STORAGE_KEY = 'task-list';

export default createStore({
    state: {
        tasks: []
    },
    getters: {
        getTaskById: state => id => {
            return state.tasks.find(task => task.id === id);
        }
    },
    mutations: {
        setTasks(state, tasks) {
            state.tasks = tasks;
        },
        addTask(state, task) {
            state.tasks.push(task);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state.tasks));
        },
        updateTask(state, updatedTask) {
            const index = state.tasks.findIndex(task => task.id === updatedTask.id);
            if (index !== -1) {
                state.tasks.splice(index, 1, updatedTask);
                localStorage.setItem(STORAGE_KEY, JSON.stringify(state.tasks));
            }
        },
        deleteTask(state, taskId) {
            state.tasks = state.tasks.filter(task => task.id !== taskId);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state.tasks));
        }
    },
    actions: {
        initializeStore({ commit }) {
            const storedTasks = localStorage.getItem(STORAGE_KEY);
            if (storedTasks) {
                commit('setTasks', JSON.parse(storedTasks));
            }
        },
        addTask({ commit }, task) {
            commit('addTask', {id: Date.now(), ...task });
        },
    }
});
