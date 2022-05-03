const express = require('express')
const app = express()
const port = 3000
const db = require('./database')
app.get('/', (request, response) => {
    (async () => {
        var inseriu
        var output
        const result = await db.insertPeople({name: "Fulano de tal", age: 25});
        if(result){
            inseriu = "<h3>Registro inserido com sucesso!</h3>"
        }
        const peoples = await db.selectPeoples()
        output = '<h1>Full Cycle Rocks!</h1><br/>' + inseriu + '<br/><h3>Dados cadastrados:</h3><br/>'
        output += '<table style="width: 50%;text-align: center;border: 1px solid #ccc;border-collapse: collapse;"><thead><tr><th style="border: 1px solid #ccc;">ID</th><th style="border: 1px solid #ccc;">Nome</th><th style="border: 1px solid #ccc;">Idade</th><th style="border: 1px solid #ccc;">Ação</th></tr></thead><tbody>'
        for(let value of peoples){
            output += '<tr><td style="border: 1px solid #ccc;">' + value.id + '</td><td style="border: 1px solid #ccc;">' + value.name + '</td><td style="border: 1px solid #ccc;">' + value.age + '</td><td style="border: 1px solid #ccc;"><a href="/delete/' + value.id + '">Deletar</a></td></tr>'
        }
        output += '</tbody></table><br/><a href="/deleteAll">Deletar tudo</a>'
        response.send(output);
    })();
})

app.get('/deleteAll', (request, response) => {
    (async () => {
        var removeu
        var output
        const result = await db.deleteAll();
        if(result){
            removeu = '<h3>Registros removidos com sucesso!</h3>'
        }else{
            removeu = '<h3>Falha ao remover os registros.</h3>'
        }
        output = removeu + '<br/><a href="/">Voltar</a>'
        response.send(output);
    })();
})

app.get('/delete/:id', (request, response) => {
    (async () => {
        var removeu
        var output
        const result = await db.deletePeople(request.params.id)
        if(result){
            removeu = '<h3>Registro ' + request.params.id + ' removido com sucesso!</h3>'
        }else{
            removeu = '<h3>Falha ao remover o registro' + request.params.id + '</h3>'
        }
        output = removeu + '<br/><a href="/">Voltar</a>'
        response.send(output);
    })();
})

app.listen(port, () => {
    console.log('Listening on port ' + port)
})