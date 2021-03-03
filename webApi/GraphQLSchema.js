/*
 * @author: xiejiaxin
 * @Date: 2021-03-03 17:22:34
 * @LastEditors: xiejiaxin
 * @LastEditTime: 2021-03-03 18:20:15
 * @description: 配置schema
 */
import {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLFloat,
    GraphQLNonNull
} from 'graphql';

import axios from 'axios';

// 标签组数据对象
const TagGroupType = new GraphQLObjectType({
    
});

const schema = new GraphQLSchema({
    // 查询
    query: new GraphQLObjectType({
        name: 'RootQueryType',
        fields: {
            hello: {
                type: GraphQLString,
                resolve() {
                    return 'world';
                }
            },
            tags: {
                type: new GraphQLList(TagGroupType),
                resolve() {
                    return axios.get('http://testbackendapi5.comjia.com/backend-api/project/tags')
                }
            }
        }
    })
});

export default schema;

