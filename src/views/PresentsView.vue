<template>
  <div class="container">
    <h3 style="font-size: 25px;margin-bottom: 10px;">Список подарунків:</h3>
    <ol>
      <li v-for="{ title, id } in getPresentsList" :key="id" class="present">
        <div class="present-content">
          <span>{{ title }} </span>
          <button @click="onDelete(id)">Видалити</button>
        </div>
      </li>
    </ol>
    <div class="new-present">
      <label>
        Новий подарунок
        <input v-model="newPresent.title" type="text" />
      </label>
      <button @click="onAdd(newPresent)">Додати</button>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted} from 'vue'
import { usePresentsStore } from '@/stores/presents'
import { storeToRefs } from 'pinia'
const presentStore = usePresentsStore()
const { getPresentsList } = storeToRefs(presentStore)
const { deleteItem, addItem, loadList } = presentStore
let newPresent = reactive({})
// let isDeleting = ref(false)
// let friendIdToDelete = ref(null)

onMounted (() => {
  loadList()
})
function onDelete(id) {
  deleteItem(id)
}
function onAdd(item) {
  addItem(item)
  newPresent = {}
}
</script>

<style lang="scss" scoped>
.container{
	display: flex;
	flex-direction: column;
	gap: 20px;
}
.present {
  width: 200px;
  font-size: 20px;
  text-align: left;
  margin: 0 auto;
  // display: flex;
  // gap: 10px;
}
.present-content {
  width: 300px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.new-friend {
}
button {
  cursor: pointer;
  width: 150px;
  font-size: 20px;
  padding: 5px 10px;
}
label {
  margin-right: 20px;
  font-size: 25px;
}
input {
  font-size: 20px;
  width: 200px;
  height: 30px;
}
</style>
