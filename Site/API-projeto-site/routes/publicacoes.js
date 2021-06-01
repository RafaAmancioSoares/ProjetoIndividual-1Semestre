var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var publicacao = require('../models').Post;

/* ROTA QUE RECUPERA CRIA UMA PUBLICAÇÃO */
router.post('/post/:fkUsuario', function(req, res, next) {
    console.log("Iniciando Publicação...")
    
	let idUsuario = req.params.fkUsuario;

    publicacao.create({
        comentario: req.body.descricao,
        fkUsuario: idUsuario
    }).then(resultado => {
        console.log("Post realizado com sucesso!!");
        res.send(resultado);
    }).catch(erro => {
        console.log('DEU UM ERRINHO')
        console.error(erro);
        res.status(500).send(erro.message);
    })
})

/* ROTA QUE RECUPERA TODAS AS PUBLICAÇÕES */
router.get('/recuperando_post', function(req, res, next) {
	console.log('Recuperando todas as publicações');
	
    let instrucaoSql = `select nomeUsuario, comentario from Usuario
	inner join Post on fkUsuario = idUsuario;`;

	sequelize.query(instrucaoSql, {
		model: publicacao,
		mapToModel: true 
	})
	.then(resultado => {
		console.log(`Encontrados: ${resultado.length}`);
		res.json(resultado);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});


/* ROTA QUE RECUPERA AS PUBLICAÇÕES DE UM USUÁRIO PELO ID */
router.get('/:idUsuario', function(req, res, next) {
	console.log('Recuperando todas as publicações');
	
	var idUsuario = req.params.fkUsuario;

    let instrucaoSql = `SELECT 
    usuario.nomeUsuario,
    comentario
    FROM post
    INNER JOIN usuario
    ON Post.fkUsuario = Usuario.id
    ORDER BY Post.idPost DESC
    WHERE fkUsuario = ${idUsuario}
    ORDER BY publicacao.id DESC`;

	sequelize.query(instrucaoSql, {
		model: Post,
		mapToModel: true 
	})
	.then(resultado => {
		console.log(`Encontrados: ${resultado.length}`);
		res.json(resultado);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});

module.exports = router;
