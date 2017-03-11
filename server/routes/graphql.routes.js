const { graphqlExpress, graphiqlExpress } = require('graphql-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const router = require('express').Router();
const { GQC } = require('graphql-compose');
const { GraphQLObjectType, GraphQLString, GraphQLInt } = require('graphql');
const UserTC = require('../models/User.model').TC;

const HelloType = new GraphQLObjectType({
  name: 'Hello',
  fields: {
    text: GraphQLString,
    num: GraphQLInt,
  },
});


// function adminAccess(resolvers) {
//   Object.keys(resolvers).forEach((k) => {
//     resolvers[k] = resolvers[k].wrapResolve(next => (rp) => {
//       // rp = resolveParams = { source, args, context, info }
//       if (!rp.context.isAdmin) {
//         throw new Error('You should be admin, to have access to this action.');
//       }
//       return next(rp);
//     });
//   });
//   return resolvers;
// }
// const authQuery = adminAccess({ getUsers: UserTC.getResolver('findMany') });
// console.log(authQuery);
UserTC.setResolver('findMany', UserTC.getResolver('findMany').wrapResolve(next => (rp) => {
  console.log('wrap resolve');
  if (!rp.context.user) {
    throw new Error('Auth required');
  }
  return next(rp);
}));

GQC.rootQuery().addFields({
  getUsers: UserTC.getResolver('findMany'),
  getUserById: UserTC.getResolver('findById'),
  hello: {
    type: HelloType,
    args: {
      id: 'String',
    },
    resolve: (_, args, context) => {
      console.log(context.user);
      return 'Hello';
    },
  },
});

GQC.rootMutation().addFields({
  createUser: UserTC.getResolver('createOne'),
  createCustomUser: UserTC.get('$createUserByCustomData'),
  helloMutate: {
    type: 'String',
    resolve: (_, args) => {
      console.log(args);
      return 'hello';
    },
  },
});


// const schema = (`
//   type User {
//     email: String
//     id: String
//     password: String
//     generic: String
//   }

//   type Query {
//     hello: String
//     getUsers(searchString: String): [User]
//   }

//   schema {
//     query: Query
//   }
// `);

// // The root provides a resolver function for each API endpoint
// const resolver = {
//   Query: {
//     getUsers: async (root, args, context) => {
//       const searchTest = new RegExp(args.searchString, 'i');
//       const users = await context.User.find({ $or: [
//         { email: searchTest },
//         { password: searchTest },
//       ] });
//       return users;
//     },
//   },
// //   User: {
// //     id: (data, args) => data.id.toString().substr(0, 5),
// //   },
// };

// const executableSchema = makeExecutableSchema({
//   typeDefs: schema,
//   resolvers: resolver,
// });

const executableSchema = GQC.buildSchema();
router.use('/graphql', graphqlExpress((req) => {
  console.log(req.user);
  return ({ schema: executableSchema, context: Object.assign(req.context, { user: req.user }) });
}));
router.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

module.exports = router;
