/*
 * @author: xiejiaxin
 * @Date: 2021-03-03 16:58:34
 * @LastEditors: xiejiaxin
 * @LastEditTime: 2021-03-03 18:11:48
 * @description: 尝试楼盘侧接口聚合
 */
let express = require('express');
const app = express();
import axios from 'axios';
import {
    graphqlHTTP
  } from 'express-graphql';
import GraphQLSchema from './GraphQLSchema';

app.use(
    '/graphql',
    graphqlHTTP({
        schema: GraphQLSchema,
        graphiql: true,
    })
);

// 登录接口
const loginInfo = () => {
    return axios.post('http://test24backend.comjia.com/backend-api/api-user/login', {
        job_number: '25',
        password: "Julive@666"
    })
}
// 切换身份接口 
const switchRole = (req) => {
    return axios.post('http://test24backend.comjia.com/backend-api/common/switch-role', {
        role_name: 'super_admin'
    }, {
        headers: {
            'cookie': req.headers.cookie
        }
    });
};
// 楼盘接口
const getHouseInfo = (req) => {
    return axios.get('http://test24backend.comjia.com/backend-api/project/project-profile/get-info', {
        params: {
            project_id: '200488409'
        },
        headers: {
            'cookie': req.headers.cookie
        }
    })
}
app.use('*', function (req, res, next) {
    // 这个表示任意域名都可以访问，这样写不能携带cookie了。
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    // 设置方法
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    // 意思是，在正常的请求之前，会发送一个验证，是否可以请求。
    if (req.method == 'OPTIONS') {
        res.send(200);
    } else {
        next();
    }
});
app.get('/web', async (req, res) => {
    let data = await loginInfo();
    const cookieVal = data.headers['set-cookie'];
    req.headers.cookie = cookieVal;
    await switchRole(req);
    let info = await getHouseInfo(req);
    res.json(info.data);
});
// 匹配默认路径
app.get('/', (req, res) => {
    res.send('welcome')
});
app.listen(3500);