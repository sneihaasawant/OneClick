const mongoose = require("mongoose");
const User = mongoose.model('User');
const Product = mongoose.model('Product');
const Order = mongoose.model('Order');


module.exports = {
    get_all: (req, res) => {
        User.find({})
            .then(users => { console.log(users); res.json(users) })
            .catch(err => {
                console.log('User error', err)
                res.status(500).json(err)
            })
    },

    login: (req, res) => {
        console.log(req.body)
        User.findOne({ name: req.body.name })
            .then(user => {
                if (user) {
                    req.session.user = user
                    res.json(true)
                } else {
                    let new_user = new User(req.body)
                    new_user.save()
                        .then(() => {
                            req.session.user = new_user
                            res.json(true)
                        })
                        .catch(err => {
                            console.log("User save error", err)
                            res.status(500).json(err)
                        })
                }
            })


    },

    am_i_logged_in: (req, res) => {
        if (req.session.user) {
            res.json(req.session.user)
        } else { res.status(401).json(false) }
    },

    logout: (req, res) => {
        req.session.destroy();
        res.redirect('/login')
    },

    addToWatchlist: (req, res) => {
        console.log('inside server addwachlist');
        console.log(req.body.productid)

        User.find({ _id: req.session.user._id })
            .then((user) => {
                console.log(user)
                let productId = req.body.productid;
                user1 = user[0];
                user1.watchlist.push({ productId: productId })
                user1.save()
                    .then(() => {
                        Product.find({ productid: productId })
                            .then(product => {
                                console.log(product)
                                if (product.length > 0) {
                                    console.log('pro', product)
                                    product1 = product[0]
                                    product1.watchedBy.push({ userid: req.session.user._id })
                                    product1.save()
                                        .then(() => res.json(true))
                                        .catch(err => console.log("Product1 save error", err))
                                } else {
                                    let p = new Product({ productid: productId })
                                    console.log('p', p)
                                    p.watchedBy.push({ userid: req.session.user._id })
                                    p.save()
                                        .then(() => {
                                            res.json(true)
                                        })
                                        .catch(err => {
                                            console.log("product2 save error", err)
                                            res.status(500).json(err)
                                        })
                                }
                            })
                            .catch(err => console.log("Product3 save error", err))

                    })
                    .catch(err => console.log('err', err))

            })
            .catch(err => console.log('err', err))

    },

    getwatchdetails: (req, res) => {
        console.log(req.body.productid)
        Product.find({ productid: req.body.productid })
            .then(product => {
                console.log(product)
                if (product.length > 0) {
                    product1 = product[0]
                    count = product1.watchedBy.length;
                    res.json(count);
                }
                else {
                    count = 0;
                    res.json(count);
                }
            })
            .catch(err => console.log('server get watchlist err', err))
    },

    addToBrowse: (req, res) => {
        console.log('Inside Add to browse', req.body.productid)

        // $addToSet : It functions just like $push.  However, $addToSet only adds to the specified array if the value doesn't already exist (thereby preventing duplicate entries).


        User.update({ _id: req.session.user._id }, { $addToSet: { browselist: req.body.productid } })
            .then(() => res.json(true))
            .catch(err => console.log(' update err', err))
    },

    getBrowsingHistory: (req, res) => {
        console.log('Inside get to browse')
        User.find({ _id: req.session.user._id })
            .then(user => {
                console.log(user)
                user = user[0];
                arr = user.browselist
                console.log('arr', arr)
                res.json(arr)

            })
            .catch(err => console.log('getbrowse', err))
    },
    getwatchlist: (req, res) => {
        console.log('Inside get to watchlist');
        User.find({ _id: req.session.user._id })
            .then(user => {
                console.log(user)
                user = user[0];
                arr = user.watchlist
                console.log('arr', arr)
                res.json(arr)

            })

    },

    addtoCart: (req, res) => {
        console.log('Inside get to addCart');
        console.log(req.body)
        Order.findOne({ userid: req.session.user._id })
            .then(order => {
                if (order) {
                    console.log('if', req.body)
                    console.log('if', order)
                    cart = req.body
                    order.orderCart.push(cart)
                    order.save()
                        .then(() => res.json(true))
                        .catch(err => console.log("add cart save error", err))

                }
                else {
                    let o = new Order({ userid: req.session.user._id })
                    cart = req.body
                    console.log('else', cart)
                    o.orderCart.push(cart)
                    o.save()
                        .then(() => res.json(true))
                        .catch(err => console.log("add cart save error", err))
                }
            })
            .catch(err => console.log("add cart save error", err))

    },

    getOrderDetails: (req, res) => {
        console.log('Inside get to getOrderDetails');
        Order.findOne({ userid: req.session.user._id })
            .then(order => {
                console.log('order', order)
                order1 = order.orderCart;
                res.json(order1);
            })
            .catch(err => console.log('get order details ', err))

    },

}



