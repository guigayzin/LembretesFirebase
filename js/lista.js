

listaForm.onsubmit = function (event) {
    event.preventDefault()
    itemName.innerHTML = ''
    if (listaForm.itemName.value != '') {
        var data = {
            name: listaForm.itemName.value
        }
        dbRefUser.child(firebase.auth().currentUser.uid).push(data).then(function () {
            alert('Item adicionado ao BD')
            listaForm.itemName.value = ''

        }
        ).catch(function (error) {
            showError('Falha ao realizar cadastro: ', error)
        })
    }
    else {
        alert('Não da pra inserir vazio no BD cara ...')
    }

}

function fillLista(snapshot) {
    ulLista.innerHTML = ''
    var num = snapshot.numChildren()
    listaNum.innerHTML = num + (num > 1 ? ' Itens' : ' Item') + ' no Banco de dados'
    snapshot.forEach(function (item) {
        var value = item.val()
        var li = document.createElement('li')
        var spanLi = document.createElement('span')
        spanLi.appendChild(document.createTextNode(value.name))
        li.appendChild(spanLi)
        ulLista.appendChild(li)
    });
}