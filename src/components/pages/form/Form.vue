<template lang="html">
    <div class="goods">
        <el-form :model="createForm" :rules="createRules" ref="ruleCreateForm" label-width="120px">
        <div class="section-header">
            <span class="tip"></span>
            基本信息
        </div>
        <div class="section-body">
            <el-form-item label="商品标题" prop="title">
                <el-input v-model="createForm.title" placeholder="请输入商品标题，建议20字以内" style="width:600px;"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="pcate">
                <el-select v-model="createForm.pcate" placeholder="请选择分类" >
                    <el-option v-for="item in cateArr" :label="item.name" :value="item.id" :key="item.id"></el-option>
                </el-select>
                &nbsp;&nbsp;<a href="javascript:void(0)" @click="getCategory(1)"><i class="iconfont icon-shuaxin" ></i></a>
                &nbsp;
                <router-link to="ContentCategoryList">设置类别</router-link>
            </el-form-item>
        </div>
        <div class="split-line"></div>
        <div class="section-header">
            <span class="tip"></span>
            基本信息
        </div>
        <div class="section-body">
            <el-form-item label="商品标题" prop="title">
                <el-input v-model="createForm.title" placeholder="请输入商品标题，建议20字以内" style="width:600px;"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="pcate">
                <el-select v-model="createForm.pcate" placeholder="请选择分类" >
                    <el-option v-for="item in cateArr" :label="item.name" :value="item.id" :key="item.id"></el-option>
                </el-select>
                &nbsp;&nbsp;<a href="javascript:void(0)" @click="getCategory(1)"><i class="iconfont icon-shuaxin" ></i></a>
                &nbsp;
                <router-link to="ContentCategoryList">设置类别</router-link>
            </el-form-item>
        </div>
    </el-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            createForm: {
                title: 'title',
                pcate: null
            },
            cateArr: [],
            createRules: {}
        }
    }
}
</script>

<style lang="scss">
</style>
