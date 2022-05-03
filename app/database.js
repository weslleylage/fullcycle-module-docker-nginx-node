async function connect(){
    if(global.connection && global.connection.state !== 'disconnected')
        return global.connection;
 
    const mysql = require("mysql2/promise");
    const configDb = {
        host: 'mysql',
        user: 'root',
        password: '',
        database: 'fullcycle_node'
    }
    const connection = await mysql.createConnection(configDb)
    global.connection = connection;
    const query = 'CREATE TABLE IF NOT EXISTS peoples (' + 
        'id int(11) unsigned not null auto_increment primary key,' +
        'name varchar(150) not null,' +
        'age int(11) unsigned null default null' +
        ') ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;';
    connection.query(query);
    return connection;
}

async function selectPeoples(){
    const connection = await connect();
    const [rows] = await connection.query('SELECT * FROM peoples;');
    return rows;
}

async function insertPeople(people){
    const connection = await connect();
    const query = 'INSERT INTO peoples(name, age) VALUES (?,?);';
    const values = [people.name, people.age];
    return connection.query(query, values);
}

async function updatePeople(id, people){
    const connection = await connect();
    const query = 'UPDATE peoples SET name=?, age=? WHERE id=?';
    const values = [people.name, people.age, id];
    return connection.query(query, values);
}

async function deletePeople(id){
    const connection = await connect();
    const query = 'DELETE FROM peoples where id=?;';
    return connection.query(query, [id]);
}

async function deleteAll(){
    const connection = await connect();
    const query = 'DELETE FROM peoples where id > 1;';
    return connection.query(query);
}
module.exports = {selectPeoples, insertPeople, updatePeople, deletePeople, deleteAll}