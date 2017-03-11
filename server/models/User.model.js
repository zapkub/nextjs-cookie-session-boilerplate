const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const composeWithMongoose = require('graphql-compose-mongoose').default;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
  },
  password: String,
}, {
  timestamps: true,
});

userSchema.methods.createUser = async function (Args) {
  const user = new User(Args);
  await user.save();
  return user;
};

const User = mongoose.model('User', userSchema);
const UserTC = composeWithMongoose(User, {});

const findMany = UserTC.getResolver('findMany')
.addFilterArg({
  description: 'Search by regExp',
  name: 'searchByString',
  type: 'String',
  query: (rawQuery, value, { args }) => {
    console.log('search by string');
    console.log(rawQuery);
    console.log(args);
    const searchTest = new RegExp(args.filter.searchByString, 'i');
    rawQuery.$or = [
      { email: searchTest },
      { password: searchTest },
    ];
  },
});

UserTC.setResolver('findMany', findMany);

UserTC.addResolver({
  name: 'createUserByCustomData',
  kind: 'mutation',
  args: {
    email: 'String',
    password: 'String',
  },
  type: UserTC,
  resolve: ({ _, args, context, info }) => {
    // create user with custom methods
    console.log(args);
    return {
      email: 'Unimplement yet',
    };
  },
});


exports.model = User;
exports.TC = UserTC;
