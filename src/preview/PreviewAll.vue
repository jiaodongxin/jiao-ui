<template>
  <div style="padding: 32px; font-family: Arial, Helvetica, sans-serif">
    <h1>组件预览</h1>
    <TButton />
    <TLink />
    <TTable :columns="columns" :loadData="loadData" :pagination="pagination" />
  </div>
</template>
<script setup lang="ts">
import TButton from "../components/TButton/TButton.vue";
import TLink from "../components/TLink/TLink.vue";
import TTable from "../components/TTable/TTable.vue";

const columns = [
  { title: "姓名", dataIndex: "name", key: "name" },
  { title: "年龄", dataIndex: "age", key: "age" },
  { title: "地址", dataIndex: "address", key: "address" },
];

const pagination = {
  current: 1,
  pageSize: 10,
  total: 2,
};

const loadData = async (params: any) => {
  console.log("params", params);
  return {
    data: [
      { name: "张三", age: 28, address: "北京" },
      { name: "李四", age: 32, address: "上海" },
      { name: "张三", age: 28, address: "北京" },
    ],
    total: 2,
  };
};
</script>
