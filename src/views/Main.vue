<template>
	<div class="container">
    <!-- 头部 -->
		<header class="header">
			<div class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
        <transition name="title" mode="out-in">
          <img v-if="!collapsed" :src="brandImg" alt="">
        </transition>
        <transition name="title" mode="out-in">
          <img v-if="collapsed" :src="shortBrandImg">
			  </transition>
			</div>
			<div class="app-info">
				<div class="tools" @click.prevent="collapse">
					<i class="iconfont icon-menu"></i>
				</div>
			</div>
			<div class="userinfo">
				<el-dropdown trigger="hover">
					<span class="el-dropdown-link userinfo-inner">我的工作台<i class="el-icon-caret-bottom"></i></span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item>小程序详情</el-dropdown-item>
						<el-dropdown-item>切换小程序</el-dropdown-item>
						<el-dropdown-item divided @click.native="logout">退出小程序</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</div>
		</header>
		<el-col :span="24" class="main">
      <!--导航菜单-->
			<aside :class="collapsed?'menu-collapsed':''">
				<el-menu :default-active="$route.path" @open="handleopen" @close="handleclose" @select="handleselect" class="el-menu-vertical-demo"
					 unique-opened router :collapse="collapsed"
           background-color="#304156" text-color="#fff" active-text-color="#409EFF">
					<template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
						<el-submenu :index="index+''" v-if="!item.unique">
							<template slot="title"><i :class="item.icon"class="menu-icon"></i>
								<transition name="title" mode="out-in">
									<span v-if="!collapsed">{{item.meta&&item.meta.title}}</span>
								</transition>
							</template>
							<el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">{{child.meta&&child.meta.title}}</el-menu-item>
						</el-submenu>
						<el-menu-item v-if="item.unique&&item.children.length>0" :index="item.children[0].path"><i :class="item.icon"></i>{{item.children[0].meta&&item.children[0].meta.title}}</el-menu-item>
					</template>
				</el-menu>
			</aside>
      <!-- 内容区域 -->
			<section class="content-container">
				<el-col :span="24" class="breadcrumb-container">
					<el-breadcrumb separator="/" class="breadcrumb-inner">
						<transition-group name="breadcrumb">
							<el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
								{{ item.meta&&item.meta.title }}
							</el-breadcrumb-item>
						</transition-group>
					</el-breadcrumb>
				</el-col>
				<el-col :span="24" class="content-wrapper">
					<transition name="fade" mode="out-in">
						<router-view></router-view>
					</transition>
				</el-col>
			</section>
		</el-col>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				brandImg: 'https://weapp-1253522117.image.myqcloud.com//image/20170816/6cff8d98453df6fd.png',
        shortBrandImg:'https://weapp-1253522117.image.myqcloud.com//image/20180327/9b059f0353baffb2.png',
				userAvatar: '',
				userName: '',
			}
		},
		computed: {
			collapsed() {
				return this.$store.getters.getCollapsed
			}
		},
		methods: {
			handleopen() {},
			handleclose() {},
			handleselect () {},
			logout() {},
			//折叠导航栏
			collapse(){
				this.$store.dispatch('ToggleSideBar')
			}
		},
		mounted() {}
	}

</script>

<style scoped lang="less">

	.container {
		position: absolute;
		top: 0px;
		bottom: 0px;
		width: 100%;
		.header {
			height: 60px;
			line-height: 60px;
			background: #fff;
			box-shadow: 0 1px 2px #999;
			display: flex;
			.logo {
				height:100%;
        text-align: center;
        background-color: #304156;
				img {
          text-align: center;
          margin: 13px 0;
				}
			}
			.logo-width{
				width: 200px;
				flex: 0 200px;
        transition: all 0.3s ease-in-out;
			}
			.logo-collapse-width{
				width: 64px;
				flex: 0 64px;
				transition: all 0.3s ease-in-out;
			}
			.app-info{
				flex: 1;
				.tools{
					padding: 0px 23px;
					width: 14px;
					cursor: pointer;
				}
			}
			.userinfo {
				width: 150px;
				text-align: center;
				flex: 0 150px;
				.userinfo-inner {
					cursor: pointer;
				}
			}
		}
		.main {
			display: flex;
			position: absolute;
			top: 60px;
			bottom: 0;
			overflow: hidden;
			aside {
        flex: 0 200px;
				width: 200px;
				transition: all .3s ease-in-out;
				z-index: 99;
				 .el-menu-vertical-demo:not(.el-menu--collapse) { // element-UI 示例中的，不加折叠边框无过度效果
					 width: 200px;
				 }
				.el-menu{
					height: 100%;
					border: none;
					.menu-icon{
						color: #fff;
						padding-right: 15px;
					}
				}
			}
			.menu-collapsed{
				flex: 0 64px;
				width: 64px;
				transition: all 0.3s ease-in-out;
				span {
					visibility: hidden;
					opacity: 0;
				}
			}
			.content-container {
				flex:1;
				overflow-y: scroll;
				padding: 20px;
				margin-top:2px;
				.breadcrumb-container {
					.breadcrumb-inner {
						float: right;
						margin: 0 15px 5px 0;
					}
				}
				.content-wrapper {
					background-color: #fff;
					box-sizing: border-box;
				}
			}
		}
	}
</style>
