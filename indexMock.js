/*
 * @author: xiejiaxin
 * @Date: 2021-02-13 11:45:18
 * @LastEditors: xiejiaxin
 * @LastEditTime: 2021-02-22 22:45:12
 * @description: file content
 */
import express from 'express';
import {
  graphqlHTTP
} from 'express-graphql';
import MyGraphQLSchemaMock from './MyGraphQLSchemaMock';
import {
  graphql
} from 'graphql';

const app = express();

app.use(
  '/graphql',
  graphqlHTTP({
    schema: MyGraphQLSchemaMock,
    graphiql: true,
  }),
);

// 写接口
app.get('/api/movies', (req, res) => {
  // let query = `
  // {
  //     movies {
  //       id,
  //       title,
  //       genres,
  //       rating,
  //       theater {
  //         id,
  //         name,
  //         comments {
  //           id,
  //           content
  //         }
  //       },
  //       comments {
  //         id,
  //         content
  //       }
  //     }
  //   }
  // `;
  let query = `
    {
      movies {
        id,
        title,
        genres,
        rating,
        theater {
          id,
          name
        }
      }
    }
    `
  graphql(MyGraphQLSchemaMock, query).then(result => {
    res.json(result.data.movies);
  })
});

app.listen(4500);