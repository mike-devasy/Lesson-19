import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import PresentsView from '@/views/PresentsView.vue'

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/friends",
    name: "friends",
		component: () =>
		import("../views/FriendsView.vue"),
  },
  {
    path: "/presents",
    name: "presents",
		component: () =>
		import("../views/PresentsView.vue"),
  },
  {
    path: "/assignments",
    name: "assignments",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import("../views/AssignmentsView.vue"),
 
  },
 
];

const router = createRouter({
	history: createWebHistory('/'),
  // history: createWebHistory(process.env.BASE_URL),
  routes,
});
 

export default router;
