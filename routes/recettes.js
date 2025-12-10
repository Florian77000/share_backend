var express = require('express');
var router = express.Router();

require ("../models/connection")
const Recette = require("../models/recette")

router.get('/', function(req, res) {
    Recette.find().then((data) => {
    res.json({result:true, data})
    })
});

router.post('/add', (req,res) => {
    Recette.findOne({url:req.body.url}).then((data)=>{
        if(data) {
            return res.json({result:false, message:'recette deja ajouté'})
        } else {
            const newRecette = new Recette ({
                titre : req.body.titre,
                url : req.body.url,
                type : req.body.type,
            });
            newRecette.save().then((data)=> {
                res.json({result:true, message:'recette ajouté'})
          });
        }
    });
    });

    router.put('/update/:id', (req,res) => {
        const id = req.params.id;
        const newTitre = req.body.titre;

        //vérifier si un titre est bien saisi
        if(!newTitre || newTitre.trim() === '') {
            return res.json({result:false, message:'titre manquant'});
        }

        Recette.findByIdAndUpdate(id, {titre:newTitre})
        .then(() => {
            Recette.find().then(data => {
                res.json({result:true, data})
            })
        })
    })

    router.delete('/delete/:id', (req, res) => {
        const id = req.params.id;

  Recette.findByIdAndDelete(id)
    .then(() => {
      Recette.find().then(data => {
        res.json({ result: true, data });
      });
    })
});


module.exports = router;