<template>
    <div>
      <section>
        <el-form  :model="queryForm" ref="queryForm"  class="query-form" label-width="80px">
          <el-row class="form">
          <el-col :span="9">
              <el-form-item label="商品名称">
                <el-input v-model="queryForm.gname" placeholder="请输入商品名称"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="9">
              <el-form-item label="商品类别">
                <el-select v-model="queryForm.cid" placeholder="请选择分类">
                  <el-option v-for="item in categoryList" :label="item.name" :value="item.id" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
          </el-col>
          <el-col :span="6">
              <el-form-item label="">
                  <el-button type="primary" style="margin-left:15px;margin-bottom:20px;" @click="searchGoods" icon="search">查询商品</el-button>
              </el-form-item>
          </el-col>
          </el-row>
        </el-form>
      </section>
      <section class="table">
            <el-table
                :data="tableData"
                style="width: 100%"
                border>
                <!-- <el-table-column
                  type="selection"
                  width="55">
                </el-table-column> -->
                <el-table-column
                        prop="title"
                        label="商品名称"
                        align="center"
                        width="150">
                    <template  slot-scope="scope">
                        <a size="small"  @click="editGoods(scope.row.id)">{{scope.row.title}}</a>
                    </template>
                </el-table-column>

                <el-table-column
                        prop="cover"
                        label="商品图片"
                        align="center"
                        min-width="150">
                        <template slot-scope="scope">
                            <img />
                        </template>
                </el-table-column>
                <el-table-column
                        prop="category"
                        label="类别"
                        align="center"
                        width="100">
                    <template slot-scope="scope">
                        <span>{{scope.row.category.name}}</span>
                    </template>
                </el-table-column>

                <el-table-column
                        prop="total"
                        label="总库存（件）"
                        align="center"
                        width="110">
                </el-table-column>
                <el-table-column
                        prop="createtime"
                        label="创建时间"
                        align="center"
                        width="140">
                </el-table-column>
                <el-table-column
                        prop="action"
                        width="300"
                        align="center"
                        label="操作">
                    <template slot-scope="scope">
                        <el-button  @click="editGoods(scope.row.id)" size="mini" type="primary" icon="edit">编辑</el-button>
                        <el-button  @click="stopSaleGoods(scope.row.id)" size="mini" type="warning" icon="arrow-down">下架</el-button>
                        <el-button  @click="startSaleGoods(scope.row.id)" size="mini" type="success" icon="arrow-up">上架</el-button>
                        <el-button  @click="delGoods(scope.row.id)" size="mini" type="danger" icon="delete">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="my-pagination">
                 <el-pagination
                        :current-page="pageIndex"
                        :page-size="pageSize"
                        layout="total, prev, pager, next"
                        :total="total"
                        @current-change="handlePageChange">
                </el-pagination>
            </div>
            <div style="margin-top:20px;">
                <el-button  type="primary" icon="plus" @click="goAddGoods"> 添加商品 </el-button>
            </div>
        </section>
    </div>

</template>

<script>
    export default {
        data() {
            return {
                queryForm: { // 查询数据
                    gname: '',
                    cid: 0
                },
                categoryList: [],

                tableData: [],
                pageIndex: 1,  // 分页
                pageSize: 15,
                total: 0,

            }
        },
        created() {
          this.getGoodsList()
        },

        methods: {
          getGoodsList() {
            this.$http.get('/goods/getList',{
              pageIndex: this.pagesIndex,
              pageSize: this.pageSize
            }).then(res => {
              this.tableData = res.data;
              this.total = res.data.length;
              // console.log(res.data)
            })
          },
          handlePageChange(pageIndex) {
            this.pageIndex = pageIndex;
            this.getGoodsList();
          },
          editGoods() {},
          searchGoods() {},
          stopSaleGoods() {},
          startSaleGoods() {},
          delGoods() {},
          goAddGoods() {},
        }
    }

</script>

<style lang="less" scoped>
  .query-form{
      margin-bottom: 20px;
      padding-left: 25px;
      padding-top:25px;
      background-color: #ecf8ff;
      .el-input{
          width:320px;
      }
      .el-select{
          width:320px;
      }
  }
  .table{
    // background-color: #fff;
  }
</style>
