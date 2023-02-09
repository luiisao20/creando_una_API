const mongoose = require('mongoose');
let password = 'admin';
let databaseName = 'db';

if (process.env.NODE_ENV === 'test') {
    databaseName = 'testdb';
}

mongoose.set('strictQuery', false);
mongoose.connect(`mongodb+srv://luiisao20:${password}@cluster0.amdr2tw.mongodb.net/?retryWrites=true&w=majority`);

const Cat = mongoose.model('Cat', { name: String });

const kitty = new Cat({ name: 'Licenciado' });
kitty.save();