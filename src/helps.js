/* eslint-disable */
const fs = require("fs");
const path = require("path");

const TSTemplate = (p1, p2, filename) => {
  return `
export default {
  name:"${p2}",
  path:"/main/${p1}/${p2}",
  component:()=>import("views/main/${p1}/${p2}/${filename}.vue"),
  children: [],
}`;
};

const VUETemplate = (p1, p2, filename) => {
  return `<template>
<div class="${p2}">${filename}</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name:"${p2}",
  setup() {
    return {};
  },
});
</script>
<style scoped lang="scss"></style>`;
};

const files = {
  analysis: {
    overview: "Overview",
    dashboard: "DashBoard",
  },
  system: {
    user: "User",
    role: "Role",
    deparment: "Deparment",
    menu: "Menu",
  },
  product: {
    category: "Category",
    goods: "Goods",
  },
  story: {
    chat: "Chat",
    list: "List",
  },
};

const path1 = Object.keys(files);
for (const p1 of path1) {
  const files_2 = files[p1];
  const path2 = Object.keys(files_2);
  for (const p2 of path2) {
    const filename = files_2[p2];

    const relPath_1 = "./views/main/" + p1 + "/" + p2;
    const relPath_2 = "./router/main/" + p1 + "/" + p2;
    if (!fs.existsSync(path.resolve(__dirname, relPath_1))) {
      fs.mkdir(
        relPath_1,
        {
          recursive: true,
        },
        (err, path) => {},
      );
    }
    if (!fs.existsSync(path.resolve(__dirname, relPath_2))) {
      fs.mkdir(
        relPath_2,
        {
          recursive: true,
        },
        (err, path) => {},
      );
    }
    fs.writeFileSync(
      relPath_1 + `/${filename}.vue`,
      VUETemplate(p1, p2, filename),
      {
        flag: "w+",
      },
      () => {},
    );
    fs.writeFileSync(
      relPath_2 + `/${p2}.ts`,
      TSTemplate(p1, p2, filename),
      {
        flag: "w+",
      },
      () => {},
    );
  }
}
