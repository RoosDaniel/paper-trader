const stockUtils = require("../utils/stock-utils");

const { getStock } = stockUtils;


exports.getStock = async (ctx, next) => {
    try {
        const stock = await getStock(ctx.params.symbol);
        const opens = []

        for (let [k, v] of Object.entries(stock.data["Time Series (Daily)"])) {
            opens.push({
                date: k,
                open: v["1. open"],
                close: v["4. close"],
            })
        }

        ctx.status = 200;
        ctx.body = { stock: opens};
        await next();
    } catch (err) {
        ctx.throw(500, err)
    }
}
