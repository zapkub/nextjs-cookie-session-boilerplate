const mockUser = {
    email: 'Test',
}
exports.deserializeSession = (context) => {
    return async function (id, done) {
        context.logger.log('Deserialize');
        context.logger.log(id);

        const user = await context.User.findById(id);
        if(user) {
            done(null, user.toObject());
        } else {
            done('error')
        }
    }
}


exports.LocalStrategyHandler = (context) => async (email, password, done) => {
    console.log('login');
    const user = await context.User.findOne({email,});
    if(user) {
         done(null , user);
    } else {
         done('Error');
    }
   
}

exports.serializeSession = (context) => (user, done) => {
    console.log('Serialize session');
    done(null, user._id);
}

