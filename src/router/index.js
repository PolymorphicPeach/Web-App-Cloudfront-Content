import {createRouter, createWebHistory} from "vue-router"
import HomeView from "@/view/home/HomeView.vue";
import ContactView from "@/view/contact/ContactView.vue";
import ResumeView from "@/view/resume/ResumeView.vue";
import SkillsView from "@/view/skills/SkillsView.vue";
import ProjectsView from "@/view/projects/ProjectsView.vue";
import AerialClassificationView from "@/view/projects/domain/aerial_classification/AerialClassificationView.vue";
import CryptographyView from "@/view/projects/domain/cryptography/CryptographyView.vue";
import GameView from "@/view/projects/domain/island/GameView.vue";
import DungeonGameView from "@/view/projects/domain/dungeon/DungeonGameView.vue";
import QualManagementView from "@/view/projects/domain/qual_management_demo/QualManagementView.vue";
import AlgorithmsView from "@/view/projects/domain/algorithms/AlgorithmsView.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: HomeView
    },
    {
        path: "/resume",
        name: "Resume",
        component: ResumeView
    },
    {
        path: "/contact",
        name: "Contact",
        component: ContactView
    },
    {
        path: "/skills",
        name: "Skills",
        component: SkillsView
    },
    {
        path: "/projects",
        name: "Projects",
        component: ProjectsView
    },
    {
        path: "/projects/aerial",
        name: "AerialClassification",
        component: AerialClassificationView
    },
    {
        path: "/projects/game",
        name: "Game",
        component: GameView
    },
    {
        path: "/projects/cryptography",
        name: "Cryptography",
        component: CryptographyView
    },
    {
        path: "/projects/dungeon",
        name: "DungeonGame",
        component: DungeonGameView
    },
    {
        path: "/projects/qualmanagement",
        name: "QualManagement",
        component: QualManagementView
    },
    {
        path: "/projects/algorithms",
        name: "Algorithms Animations",
        component: AlgorithmsView
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;