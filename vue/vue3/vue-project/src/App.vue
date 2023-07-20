<script lang="ts" setup>
import { effect } from "vue";
import InfiniteList from "./components/InfiniteList.vue";

const songs: Array<any> = []; // 列表数据
const initData = () => {
  for (let index = 0; index < 1000; index++) {
    const element = index;
    songs.push({
      title: `歌曲${element}`,
      idx: index
    });
  }
};

effect(() => {
  initData();
});
</script>

<template>
  <infinite-list :listData="songs">
    <template #default="{ listItem }">
      <div>{{ listItem.title }}</div>
      <!-- ... -->
    </template>
  </infinite-list>
</template>
