import Mock from 'mockjs';

// 设置1秒至2秒间响应
Mock.setup({ timeout: '1000-2000' });

// 登录相关
Mock.mock('/login/login', 'post', {
    'code': 200,
    'msg': '登录成功',
    'user': {
        'name': '@name',
        'avatar': 'http://oxdyq538l.bkt.clouddn.com/Avatar.jpg'
    }
})

Mock.mock('/login/logout', 'post', {
    'code': 200,
    'msg': '登出成功'
})
