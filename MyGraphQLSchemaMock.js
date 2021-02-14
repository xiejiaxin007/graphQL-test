/*
 * @author: xiejiaxin
 * @Date: 2021-02-13 11:46:09
 * @LastEditors: xiejiaxin
 * @LastEditTime: 2021-02-14 16:47:36
 * @description: file content
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
});

// 定义信息返回对象
let MessageType = new GraphQLObjectType({
    name: 'MessageType',
    fields: {
        message: {
            type: GraphQLString
        }
    }
});

var schema = new GraphQLSchema({
    // 查询
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
    mutation: new GraphQLObjectType({
        name: 'RootMutationType',
        fields: {
            // 添加
            insert: {
                type: MovieType,
                args: {
                    title: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    genres: {
                        type: GraphQLString
                    },
                    rating: {
                        type: GraphQLFloat
                    },
                    theater: {
                        type: GraphQLInt
                    }
                },
                resolve(obj, args) {
                    return axios.post('http://localhost:3400/subjects', { ...args }).then(res => {
                        return res.data;
                    })
                }
            },
            // 修改
            put: {
                type: MovieType,
                args: {
                    id: {
                        type: new GraphQLNonNull(GraphQLInt)
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
                        type: GraphQLInt
                    }
                },
                resolve(obj, args) {
                    return axios.put('http://localhost:3400/subjects/' + args.id, { ...args }).then(res => {
                        return res.data;
                    })
                }
            },
            patch: {
                type: MovieType,
                args: {
                    id: {
                        type: new GraphQLNonNull(GraphQLInt)
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
                        type: GraphQLInt
                    }
                },
                resolve(obj, args) {
                    return axios.patch('http://localhost:3400/subjects/' + args.id, { ...args }).then(res => {
                        return res.data;
                    })
                }
            },
            // 删除
            delete: {
                type: MessageType,
                args: {
                    id: {
                        type: new GraphQLNonNull(GraphQLInt)
                    }
                },
                resolve(obj, args) {
                    return axios.delete('http://localhost:3400/subjects/' + args.id).
                    then(res => {
                        return {
                            message: '数据修改成功'
                        };
                    })
                }
            }
        }
    })
});

export default schema;