

module.exports = {
    create: (req, res) => {
        const {name, description, price, image_url} = req.body;
        const dbInstance = req.app.get('db');

        dbInstance.create_product(name, description, price, image_url)
        .then( () => res.sendStatus(200) )
        .catch( err => {
            res.status(500).send({errorMessage: "Oops! Something went wrong."});
            console.log(err);
        })
    },

    getOne: (req, res) => {
        const {id} = req.params;
        const dbInstance = req.app.get('db');

        dbInstance.read_product(id)
        .then(product => res.status(200).send(product))
        .catch(err => {
            res.status(500).send({errorMessage: "Oops! Something went wrong."});
        console.log(err);
        })
        
    },

    getAll: (req, res) => {
        const dbInstance = req.app.get('db');

        dbInstance.read_products()
        .then(products => res.status(200).send(products))
        .catch(err => res.status(500).send(err));

    },

    update: (req, res) => {
        const {desc} = req.query;
        const {id} = req.params
        const dbInstance = req.app.get('db');

        dbInstance.update_product(desc, id)
        .then(product => res.status(200).send(product))
        .catch(err => res.status(500).send(err));

    },

    delete: (req, res) => {
        const {id} = req.params
        const dbInstance = req.app.get('db');

        dbInstance.delete_product(id)
        .then( () => res.sendStatus(200) )
        .catch(err => res.status(500).send(err));
    }
}