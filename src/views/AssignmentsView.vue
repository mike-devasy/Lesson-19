<template>
    <div class="container">
        <h2>Призначення подарунків:</h2>
        <ol v-if="!isFriends">
            <li v-for="{ person, present, id } in assignmentsFoolList" :key="id" class="friend">
                <div class="friend-content">
                    <span> {{ person.category }} {{ person.name }} ---- {{ present.title }} </span>
                    <button @click="onDelete(id)">Видалити</button>
                </div>
            </li>
        </ol>
        <div class="new-friend">
            <label>
                Нове призначення
                <select v-model="assignment.personId">
                    <option v-for="friend in getFriendsList" :key="friend.id" :value="friend.id">
                        {{ friend.category }} {{ friend.name }}
                    </option>
                </select>

                <select v-model="assignment.presentId">
                    <option v-for="present in getPresentsList" :key="present.id" :value="present.id">
                        {{ present.title }}
                    </option>
                </select>
            </label>
            <button @click="onAdd(assignment)">Додати</button>
        </div>
    </div>
</template>

<script setup>
import { reactive, onMounted, computed } from 'vue'
import { useAssignmentsStore } from '@/stores/assignments'
import { useFriendsStore } from '@/stores/friends'
import { usePresentsStore } from '@/stores/presents'
 let assignment = reactive({})
 
 const {loadList, deleteItem, addItem, getAssignmentsListById} = useAssignmentsStore()
 const {getFriendsList} = useFriendsStore()
 const {getPresentsList} = usePresentsStore()
 const isFriends = computed(() =>  getFriendsList.length === 0)
    const assignmentsFoolList = computed(() => 
		{
            const friendsList = [...getFriendsList]
            const presentsList = [...getPresentsList]
            return getAssignmentsListById(friendsList, presentsList)
        }) 
 
    onMounted (() => {
        loadList()
				useFriendsStore().loadList()
				usePresentsStore().loadList()
 
    }) 
 
   function onAdd(item) {
            addItem(item)
            assignment = {}
        }
  function onDelete(id) {
		
	deleteItem(id)
        }
</script>

<style lang="scss" scoped>
.friend {
    width: 600px;
    font-size: 25px;
    text-align: left;
    margin: 30px auto;
}
.friend-content {
    width: 500px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
}
 
button {
    cursor: pointer;
    width: 150px;
    font-size: 20px;
    padding: 5px 10px;
}
label {
    font-size: 25px;
}
select {
    width: 200px;
    margin-right: 20px;
    height: 30px;
    font-size: 20px;
}
input {
    margin-right: 20px;
    width: 200px;
}
</style>
