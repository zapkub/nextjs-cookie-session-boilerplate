exports.login = async (req, res) => {
    console.log(req.user);
    res.json(req.user);
}

exports.register = async (req, res) => {
    const logger = req.context.logger;
    logger.log('Register user');
    console.log(req.body);
    if (req.body.email && req.body.password) {
        const user = new req.context.User();
        try {
            const result = await user.createUser(req.body);
            res.status(201).json({
                msg: 'done',
            })
        } catch (e) {
            res.status(400).json({
                error: 'Email is already been used',
            }).end();
        }
    } else {
        res.status(400).json({
            error: 'Data fields is missing',
        }).end();
    }
}
