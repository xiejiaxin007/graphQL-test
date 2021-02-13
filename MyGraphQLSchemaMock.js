/*
 * @author: xiejiaxin
 * @Date: 2021-02-13 11:46:09
 * @LastEditors: xiejiaxin
 * @LastEditTime: 2021-02-13 20:15:46
 * @description: file content
 */
import {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLFloat
} from 'graphql';

import axios from 'axios';

// 定义评论数据对象
let CommentType = new GraphQLObjectType({
    name: 'CommentType',
    fields: {
        id: {
            type: GraphQLInt
        },
        content: {
            type: GraphQLString
        }
    }
});

// 定义电影院数据对象
let TheaterType = new GraphQLObjectType({
    name: 'TheaterType',
    fields: {
        id: {
            type: GraphQLInt
        },
        name: {
            type: GraphQLString
        },
        comments: {
            type: new GraphQLList(CommentType),
            resolve(obj) {
                return axios({
                    url: 'http://localhost:3400/comments?theater=' + obj.id 
                }).then(res => {
                    return res.data
                })
            }
        }
    }
});

// 定义数组中的字段
let MovieType = new GraphQLObjectType({
    name: 'MovieType',
    fields: {
        id: {
            type: GraphQLInt
        },
        title: {
            type: GraphQLString
        },
        genres: {
            type: GraphQLString
        },
        rating: {
            type: GraphQLFloat
        },
        theater: {
            type: new GraphQLList(TheaterType),
            resolve(obj) {
                return axios({
                    url: 'http://localhost:3400/theater?id=' + obj.theater 
                }).then(res => {
                    return res.data
                })
            }
        },
        comments: {
            type: new GraphQLList(CommentType),
            resolve(obj) {
                return axios({
                    url: 'http://localhost:3400/comments?subjects=' + obj.id 
                }).then(res => {
                    return res.data
                })
            }
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
                        url: 'http://localhost:3400/subjects'
                    })
                    .then((res) => {
                        return res.data;
                    })
                }
            }
        },
    }),
});

export default schema;