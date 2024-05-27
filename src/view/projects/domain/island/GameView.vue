<script>
import "@/assets/game/classes/Boundary.js";
import Sprite from "@/assets/game/classes/Sprite.js";
import NavigableMap from "@/assets/game/classes/NavigableMap.js";
import Boundary from "@/assets/game/classes/Boundary.js"
import Player from "@/assets/game/classes/Player.js"
import {onKeyStroke, onKeyUp} from "@vueuse/core"
import Dialogue from "@/assets/game/classes/Dialogue.js";

export default{
  name: "GameView",
  data(){
    return{
      npcDialogue: "",
    };
  },
  beforeMount(){
    this.Direction = {
      DOWN: 0,
      UP: 1,
      LEFT: 2,
      RIGHT: 3
    };

    this.offset = {
      x: -1150,
      y: -2100
    };

    this.npcs = [];
    this.boundaries = [];
    this.homeIslandArrayMap =  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      1980, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 1980, 0, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 1980, 0, 0, 0, 1980, 1980, 1980, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 1980, 1980, 1980, 1980, 1980, 0, 0, 1980, 1980, 1980, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 0, 1980, 1980, 1980, 1980, 0, 0, 0, 1980, 1980, 1980, 1980, 1980, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 1980, 0, 0, 1980, 0, 0, 0, 0, 1980, 0, 0, 0, 1980, 1980, 0, 0, 1980, 1980, 1980, 1980, 0, 0, 0, 0, 1980, 1980, 1980, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 0, 0, 0, 0, 0, 0, 1980, 0, 1980, 0, 0, 1980, 0, 0, 1980, 0, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 0, 0, 0, 0, 0, 1980, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 1980, 1980, 1980, 1980, 1980, 0, 1980, 0, 0, 0, 0, 1980, 0, 1980, 0, 1980, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 1980, 0, 1980, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 1980, 0, 0, 1980, 1980, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 0, 1980, 0, 0, 0, 0, 1980, 0, 1980, 0, 1980, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 1980, 0, 1980, 0, 1980, 0, 0, 1980, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 1980, 0, 0, 0, 0, 0, 1980, 0, 0, 1980, 1980, 0, 0, 0, 1980, 1980, 1980, 1980, 1980, 1980, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 1980, 1980, 1980, 1980, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 1980, 1980, 1980, 1980, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 1980, 1980, 1980, 0, 0, 1980, 1980, 1980, 0, 0, 1980, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 1980, 1980, 1980, 0, 0, 1980, 1980, 1980, 0, 0, 1980, 1980, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 1980, 1980, 1980, 1980, 0, 1980, 1980, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 1980, 1980, 1980, 0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 0, 0, 0, 0, 0, 1980, 1980, 1980, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 1980, 1980, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 1980, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 1980, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 1980, 0, 0, 0, 0, 0, 1980, 1980, 0, 0, 1980, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 0, 0, 0, 0, 0, 0, 1980, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 1980, 1980, 0, 0, 0, 0, 1980, 0, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 1980, 1980, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 1980, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 1980, 1980, 1980, 0, 0, 1980, 1980, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 1980, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 1980, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 1980, 1980, 1980, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 1980, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 1980, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    this.mapImage = new Image();
    this.mapImage.src = "/game/maps/background1.png";
    this.gameMap = new NavigableMap({
      image: this.mapImage,
      scale: 3,
      mapWidth: 100,
      mapHeight: 70,
      position: {
        x: this.offset.x,
        y: this.offset.y
      }
    });

    this.gameMap.setArrayMap(this.homeIslandArrayMap);
    for(let i = 2; i < 7; ++i){
      let img = new Image();
      img.src = "/game/maps/background" + i + ".png";
      this.gameMap.addFrame(img);
    }
    this.foregroundImage = new Image();
    this.foregroundImage.src = "/game/maps/foreground.png"
    this.foreground = new NavigableMap({
      image: this.foregroundImage,
      scale: 3,
      mapWidth: 100,
      mapHeight: 70,
      position: {
        x: this.offset.x,
        y: this.offset.y
      }
    })

    this.gameMap.arrayMap.forEach((row, i) => {
      row.forEach((symbol, j) => {
        if(symbol === 1980){
          this.boundaries.push(new Boundary({
            position: {
              x: j * 48 + this.offset.x,
              y: i * 48 + this.offset.y
            }
          }))
        }
      })
    });

    this.loadNPCs();

  },
  mounted(){
    this.addMobileRestrictions();

    this.lastMovement = this.Direction.DOWN;
    this.upPressed = false;
    this.downPressed = false;
    this.leftPressed = false;
    this.rightPressed = false;
    this.interactionPressed = false;

    onKeyStroke(['w', 'W', 'ArrowUp'], () => {
      this.upPressed = true;
      this.lastMovement = this.Direction.UP;
    });
    onKeyStroke(['s', 'S', 'ArrowDown'], () => {
      this.downPressed = true;
      this.lastMovement = this.Direction.DOWN;
    });
    onKeyStroke(['a', 'A', 'ArrowLeft'], () => {
      this.leftPressed = true;
      this.lastMovement = this.Direction.LEFT;
    });
    onKeyStroke(['d', 'D', 'ArrowRight'], () => {
      this.rightPressed = true;
      this.lastMovement = this.Direction.RIGHT;
    });
    onKeyStroke(['x', 'Enter', ' '], () => {
      this.interactionPressed = true;
    });
    onKeyUp(['w', 'W', 'ArrowUp'], () => {
      this.upPressed = false;
    });
    onKeyUp(['s', 'S', 'ArrowDown'], () => {
      this.downPressed = false;
    });
    onKeyUp(['a', 'A', 'ArrowLeft'], () => {
      this.leftPressed = false;
    });
    onKeyUp(['d', 'D', 'ArrowRight'], () => {
      this.rightPressed = false;
    });
    onKeyUp(['x', 'Enter', ' '], () => {
      this.interactionPressed = false;
    });

    this.init();
    this.loadPlayer();

    this.interactingNPC = null;
    let prevTime = 0.0;

    const mainLoop = time =>{
      const deltaTime = time - prevTime;
      prevTime = time;

      this.update(deltaTime);
      this.render();

      window.requestAnimationFrame(mainLoop);
    }

    window.requestAnimationFrame(time => {
      prevTime = time;
      window.requestAnimationFrame(mainLoop);
    });

  },
  beforeUnmount(){
    this.removeMobileRestrictions();
  },
  methods: {
    addMobileRestrictions(){
      // Stopping mobile users from accidentally zooming
      const meta = document.createElement("meta");
      meta.name = "viewport";
      meta.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      document.head.appendChild(meta);

      document.querySelectorAll('button').forEach(button => {
        button.addEventListener('touchend', function(e) {
          // Mobile users can't highlight text in buttons
          e.preventDefault();
        });
      });

    },
    removeMobileRestrictions(){
      const meta = document.querySelector("meta[name='viewport']");
      if(meta){
        document.head.removeChild(meta);
      }
      document.querySelectorAll('button').forEach(button => {
        button.removeEventListener('touchend', function(e) {
          e.preventDefault();
        });
      });
    },
    loadPlayer(){
      this.playerImage = new Image();
      this.playerImage.src = "/game/sprites/RedNinja.png";
      this.player = new Player({
        image: this.playerImage,
        direction: this.Direction.DOWN,
        scale: 3,
        framesHorizontal: {max: 4},
        framesVertical: {max: 7},
        position:{
          x: this.gameCanvas.width / 2,
          y: this.gameCanvas.height / 2
        },
        velocity: 1.0
      })

    },
    loadNPCs(){
      const bigfootDialogue = new Dialogue({
        welcome: "Have you seen a sasquatch anywhere around here?",
        playerOptions: {
          option1: "What were you trying to accomplish with this project?",
          option2: "Do you you actually believe in bigfoot?",
          option3: "Are there any interesting insights from this?",
          option4: "Can you show what data you have about sasquatch?"
        },
        responses: {
          one: "This was a project for a Scientific Python class and the goal was simply to explore the dataset. I've come a long was since then and this kind of data exploration has been foundational in machine learning projects.",
          two: "No, not really, but he's kind of iconic and I enjoy working with unusual datasets.",
          three: "Reported sightings were trending up until the mid 2000s, where they sharply decreased. \"Class B,\" far-away, sightings also overtook \"Class A,\" up-close sightings, after this decline.",
          four: "I think I heard a tree-knock..."
        },
        iframeAddress: "/game/iframecontent/bigfoot.html",
        showIframeOn: 4,
      })


      const ufoDialogue = new Dialogue({
        welcome: "Hi! I'm trying to learn about shapes reported in UFO sightings.",
        playerOptions: {
          option1: "What were you trying to accomplish with this project?",
          option2: "Any interesting findings?",
          option3: "How did you try to improve the dataset?",
          option4: "Can you show what data you have about UFOs?",
        },
        responses: {
          one: "This was a project for a Machine Learning class. I was attempting to train a model that could guess the shape of a UFO in a UFO sighting report.",
          two: "Using the Flair sentiment analysis library, average sentiment of the sighting descriptions have increased since 2020. I also made a cool heat-map of sighting locations in the United States.",
          three: "I improved the dataset by consolodating the original shapes into new categories. I was still unable to train a model, but it's possible that a model could never be trained to accurately predict the reported shape if the shapes are effectively random.",
          four: "Sure.",
        },
        iframeAddress: "/game/iframecontent/ufo.html",
        showIframeOn: 4,
      })

      const podcastDialogue = new Dialogue({
        welcome: "If I'm coding, I'm probably listening to a podcast.",
        playerOptions: {
          option1: "What were you trying to accomplish with this project?",
          option2: "So, this really works? How accurate is it?",
          option3: "How did the original dataset determine the political leanings of podcast hosts?",
          option4: "Can you show me the project?",
        },
        responses: {
          one: "Train a Machine Learning model (a Decision Tree) to predict the political leanings of podcast hosts based on: category on Apple, podcast name sentiment, episode title sentiment, description sentiment, and date posted.",
          two: "Yes, the final model had a 78% accuracy on the test data. It also correctly predicted the partisan leanings of all of my favorite podcasts that were not in the training or test data.",
          three: "It's on the Popular Political Podcasts Dataset website and it's frequently updated. Long story short: they use a machine learning model that analyzes the hosts' Twitter/X account activity.",
          four: "Sure."
        },
        iframeAddress: "/game/iframecontent/podcast.html",
        showIframeOn: 4,
      })

      const aerialDialogue = new Dialogue({
        welcome: "I used this Machine Learning model to find the beach!",
        playerOptions: {
          option1: "What were you trying to accomplish with this project?",
          option2: "What are the limitations of this model?",
          option3: "How could you improve this model?",
          option4: "Can you show me the project?",
        },
        responses: {
          one: "This was the capstone project for my first Machine Learning class. The goal was to train a Machine Learning model to categorize aerial pictures. I accomplished this goal: the Random Forest model trained has an accuracy of 91% on the test data!",
          two: "The model only distinguishes between dense residential, medium residential, beach, forest, parking, and desert pictures.",
          three: "This model could be improved by adding more categories and training with more pictures. I trained this model using 1,200 pictures, 200 for each category, and it still took 49 minutes while using my GPU to help with the computations.",
          four: "I also have a Powerpoint that goes more into detail on this project. Ask me more about it in person if you like!"
        },
        iframeAddress: "/game/iframecontent/aerial.html",
        showIframeOn: 4,
      })

      const welcomeDialogue = new Dialogue({
        welcome: "Hi, welcome to Seeking-Employment Island!",
        playerOptions:{
          option1: "What is this island for?",
          option2: "You made this island and everything the residents show me?",
          option3: "Can you tell me about the frameworks/technologies used to make the island?",
          option4: "Can I see your resume."
        },
        responses:{
          one: "I'd like it to act as a portfolio showcasing some of my projects. The residents here will show you my projects if you speak to them!",
          two: "The code for this island and my other projects will also be on my GitHub, username: PolymorphicPeach. The sprites are free sprites downloaded from Itch.io, the artists are credited in the GitHub project.",
          three: "It's mostly raw Javascript and html. The entire site is a Vue.js frontend supported by a Spring Boot backend.",
          four: "Sure, just click the Resume tab at the top of this page."
        }
      })

      const fishermanImage = new Image();
      fishermanImage.src = "/game/sprites/Fisherman_idle.png"
      this.fisherman = new Sprite(
          {
            image: fishermanImage,
            scale: 2,
            direction: this.Direction.DOWN,
            dialogue: aerialDialogue,
            framesHorizontal: {max: 4},
            framesVertical: {max: 4},
            position: {
              x: this.offset.x + 1300,
              y: this.offset.y + 2400
            }
          });
      this.npcs.push(this.fisherman);
      this.boundaries.push(this.fisherman.getCollisionBox());

      const alchemistImage = new Image();
      alchemistImage.src = "/game/sprites/Alchemist_idle.png"
      this.alchemist = new Sprite(
          {
            image: alchemistImage,
            scale: 2,
            direction: this.Direction.DOWN,
            dialogue: ufoDialogue,
            framesHorizontal: {max: 4},
            framesVertical: {max: 4},
            position: {
              x: this.offset.x + 1600,
              y: this.offset.y + 1350
            }
          });
      this.npcs.push(this.alchemist);
      this.boundaries.push(this.alchemist.getCollisionBox());

      const barmaidImage = new Image();
      barmaidImage.src = "/game/sprites/Barmaid_idle.png"
      this.barmaid = new Sprite(
          {
            image: barmaidImage,
            scale: 2,
            direction: this.Direction.DOWN,
            dialogue: bigfootDialogue,
            framesHorizontal: {max: 4},
            framesVertical: {max: 4},
            position: {
              x: this.offset.x + 3350,
              y: this.offset.y + 1200
            }
          });
      this.npcs.push(this.barmaid);
      this.boundaries.push(this.barmaid.getCollisionBox());

      const blacksmithImage = new Image();
      blacksmithImage.src = "/game/sprites/Blacksmith_idle.png"
      this.blacksmith = new Sprite(
          {
            image: blacksmithImage,
            scale: 2,
            direction: this.Direction.DOWN,
            dialogue: podcastDialogue,
            framesHorizontal: {max: 4},
            framesVertical: {max: 4},
            position: {
              x: this.offset.x + 2500,
              y: this.offset.y + 700
            }
          });
      this.npcs.push(this.blacksmith);
      this.boundaries.push(this.blacksmith.getCollisionBox());

      const merchantImage = new Image();
      merchantImage.src = "/game/sprites/Merchant_idle.png"
      this.merchant = new Sprite(
          {
            image: merchantImage,
            scale: 2,
            direction: this.Direction.DOWN,
            dialogue: welcomeDialogue,
            framesHorizontal: {max: 4},
            framesVertical: {max: 4},
            position: {
              x: this.offset.x + 1650,
              y: this.offset.y + 2150
            }
          });
      this.npcs.push(this.merchant);
      this.boundaries.push(this.merchant.getCollisionBox());

    },
    init(){
      this.setCanvasAndContext();
      this.movables = [...this.boundaries, ...this.npcs, this.gameMap, this.foreground];
    },
    setCanvasAndContext(){
      this.gameCanvas = document.getElementById("gameCanvas");
      this.gameCanvas.width = 1024;
      this.gameCanvas.height = 576;
      this.context = this.gameCanvas.getContext("2d");
      this.context.fillStyle = "blue";
      this.context.fillRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);
    },
    update(deltaTime){
      this.controller(deltaTime);
      this.checkNPCs();
    },
    render(){
      this.context.clearRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);
      this.gameMap.draw(this.context);
      this.player.draw(this.context);

      this.boundaries.forEach(boundary => {
        boundary.draw(this.context);
      })

      this.npcs.forEach(npc => {
        npc.draw(this.context);
      })

      this.foreground.draw(this.context);
    },
    controller(deltaTime){
      if(this.upPressed || this.downPressed || this.leftPressed || this.rightPressed){
        //==================================================================
        //  Player is moving, reset interactingNPC and hide dialogue menu
        //==================================================================
        if(this.interactingNPC !== null){
          this.interactingNPC = null;
          document.getElementById("npcDialogueBox").style.opacity = "0";
          document.getElementById("npcDialogueBox").style.pointerEvents = "none";
          const iframe = document.getElementById("projectsIframe");
          iframe.style.opacity = "0";
          iframe.style.pointerEvents = "none";
        }

        this.player.moving = true;
      }
      else{
        this.player.moving = false;
      }

      if(this.upPressed && this.lastMovement === this.Direction.UP){
        this.player.direction = this.Direction.UP;
        //========================
        // Collision Check
        //========================
        this.checkCollision(this.Direction.UP);

        if(this.player.moving){
          this.movables.forEach(movable => {
            movable.position.y += this.player.velocity * deltaTime / this.gameMap.scale;
          });
        }
      }
      else if(this.leftPressed && this.lastMovement === this.Direction.LEFT){
        this.player.direction = this.Direction.LEFT;
        //========================
        // Collision Check
        //========================
        this.checkCollision(this.Direction.LEFT);

        if(this.player.moving){
          this.movables.forEach(movable => {
            movable.position.x += this.player.velocity * deltaTime / this.gameMap.scale;
          });
        }
      }
      else if(this.downPressed && this.lastMovement === this.Direction.DOWN){
        this.player.direction = this.Direction.DOWN;
        //========================
        // Collision Check
        //========================
        this.checkCollision(this.Direction.DOWN);

        if(this.player.moving){
          this.movables.forEach(movable => {
            movable.position.y -= this.player.velocity * deltaTime / this.gameMap.scale;
          });
        }
      }
      else if(this.rightPressed && this.lastMovement === this.Direction.RIGHT){
        this.player.direction = this.Direction.RIGHT;
        //========================
        // Collision Check
        //========================
        this.checkCollision(this.Direction.RIGHT);

        if(this.player.moving){
          this.movables.forEach(movable => {
            movable.position.x -= this.player.velocity * deltaTime / this.gameMap.scale;
          });
        }
      }
    },
    checkCollision(movementDirection){
      for(let i = 0; i < this.boundaries.length; ++i){
        const boundary = this.boundaries[i];

        if(movementDirection === this.Direction.UP){
          if(this.rectangularCollision({
            rectangle1: this.player,
            rectangle2: {
              ...boundary,
              position: {
                x: boundary.position.x,
                y: boundary.position.y + 3
              }
            }
          })){
            this.player.moving = false;
            break;
          }
        }
        else if(movementDirection === this.Direction.LEFT){
          if(this.rectangularCollision({
            rectangle1: this.player,
            rectangle2: {
              ...boundary,
              position: {
                x: boundary.position.x + 3,
                y: boundary.position.y
              }
            }
          })){
            this.player.moving = false;
            break;
          }
        }
        else if(movementDirection === this.Direction.DOWN){
          if(this.rectangularCollision({
            rectangle1: this.player,
            rectangle2: {
              ...boundary,
              position: {
                x: boundary.position.x,
                y: boundary.position.y - 3
              }
            }
          })){
            this.player.moving = false;
            break;
          }
        }
        else if(movementDirection === this.Direction.RIGHT){
          if(this.rectangularCollision({
            rectangle1: this.player,
            rectangle2: {
              ...boundary,
              position: {
                x: boundary.position.x - 3,
                y: boundary.position.y
              }
            }
          })){
            this.player.moving = false;
            break;
          }
        }
      }
    },
    rectangularCollision({rectangle1, rectangle2}){
      return(rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
          rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
          rectangle1.position.y + 8 <= rectangle2.position.y + rectangle2.height &&
          rectangle1.position.y + rectangle1.height > rectangle2.position.y);
    },
    onScreenUp(held){
      if(held === 'true') {
        this.lastMovement = this.Direction.UP;
        this.upPressed = true;
        this.interactionPressed = false;
      }
      else{
        //this.lastMovement = this.Direction.UP;
        this.upPressed = false;
      }
    },
    onScreenDown(held){
      if(held === 'true') {
        this.lastMovement = this.Direction.DOWN;
        this.downPressed = true;
        this.interactionPressed = false;
      }
      else{
        //this.lastMovement = this.Direction.DOWN;
        this.downPressed = false;
      }
    },
    onScreenLeft(held){
      if(held === 'true') {
        this.lastMovement = this.Direction.LEFT;
        this.leftPressed = true;
        this.interactionPressed = false;
      }
      else{
        //this.lastMovement = this.Direction.LEFT;
        this.leftPressed = false;
      }
    },
    onScreenRight(held){
      if(held === 'true') {
        this.lastMovement = this.Direction.RIGHT;
        this.rightPressed = true;
        this.interactionPressed = false;
      }
      else{
        //this.lastMovement = this.Direction.RIGHT;
        this.rightPressed = false;
      }
    },
    onScreenTalk(){
      this.interactionPressed = true;
    },
    checkNPCs(){
      if(this.interactionPressed){
        for(let i = 0; i < this.npcs.length; ++i){
          const npcBoundary = this.npcs[i]

          if(this.player.direction === this.Direction.UP){
            if(this.player.position.x + (this.player.width / 2) > npcBoundary.position.x
                && this.player.position.x < npcBoundary.position.x + npcBoundary.width){

              if(this.player.position.y < npcBoundary.position.y + npcBoundary.height
                  && this.player.position.y > npcBoundary.position.y){

                // ===========================================================================
                //   Sprite Sheet for NPCs are in different order, cannot use this.Direction
                // ===========================================================================
                this.npcs[i].direction = 0;
                this.interactingNPC = this.npcs[i];
                break;
              }
            }
          }
          else if(this.player.direction === this.Direction.LEFT){
            if (this.player.position.y > npcBoundary.position.y * 0.90
                && this.player.position.y < npcBoundary.position.y + npcBoundary.height - (this.player.height / 2)){

              if(this.player.position.x - (npcBoundary.position.x + npcBoundary.width) <= 3
                  && this.player.position.x > npcBoundary.position.x){

                this.npcs[i].direction = 2;
                this.interactingNPC = this.npcs[i];
                break;
              }
            }
          }
          else if(this.player.direction === this.Direction.DOWN){
            if(this.player.position.x + (this.player.width / 3) > npcBoundary.position.x
                && this.player.position.x < npcBoundary.position.x + npcBoundary.width){

              if(this.player.position.y + this.player.height + 3 > npcBoundary.position.y
                  && this.player.position.y < npcBoundary.position.y){

                this.npcs[i].direction = 3;
                this.interactingNPC = this.npcs[i];
                break;
              }
            }
          }
          else if(this.player.direction === this.Direction.RIGHT){
            if (this.player.position.y > npcBoundary.position.y * 0.90
                && this.player.position.y < npcBoundary.position.y + npcBoundary.height - (this.player.height / 2)){

              if(npcBoundary.position.x - this.player.position.x - this.player.width <= 3
                  && this.player.position.x < npcBoundary.position.x){

                this.npcs[i].direction = 1;
                this.interactingNPC = this.npcs[i];
                break;
              }
            }
          }
        }
      }
      //================================
      //   Player interacting with NPC
      //================================
      if(this.interactingNPC !== null){
        document.getElementById("npcDialogueBox").style.opacity = "1";
        document.getElementById("npcDialogueBox").style.pointerEvents = "visible";
        document.getElementById("button1").innerText = this.interactingNPC.dialogue.playerOptions.option1;
        document.getElementById("button2").innerText = this.interactingNPC.dialogue.playerOptions.option2;
        document.getElementById("button3").innerText = this.interactingNPC.dialogue.playerOptions.option3;
        document.getElementById("button4").innerText = this.interactingNPC.dialogue.playerOptions.option4;

      }
    },
    processPlayerResponse(response){
      // Player must not be moving
      if(!this.player.moving && this.interactingNPC !== null){

        switch(response){
          case 1:
            this.npcDialogue = this.interactingNPC.dialogue.responses.one;
            break;

          case 2:
            this.npcDialogue = this.interactingNPC.dialogue.responses.two;
            break;

          case 3:
            this.npcDialogue = this.interactingNPC.dialogue.responses.three;
            break;

          case 4:
            this.npcDialogue = this.interactingNPC.dialogue.responses.four;
            break;
        }

        if(this.interactingNPC.dialogue.showIframeOn === response){
          const iframe = document.getElementById("projectsIframe");
          iframe.src = this.interactingNPC.dialogue.iframeAddress;
          iframe.style.opacity = "1";
          iframe.style.pointerEvents = "visible";
        }
      }
    },
  }
}
</script>

