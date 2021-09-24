const { TRANSACTIONS } = require("../constants");

exports.createSession = async (ctx, next) => {
    try {
        const { user } = ctx.state;

        const session = {
            ...ctx.request.body,
            transactions: [],
        };
        
        user.sessions.push(session);
        user.save();

        ctx.status = 201;
        ctx.body = { session: user.sessions[user.sessions.length-1] };
        await next();
    } catch (err) {
        ctx.throw(500, err);
    }
}

exports.getSession = async (ctx, next) => {
    try {
        const { user } = ctx.state;
        const session = user.sessions.find(session => session._id == ctx.params.id);

        if (!session) {
            ctx.status = 404
            ctx.body = {errors: ["Session not found"]};
            await next();
        }

        ctx.body = { session };
        await next();
    } catch (err) {
        ctx.throw(500, err);
    }
}

exports.createTransaction = async (ctx, next) => {
    try {
        const { user } = ctx.state;
        const session = user.sessions.find(session => session._id == ctx.params.id);

        if (!session) {
            ctx.status = 404
            ctx.body = {errors: ["Session not found"]};
            await next();
        }

        const transaction = ctx.request.body;  // TODO Verify content + look up price externally
        const liquidity = transaction.price * transaction.volume;

        // TODO Check liquidity against wallet
        // TODO Date and time of transaction

        if (transaction.kind === TRANSACTIONS.PURCHASE) {
            session.wallet -= liquidity;
        } else if (transaction.kind === TRANSACTIONS.SALE) {
            session.wallet += liquidity;
        } else {
            ctx.status = 400
            ctx.body = {errors: ["Invalid transaction kind"]};
            await next();
        }

        session.transactions.push(transaction);
        user.save();

        ctx.status = 201;
        ctx.body = { transaction: session.transactions[session.transactions.length-1] }
        await next();

    } catch (err) {
        ctx.throw(500, err);
    }
}
