/*
 * @author: xiejiaxin
 * @Date: 2021-02-13 11:46:09
 * @LastEditors: xiejiaxin
 * @LastEditTime: 2021-02-22 22:23:41
 * @description: file content
 */
import {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt
} from 'graphql';

import axios from 'axios';

// 定义数组中的字段
let MovieType = new GraphQLObjectType({
    name: 'MovieType',
    fields: {
        user_name: {
            type: GraphQLString
        },
        company: {
            type: GraphQLString
        },
        user_id: {
            type: GraphQLString
        },
        got_digg_count: {
            type: GraphQLInt
        },
        got_view_count: {
            type: GraphQLInt
        },
        description: {
            type: GraphQLString
        }
    }
})

var schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'RootQueryType',
        fields: {
            hello: {
                type: GraphQLString,
                resolve() {
                    return 'world';
                },
            },
            movies: {
                type: new GraphQLList(MovieType),
                resolve() {
                    // 提前启动yarn json-server，启动json生成的api接口
                    return axios({
                        url: 'http://localhost:3300/subjects'
                    })
                    .then((res) => {
                        console.log(res.data)
                        return res.data;
                    })
                }
            }
        },
    }),
});

export default schema;