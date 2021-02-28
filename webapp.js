/*
 * @author: xiejiaxin
 * @Date: 2021-02-28 21:43:20
 * @LastEditors: xiejiaxin
 * @LastEditTime: 2021-02-28 23:25:37
 * @description: 尝试访问支撑系统
 */
let express = require('express');
const app = express();
import axios from 'axios';

// 登录接口方法
const loginInfo = () => {
    return axios.post('http://test24backend.comjia.com/backend-api/api-user/login', {
        job_number: 25,
        password: 'Julive@666'
    })
}
// sop标签
const labelInfo = (val) => {
    return axios.post('http://test24backend.comjia.com/backend-api/bk-api-tag-manage/index', {
        headers: {
            'set-cookie': val
        }
    })
}

app.get('/', (req, res) => {
    res.send('welcome')
});
// 请求登录接口
app.get('/login', async(req, res) => {
    let data = await loginInfo();
    let labelData = await labelInfo(data.headers['set-cookie']);
    console.log(data.headers)
    res.json(labelData.data);
});

app.listen(3000);
