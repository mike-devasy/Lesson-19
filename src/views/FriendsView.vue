<template>
  <div class="container">
    <h3>Список друзів:</h3>
    <ol>
      <li v-for="{ name, category, id } in getFriendsList" :key="id" class="friend">
        <div class="friend-content">
          <span>{{ category }} {{ name }}</span>
          <button @click="onShow(id)">Видалити</button>
        </div>
      </li>
      <div v-if="isDeleting" style="padding-right: 15px;">
        <p style="font-size: 20px;margin-bottom: 10px;color: white;">Видалити всі призначення с цім ім'ям ?</p>
        <button @click="onDeleteAll(id)" style="margin-right: 20px;">Так</button>
        <button @click="onDelete(id)">Тільки им'я</button>
      </div>
    </ol>

    <div class="new-friend">
      <label>
        <span>Новий друг</span>
        <input
          v-model="newFriend.category"
          type="text"
          class="family"
          placeholder="Ступінь рідства"
        />
        <input v-model="newFriend.name" type="text" placeholder="Им'я" />
      </label>
      <button @click="onAdd(newFriend)" class="button-friend">Додати</button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useFriendsStore } from '@/stores/friends'
import { storeToRefs } from 'pinia'
import { useAssignmentsStore } from '@/stores/assignments'
const { deleteAssignmentByFriend } = useAssignmentsStore()
const friendsStore = useFriendsStore()
const { getFriendsList , friendsList} = storeToRefs(friendsStore)
const { deleteItem, addItem, loadList } = friendsStore
let newFriend = reactive({})
let isDeleting = ref(false)
let friendIdToDelete = ref(null)
onMounted(() => {
	loadList()
})
 
function onShow(id) {
  isDeleting.value = true
  friendIdToDelete.value = id
}
function onDelete() {
  if (friendIdToDelete.value) {
    const friendId = friendIdToDelete.value;
    const index = friendsList.value.findIndex((friend) => friend.id === friendId);
    if (index !== -1) {
      friendsList.value.splice(index, 1);
    }
 
    friendIdToDelete.value = null
  }
  isDeleting.value = false
}
function onDeleteAll() {
  if (friendIdToDelete.value) {
    deleteAssignmentByFriend(friendIdToDelete.value)
    deleteItem(friendIdToDelete.value)
    onDelete(friendIdToDelete.value)
    friendIdToDelete.value = null
  }
  isDeleting.value = false
}
function onAdd(item) {
  addItem(item)
  newFriend = {}
}
 
</script>

<style lang="scss" scoped>
.container{
	display: flex;
flex-direction: column;
}
.friend {
	
  width: 400px;
  font-size: 20px;
  text-align: left;
  margin: 0 auto;
}
.new-friend{
	margin-top: 30px;
	width: 570px;
	display: flex;
	flex-wrap: wrap;
	gap: 20px;
 
}
.button-friend{
	margin-right: 0;
}
 
.friend-content {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

button {
  cursor: pointer;
  width: 150px;
  font-size: 20px;
  padding: 5px 10px;
  // margin-right: 20px;
}
label {
	display: flex;
	gap: 20px;
	width: 600px;
  // margin-right: 40px;
  font-size: 25px;
}
input {
	display: inline-block;
  // margin-right: 5px;
  font-size: 20px;
  width: 200px;
  height: 30px;
}
</style>
