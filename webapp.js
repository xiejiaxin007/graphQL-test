/*
 * @author: xiejiaxin
 * @Date: 2021-02-28 21:43:20
 * @LastEditors: xiejiaxin
 * @LastEditTime: 2021-03-03 15:33:37
 * @description: 尝试访问支撑系统
 */
let express = require('express');
const app = express();
import axios from 'axios';

// 登录接口方法
const loginInfo = () => {
    return axios.post('http://192.168.1.6:8090/user/login', {
        "password": "11111",
        "username": "xiexie"
      })
}
const testLoginInfo = () => {
    return axios.post('http://test24backend.comjia.com/backend-api/api-user/login', {
        job_number: '25',
        password: "Julive@666"
      })
}
// lee 登出
const logoutInfo = () => {
    return axios.get('http://192.168.1.6:8090/user/logout')
}
// sop标签
const labelInfo = (val) => {
    return axios.get('http://192.168.1.6:8090/user/list', {    
        headers: {
            'cookie': val
        }
    })
}
const testLabelInfo = (val) => {
    return axios.post('http://test24backend.comjia.com/backend-api/bk-api-tag-manage/index',{}, {
        headers: {
            'cookie': val
        }
    })
}


app.get('/', (req, res) => {
    res.send('welcome')
});
// 请求登录接口
app.get('/login', async(req, res) => { 
    // await logoutInfo();
    let data = await loginInfo();
    let labelData = await labelInfo(data.headers['set-cookie']);
    console.log(data.headers['set-cookie'])
    res.json(labelData.data);
    // res.send('hhh')
});
// 请求测试环境
app.get('/test', async(req, res) => {
    let data = await testLoginInfo();
    let labelData = await testLabelInfo(data.headers['set-cookie']);
    console.log(data.headers['set-cookie'])
    res.json(labelData.data);
});

app.listen(3300);
