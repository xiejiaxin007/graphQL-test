/*
 * @author: xiejiaxin
 * @Date: 2021-02-13 11:45:18
 * @LastEditors: xiejiaxin
 * @LastEditTime: 2021-02-22 22:17:42
 * @description: file content
 */
import express from 'express';
import {
    graphqlHTTP
} from 'express-graphql';
import MyGraphQLSchema from './MyGraphQLSchema';
import {
    graphql
} from 'graphql';

const app = express();

app.use(
    '/graphql',
    graphqlHTTP({
        schema: MyGraphQLSchema,
        graphiql: true,
    }),
);

// 写接口
app.get('/api/movies', (req, res) => {
    let query = `
    {
        movies {
          user_name,
          company,
          user_id,
          got_view_count
        }
      }
    `;
    graphql(MyGraphQLSchema, query).then(result => {
        res.json(result.data.movies);
    })
});
app.use((req, res) => {
    res.send('404');
})

app.listen(4000);