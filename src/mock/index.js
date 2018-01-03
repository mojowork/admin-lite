import Mock from 'mockjs';


// Mock响应模板
var obj = {'aa':'11', 'bb':'22', 'cc':'33', 'dd':'44'};
Mock.mock('http://test.com', {
    "user|1-3": [{   // 随机生成1到3个数组元素
        'name': '@cname',  // 中文名称
        'id|+1': 88,    // 属性值自动加 1，初始值为88
        'age|18-28': 0,   // 18至28以内随机整数, 0只是用来确定类型
        'birthday': '@date("yyyy-MM-dd")',  // 日期
        'city': '@city(true)',   // 中国城市
        'color': '@color',  // 16进制颜色
        'isMale|1': true,  // 布尔值
        'isFat|1-2': true,  // true的概率是1/3
        'fromObj|2': obj,  // 从obj对象中随机获取2个属性
        'fromObj2|1-3': obj,  // 从obj对象中随机获取1至3个属性
        'brother|1': ['jack', 'jim'], // 随机选取 1 个元素
        'sister|+1': ['jack', 'jim', 'lily'], // array中顺序选取元素作为结果
        'friends|2': ['jack', 'jim'] // 重复2次属性值生成一个新数组
    },{
        'gf': '@cname'
    }]
});
// 设置1秒至2秒间响应
Mock.setup({ timeout: '1000-2000' });

// 登录相关
Mock.mock('/login/login', 'post', {
    'code': 200,
    'msg': '登录成功',
    'token': 'thisisatokenkey',
    'user': {
        'role': ['admin'],
        'name': '@cname',
        'avatar': 'http://oxdyq538l.bkt.clouddn.com/Avatar.jpg'
    }
})

Mock.mock('/login/logout', 'post', {
    'code': 200,
    'msg': '登出成功',

})

Mock.mock('/login/getUserInfo', 'get', {
    'code': 200,
    'msg': '获取成功',
    'data': {
      'role': ['admin'],
      'name': '@cname',
      'avatar': 'http://oxdyq538l.bkt.clouddn.com/Avatar.jpg'
    }
})

// 商品相关
Mock.mock('/goods/getList', 'get', {
    'code': 200,
    'msg': '获取成功',
    'data|3-15': [{
      'id|+1': 1,
      'title|1': ['苹果', '香蕉', '小黄瓜'],
      'cover': '',
      'category':'水果',
      'total': 20,
      'createtime': '@date("yyyy-MM-dd")'
    }]
})
