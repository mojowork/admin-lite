<template>
	<div class="container">
    <!-- 头部 -->
		<header class="header">
			<el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
			<span v-if="collapsed">{{shortName}}</span>
			<transition name="title" mode="out-in">
				<span v-if="!collapsed">{{brandName}}</span>
			</transition>
			</el-col>
			<el-col :span="10">
				<div class="tools" @click.prevent="collapse">
					<i class="iconfont icon-menu"></i>
				</div>
			</el-col>
			<el-col :span="4" class="userinfo">
				<el-dropdown trigger="hover">
					<span class="el-dropdown-link userinfo-inner"><img :src="userAvatar"/> {{userName}}</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item>我的消息</el-dropdown-item>
						<el-dropdown-item>设置</el-dropdown-item>
						<el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-col>
		</header>
		<el-col :span="24" class="main">
      <!--导航菜单-->
			<aside :class="collapsed?'menu-collapsed':'menu-expanded'">
				<el-menu :default-active="$route.path" @open="handleopen" @close="handleclose" @select="handleselect"
					 unique-opened router :collapse="collapsed"
           background-color="#304156" text-color="#fff" active-text-color="#409EFF">
					<template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
						<el-submenu :index="index+''" v-if="!item.unique">
							<template slot="title"><i :class="item.icon"class="menu-icon"></i>
								<transition name="title" mode="out-in">
									<span v-if="!collapsed">{{item.name}}</span>
								</transition>
							</template>
							<el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">{{child.name}}</el-menu-item>
						</el-submenu>
						<el-menu-item v-if="item.unique&&item.children.length>0" :index="item.children[0].path"><i :class="item.icon"></i>{{item.children[0].name}}</el-menu-item>
					</template>
				</el-menu>
			</aside>
      <!-- 内容区域 -->
			<section class="content-container">
				<div class="grid-content bg-purple-light">
					<el-col :span="24" class="breadcrumb-container">
						<strong class="title">{{$route.name}}</strong>
						<el-breadcrumb separator="/" class="breadcrumb-inner">
							<transition-group name="breadcrumb">
								<el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
									{{ item.name }}
								</el-breadcrumb-item>
							</transition-group>
						</el-breadcrumb>
					</el-col>
					<el-col :span="24" class="content-wrapper">
						<transition name="fade" mode="out-in">
							<router-view></router-view>
						</transition>
					</el-col>
				</div>
			</section>
		</el-col>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				brandName:'AdminLite',
				shortName: 'Lite',
				collapsed: false,
				userAvatar: '',
				userName: ''
			}
		},
		methods: {
			onSubmit() {},
			handleopen() {
				//console.log('handleopen');
			},
			handleclose() {
				//console.log('handleclose');
			},
			handleselect () {
			},

			logout() {},
			//折叠导航栏
			collapse(){
				this.collapsed=!this.collapsed;
			}
		},
		mounted() {
			var user = sessionStorage.getItem('user');
			if (user) {
				user = JSON.parse(user);
				this.userName = user.name || 'chaoshuai';
				this.userAvatar = user.avatar || 'http://oxdyq538l.bkt.clouddn.com/Avatar.jpg';
			}

		}
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
			.userinfo {
				text-align: right;
				padding-right: 35px;
				float: right;
				.userinfo-inner {
					cursor: pointer;
					img {
						width: 40px;
						height: 40px;
						border-radius: 20px;
						margin: 10px 0px 10px 10px;
						float: right;
					}
				}
			}
			.logo {
				height:64px;
        		text-align: center;
				font-size: 22px;
				color:#20a0ff;
        		background-color: #304156;
				border-right: 1px solid rgba(238,241,146,0.3);
				img {
					width: 40px;
					float: left;
					margin: 10px 10px 10px 18px;
				}
				.txt {
					color:#fff;
				}
			}
			.logo-width{
				width: 200px;
        		transition: width 0.3s ease-in-out;
			}
			.logo-collapse-width{
				width: 64px
			}
			.tools{
				padding: 0px 23px;
				width:14px;
				cursor: pointer;
			}
		}
		.main {
			display: flex;
			position: absolute;
			top: 60px;
			bottom: 0px;
			overflow: hidden;
			aside {
				flex:0 200px;
				width: 200px;
				transition: width 0.3s;
				.el-menu{
					height: 100%;
					border: none;
					.menu-icon{
						color: #fff;
						padding-right: 15px;
					}
				}
				.collapsed{
					width:60px;
				}
			}
			.menu-collapsed{
				flex:0 64px;
				width: 64px;
				transition: width 0.3s;
				text-align: center;
				span {
					height: 0;
					width: 0;
					overflow: hidden;
					visibility: hidden;
					transition: opacity .3s cubic-bezier(.55, 0, .1, 1);
					opacity: 0;
					display: inline-block;
				}
			}
			.menu-expanded{
				flex:0 200px;
				width: 200px;
				transition: width 0.3s;
			}
			.content-container {
				flex:1;
				overflow-y: scroll;
				padding: 20px;
				-webkit-transition: 1s all;
				 -moz-transition: 1s all; 
				 -ms-transition: 1s all;
				  -o-transition: 1s all;
				 transition: 1s all;
				.breadcrumb-container {
					.title {
						width: 200px;
						float: left;
						color: #475669;
					}
					.breadcrumb-inner {
						float: right;
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