<template>
  <div id="outerColumn" class="">

    <div id="gameScreen" class="relative flex items-center justify-center">
      <div class="container pb-2 mx-auto">
        <canvas id="gameCanvas" class="w-full h-full max-w-[1024px] max-h-[576px];"></canvas>
      </div>
      <!-- iframe for showing projects -->
      <iframe
          src=""
          id="projectsIframe"
          allowTransparency="true"
          class="absolute w-full h-full max-w-[900px] max-h-[500px] opacity-100 pointer-events-none">
      </iframe>
    </div>


    <div id="controls" class="flex flex-row flex-wrap-reverse pl-3 md:pl-20 w-full max-w-[1024px]">

      <div class="basis-5/6">
        <div id="npcDialogueBox" class="flex flex-row" style="opacity: 0; pointer-events: none;">

          <div id="npcDialogue" class="basis-1/2">
            <!-- Using reactivity, should have done this a bit more probably-->
            {{npcDialogue}}
          </div>

          <div id="playerDialogueSelectionBox" class="basis-1/2 rows-4 gap-1 justify-items-end">
            <div id="playerDialogueButtons">
              <button id="button1" class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 border border-blue-700 rounded w-full" @pointerdown="processPlayerResponse(1)">
                Option1
              </button>
              <button id="button2" class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 border border-blue-700 rounded w-full" @pointerdown="processPlayerResponse(2)">
                Option2
              </button>
              <button id="button3" class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 border border-blue-700 rounded w-full" @pointerdown="processPlayerResponse(3)">
                Option3
              </button>
              <button id="button4" class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 border border-blue-700 rounded w-full" @pointerdown="processPlayerResponse(4)">
                Option4
              </button>
            </div>
          </div>
        </div>

      </div>

      <div class="basis-1/6 min-w-[100px]">
        <div class="grid grid-cols-12 grid-flow-row gap-1">
          <div id="gameController" class="col-start-1 col-span-1 grid grid-rows-4 grid-flow-col gap-1 p-1">
            <!-- Row #1: Up Button alone centered -->
            <div class="flex justify-center">
              <button class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                      id="upButton"
                      @pointerdown="onScreenUp('true')"
                      @pointerup="onScreenUp('false')"
                      @pointerleave="onScreenUp('false')"
                      @mouseup="onScreenUp('false')">
                UP
              </button>
            </div>
            <!-- Row #2: Left and Right Buttons centered -->
            <div class="flex justify-center grid-rows-1 grid-flow-col gap-1">
              <button class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                      id="leftButton"
                      @pointerdown="onScreenLeft('true')"
                      @pointerup="onScreenLeft('false')"
                      @pointerleave="onScreenLeft('false')"
                      @mouseup="onScreenLeft('false')">
                LEFT
              </button>
              <button class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                      id="rightButton"
                      @pointerdown="onScreenRight('true')"
                      @pointerup="onScreenRight('false')"
                      @pointerleave="onScreenRight('false')"
                      @mouseup="onScreenRight('false')">
                RIGHT
              </button>
            </div>
            <!-- Row #3: Down Button alone centered -->
            <div class="flex justify-center">
              <button class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                      id="downButton"
                      @pointerdown="onScreenDown('true')"
                      @pointerup="onScreenDown('false')"
                      @pointerleave="onScreenDown('false')"
                      @mouseup="onScreenDown('false')">
                DOWN
              </button>
            </div>
            <!-- Row #4 Talk Button alone, aligned left -->
            <div class="flex justify-start">
              <button class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                      id="downButton"
                      @pointerdown="onScreenTalk()">
                TALK
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>