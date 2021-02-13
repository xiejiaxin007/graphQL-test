/*
 * @author: xiejiaxin
 * @Date: 2021-02-13 11:46:09
 * @LastEditors: xiejiaxin
 * @LastEditTime: 2021-02-13 16:09:10
 * @description: file content
 */
import {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList
} from 'graphql';

// 定义数组中的个体
let MovieType = new GraphQLObjectType({
    name: 'MovieType',
    fields: {
        user_name: {
            type: GraphQLString
        },
        company: {
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
                    return [
                        {
                            user_name: '字节前端',
                            company: '北京字节跳动网络技术有限公司'
                        }
                    ]
                }
            }
        },
    }),
});

export default schema;