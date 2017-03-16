'use strict';
const mongoose = require('mongoose');
const users=require('./models/users');
const ressources=require('./models/ressources');
const suggestions=require('./models/suggestions');

mongoose.connect('mongodb://localhost:27017/test-db'); //mettre l'url de mlab
mongoose.connection.on('error',err=>{
	console.log('ERROR close MongoDB process',err)});

mongoose.connection.on('connected',function(){
	console.log('MongoDB connection succes on Mlab')
});

mongoose.connection.on('disconnected',function(){
	console.log('MongoDB connection disconnected')
});

process.on('SIGINT',function{
	mongoose.connection.close(function(){
		console.log('Server process terminated. closing Mlab')
		process.exit(0);
	});
});

const db={
	users:mongoose.model('Users',users),
	ressources:mongoose.model('Ressources',ressources),
	suggestions:mongoose.model('Suggestions',suggestions)
}

// db.users db.ressources
module.exports=db;
