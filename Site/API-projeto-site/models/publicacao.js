'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let Post = sequelize.define('Post',{	
		idPost: {
			field: 'idPost',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},	
        fkUsuario: {
			field: 'fkUsuario',
            type: DataTypes.INTEGER,
			foreignKey: true
        },
		fkLivro: {
			field: 'fkLivro',
			type: DataTypes.INTEGER,
        	foreignKey: true,
		},
		comentario: {
			field: 'comentario',
			type: DataTypes.STRING,
			allowNull: false
		},
		fkPost: {
			field: 'fkPost',
			type: DataTypes.INTEGER,
			foreignKey: true
		},
	}, 
	{
		tableName: 'Post', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return Post;
};
