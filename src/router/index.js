import Vue from "vue";
import VueRouter from "vue-router";
//import Home from '../views/Home.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "authen",
    component: () => import("../components/cAuthen.vue"),
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("../components/cUpdateProgress.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/progress",
    name: "Progress",
    component: () => import("../components/Progress.vue"),
  },
  {
    path: "/xx",
    name: "Member",
    component: () => import("../views/Member.vue"),
  },
  {
    path: "/project",
    name: "Project",
    component: () => import("../views/Project.vue"),
  },
  {
    path: "/complete",
    name: "complete",
    component: () => import("../views/ProjectComplete.vue"),
  },
  {
    path: "/deploy",
    name: "deploy",
    component: () => import("../views/Deploy.vue"),
  },
  {
    path: "/addtask",
    name: "addtask",
    component: () => import("../views/AddTask.vue"),
  },
  {
    path: "/viewproject",
    name: "viewproject",
    component: () => import("../components/cViewProject.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
