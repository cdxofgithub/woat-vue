<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.user_code"
        placeholder="用户编码"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-select
        v-model="listQuery.status"
        placeholder="审核状态"
        clearable
        class="filter-item"
        style="width: 130px"
      >
        <el-option
          v-for="item in calendarTypeOptions"
          :key="item.key"
          :label="item.name"
          :value="item.status"
        />
      </el-select>
      <el-date-picker
        v-model="listQuery.created_at"
        class="filter-item"
        type="date"
        format="yyyy-MM-dd"
        placeholder="选择创建日期"
      />
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >
        搜索
      </el-button>
      <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
      >
        导出
      </el-button>
      <el-checkbox
        v-model="showReviewer"
        class="filter-item"
        style="margin-left:15px;"
        @change="tableKey = tableKey + 1"
      >
        审核人
      </el-checkbox>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column
        label="用户编码"
        align="center"
        width="140"
        :class-name="getSortClass('id')"
      >
        <template slot-scope="{row}">
          <span>{{ row.user_code }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="图片"
        align="center"
        min-width="150"
      >
        <template slot-scope="{row}">
          <div class="demo-image__preview">
            <el-image 
              style="width: 100px; height: 100px"
              :src="row.attachments.attachment_path" 
              fit="contain"
              :preview-src-list="[row.attachments.attachment_path]"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="点赞数"
        sortable="custom"
        prop="like_num"
        align="center"
        width="150"
      >
        <template slot-scope="{row}">
          <span
            v-if="row.like_num"
            class="link-type"
            @click="handleFetchPv(row.pageviews)"
          >{{ row.like_num }}</span>
          <span v-else>0</span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="showReviewer"
        label="审核人"
        width="150"
        align="center"
      >
        <template slot-scope="{row}">
          <span style="color:red;font-weight: 700">{{ row.reviewer }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="审核状态"
        class-name="status-col"
        width="150"
      >
        <template slot-scope="{row}">
          <el-tag :type="row.status | typeFilter">
            {{ row.status | nameFilter }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="审核通过时间"
        width="150"
        align="center"
      >
        <template slot-scope="{row}">
          <span>{{ row.review_at | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="更新时间"
        width="150"
        align="center"
      >
        <template slot-scope="{row}">
          <span>{{ row.updated_at | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="创建时间"
        prop="created_at"
        sortable="custom"
        width="150"
        align="center"
      >
        <template slot-scope="{row}">
          <span>{{ row.created_at | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="操作"
        align="center"
        width="300"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{row,$index}">
          <el-button
            v-if="row.status!='1'"
            size="mini"
            type="success"
            @click="handleModifyStatus(row, 1)"
          >
            审核通过
          </el-button>
          <el-button
            v-if="row.status!='2'"
            size="mini"
            type="danger"
            @click="handleModifyStatus(row, 2)"
          >
            审核未通过
          </el-button>
          <el-button
            v-if="row.status!='deleted'"
            size="mini"
            type="info"
            @click="handleDelete(row,$index)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.page_size"
      @pagination="getList"
    />
  </div>
</template>

<script>
import { getOpusList, reviewOpus } from "@/api/article";
import waves from "@/directive/waves"; // waves directive
import { parseTime } from "@/utils";
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination

const calendarTypeOptions = [
  { status: 0, name: "待审核", type: 'info' },
  { status: 1, name: "审核通过", type: 'success' },
  { status: 2, name: "审核未通过", type: 'danger' },
];


export default {
  name: "ComplexTable",
  components: { Pagination },
  directives: { waves },
  filters: {
    typeFilter(status) {
      const option = calendarTypeOptions.filter((e) => {
        return e.status == status
      })
      return option[0].type
    },
    nameFilter(status) {
      const option = calendarTypeOptions.filter((e) => {
        return e.status == status
      })
      return option[0].name
    }
  },
  data() {
    return {
      calendarTypeOptions,
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        page_size: 10,
        user_code: undefined,
        status: undefined,
        created_at: undefined,
        sortable: {
          prop: null,
          order: null
        }
      },
      showReviewer: false,

      dialogFormVisible: false,
      dialogStatus: "",
      textMap: {
        update: "Edit",
        create: "Create"
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [
          { required: true, message: "type is required", trigger: "change" }
        ],
        timestamp: [
          {
            type: "date",
            required: true,
            message: "timestamp is required",
            trigger: "change"
          }
        ],
        title: [
          { required: true, message: "title is required", trigger: "blur" }
        ]
      },
      downloadLoading: false
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      let listQuery = this.listQuery 
      if (listQuery.created_at) listQuery.created_at = parseTime(listQuery.created_at, "{y}-{m}-{d}")
      getOpusList(listQuery).then(response => {
        this.list = response.data;
        this.total = response.meta.total;

        setTimeout(() => {
          this.listLoading = false;
        }, 1000);
      }).catch(() => {

      })
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },
    handleModifyStatus(row, status) {
      reviewOpus({
        opus_id: row.id,
        status
      }).then (() => {
        this.$message({
          message: "操作成功",
          type: "success"
        });
        row.status = status
        row.reviewer = this.$store.getters.name
      }).catch(() => {
      })
    },
    handleDelete(row, index) {
      this.$notify({
        title: "Success",
        message: "Delete Successfully",
        type: "success",
        duration: 2000
      });
      this.list.splice(index, 1);
    },
    sortChange(data) {
      const { prop, order } = data;
      this.listQuery.sortable = {
        prop,
        order
      };
      this.handleFilter()
    },


    sortByID(order) {
      if (order === "ascending") {
        this.listQuery.sort = "+id";
      } else {
        this.listQuery.sort = "-id";
      }
      this.handleFilter();
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: "",
        timestamp: new Date(),
        title: "",
        status: "published",
        type: ""
      };
    },
    handleCreate() {
      this.resetTemp();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    createData() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024; // mock a id
          this.temp.author = "vue-element-admin";
          createArticle(this.temp).then(() => {
            this.list.unshift(this.temp);
            this.dialogFormVisible = false;
            this.$notify({
              title: "Success",
              message: "Created Successfully",
              type: "success",
              duration: 2000
            });
          });
        }
      });
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row); // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp);
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    updateData() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.temp);
          tempData.timestamp = +new Date(tempData.timestamp); // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateArticle(tempData).then(() => {
            const index = this.list.findIndex(v => v.id === this.temp.id);
            this.list.splice(index, 1, this.temp);
            this.dialogFormVisible = false;
            this.$notify({
              title: "Success",
              message: "Update Successfully",
              type: "success",
              duration: 2000
            });
          });
        }
      });
    },
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData;
        this.dialogPvVisible = true;
      });
    },
    handleDownload() {
      this.downloadLoading = true;
      import("@/vendor/Export2Excel").then(excel => {
        const tHeader = ["用户编码", "点赞数", "审核人", "审核状态", "审核通过时间", "更新时间", "创建时间"];
        const filterVal = [
          "用户编码",
          "点赞数",
          "审核人",
          "审核状态",
          "审核通过时间",
          "更新时间",
          "创建时间",
        ];
        const data = this.formatJson(filterVal);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: "table-list"
        });
        this.downloadLoading = false;
      });
    },
    formatJson(filterVal) {
      return this.list.map(v =>
        filterVal.map(j => {
          if (j === "timestamp") {
            return parseTime(v[j]);
          } else {
            return v[j];
          }
        })
      );
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort;
      return sort === `+${key}` ? "ascending" : "descending";
    }
  }
};
</script>
