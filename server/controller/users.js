const mongoose = require("mongoose");
const User = mongoose.model('User');
const Product = mongoose.model('Product');

module.exports = {
    get_all: (req , res) => {
        User.find({})
        .then(users => { console.log(users); res.json(users)})
        .catch( err => {
            console.log('User error',err)
            res.status(500).json(err)
        })        
    },

    login: (req, res) => {
        console.log(req.body)
		User.findOne({name: req.body.name})
			.then(user => {
				if(user){
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
        if(req.session.user){
            res.json(req.session.user)
        } else 
        {   res.status(401).json(false)   }
    },

    logout: (req, res) => {
            req.session.destroy();
            res.redirect('/login')
        },

    addToWatchlist: ( req, res) => {
        console.log('inside server addwachlist');
        console.log(req.body.productid)
        
        User.find({_id : req.session.user._id})
        .then( (user) => {
            console.log(user)
            let productId = req.body.productid;
            user1 = user[0];
            user1.watchlist.push({ productId : productId })
            user1.save()
            .then( () => {
                Product.find({ productid : productId })
                .then( product => {
                    console.log(product)
                    if( product.length > 0 ){
                        console.log('pro',product)
                        product1 = product[0]
                        product1.watchedBy.push( {userid : req.session.user._id } )
                        product1.save()
                        .then( () => res.json(true))
                        .catch(err => console.log("Product1 save error", err) )
				    } else {
                        let p = new Product({productid : productId })
                        console.log('p',p)
                        p.watchedBy.push({userid : req.session.user._id })
                        p.save()
                        .then(() => {
                            res.json(true)})
                        .catch(err => {
                        console.log("product2 save error", err)
                        res.status(500).json(err)     })
                }})
                .catch(err => console.log("Product3 save error", err))

            })
            .catch(err => console.log('err',err) )
            
        })
        .catch( err => console.log('err',err))
        
    },

    getwatchdetails: ( req, res) => {
        console.log(req.body.productid)
        Product.find( { productid : req.body.productid} )
        .then( product => {
            product1 = product[0]
            count = product1.watchedBy.length;
            res.json(count);
        })
        .catch(err => console.log('server get watchlist err', err))
    },

    addToBrowse: ( req, res) => {
        console.log(req.body.productid)
        User.find({_id : req.session.user._id , watchlist : { $in : array } })
        .then( (user) => {
            console.log(user)
            let productId = req.body.productid;
            user1 = user[0];
            user1.watchlist.push({ productId : productId })
            user1.save()
            .then( () => res.json(true))
            .catch()
        }
        )



        
    },


}


           
