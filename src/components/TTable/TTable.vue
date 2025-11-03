<template>
  <div class="t-table">
    <el-table
      ref="tableRef"
      :data="tableData"
      :row-key="rowKey"
      :size="size"
      v-loading="loading"
      @selection-change="onSelectChange"
      style="width: 100%"
    >
      <el-table-column
        v-for="col in columns"
        :key="col.dataIndex"
        :prop="col.dataIndex"
        :label="col.title"
        :width="col.width"
        :sortable="col.sorter ? 'custom' : false"
        :formatter="col.customRender"
      />
    </el-table>
    <div class="t-table-pagination">
      <el-pagination
        v-if="pagination"
        :current-page="pagination.current"
        :page-size="pagination.pageSize"
        :total="pagination.total"
        layout="prev, pager, next"
        @current-change="onPageChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onMounted } from "vue";
import type { PropType } from "vue";
const props = defineProps({
  columns: {
    type: Array as PropType<any[]>,
    required: true,
  },
  loadData: {
    type: Function as PropType<(params: any) => Promise<any>>,
    required: true,
  },
  rowKey: {
    type: [String, Function] as PropType<string | ((row: any) => any)>,
    default: "id",
  },
  size: {
    type: String as PropType<"default" | "small" | "large">,
    default: "default",
  },
  rowSelection: {
    type: Object as PropType<any>,
    default: () => ({}),
  },
  pagination: {
    type: Object as PropType<{
      current: number;
      pageSize: number;
      total: number;
    }>,
    default: null,
  },
});

const tableRef = ref();
const tableData = ref<any[]>([]);
const loading = ref(false);
const selectedRowKeys = ref<any[]>([]);
const selectedRows = ref<any[]>([]);
const innerPagination = ref(props.pagination ? { ...props.pagination } : null);

const fetchData = async (extraParams = {}) => {
  loading.value = true;
  try {
    const params = {
      ...(innerPagination.value || {}),
      ...extraParams,
    };
    const res = await props.loadData(params);
    tableData.value = res.data || res || [];
    if (innerPagination.value && res.total !== undefined) {
      innerPagination.value.total = res.total;
    }
  } finally {
    loading.value = false;
  }
};

const onSelectChange = (rows: any[]) => {
  selectedRows.value = rows;
  selectedRowKeys.value = rows.map((row) =>
    typeof props.rowKey === "function" ? props.rowKey(row) : row[props.rowKey]
  );
  // 事件同步
  // @ts-ignore
  emit("update:selectedRowKeys", selectedRowKeys.value);
  // @ts-ignore
  emit("update:selectedRows", selectedRows.value);
  // @ts-ignore
  emit("select-change", {
    selectedRowKeys: selectedRowKeys.value,
    selectedRows: selectedRows.value,
  });
};

const onPageChange = (page: number) => {
  if (innerPagination.value) {
    innerPagination.value.current = page;
    fetchData();
  }
};

const emit = defineEmits([
  "update:selectedRowKeys",
  "update:selectedRows",
  "select-change",
]);

onMounted(() => {
  fetchData();
});

watch(
  () => props.pagination,
  (val) => {
    if (val) innerPagination.value = { ...val };
  }
);
</script>

<style lang="scss" scoped>
.t-table {
  background: #fff;
  padding: 24px;
}
.t-table-pagination {
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
}
</style>
