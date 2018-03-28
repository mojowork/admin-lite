<template>
    <div>
      <div class="section-header">
        <span class="tip"></span>
        基本信息
      </div>
      <div class="section-body">
        <div class="base-info">
          <span>小程序名称：<strong>{{ shopName }}</strong></span>
          <span>开通时间：<strong>{{ shopBeginTime }}~{{ shopEndTime }}</strong></span>
          <span>版本：<strong>{{ shopType }}</strong></span>
          <span><el-button type="primary" @click="recharge" size="small">立即续费</el-button></span>
        </div>
      </div>


      <div class="section-header">
        <span class="tip"></span>
        数据概览
        <el-popover
          ref="explain"
          placement="left-start"
          title="提示"
          width="250"
          trigger="hover"
          content="用户总数：所有访问过您小程序的用户数">
          <slot>
            <div>用户总数：所有访问过您小程序的用户数</div>
            <div>订单总数：您的小程序所有的订单数</div>
            <div>昨天订单数：昨天的新增订单</div>
            <div>成交总金额：通过小程序成交的总金额</div>
          </slot>
        </el-popover>
        <i class="iconfont icon-wenhao" v-popover:explain style="float:right;margin-right: 30px;color:gray"></i>
      </div>
      <div class="section-body">
        <div class="data-preview">
            <div class="data-item float-item" v-for="i in 4"></div>
        </div>
      </div>

      <el-row :gutter="30">
        <el-col :span="12">
          <div>
            <div class="section-header">
              <span class="tip"></span>
              用户增长趋势
            </div>
            <div class="content">
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div>
            <div class="section-header">
              <span class="tip"></span>
              订单增长趋势
            </div>
            <div class="content">
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
</template>

<script>
    export default {
      name: "dashboard",
      data() {
          return {
            shopName: '未知事物研究所',
            shopBeginTime: '2013-3-28',
            shopEndTime: '2013-6-28',
            shopType: '平行世界部门',
          }
      },
      mounted() {
      },
      methods: {
        recharge() {},
      }
    }
</script>

<style scoped lang="scss">
  .base-info{
    width: 1000px;
    margin: 30px 0;
    span{
      font-size: 14px;
      color: gray;
      margin-right:35px;
      strong{
        font-size: 16px;
        color: #333;
      }
    }
  }
  .data-preview{
    display: flex;
    margin: 30px 0;
    justify-content: space-around;

    .data-item{
      width: 220px;
      height: 170px;
      overflow: hidden;
      display: inline-block;
      margin: 0 10px;
      box-sizing: border-box;
      border-radius: 5px;
      position: relative;
      color: #fff;
      background-color: #50bfff;
    }
  }
</style>
