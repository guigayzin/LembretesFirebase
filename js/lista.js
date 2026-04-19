

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

function deleteItem(key) {
    dbRefUser.child(firebase.auth().currentUser.uid).child(key).remove().then(function () {
        alert('Item removido do BD')
    })
        .catch(function (error) {
            showError('Falha ao realizar cadastro: ', error)
        })
}

function editItem(key, name) {
    var newName = prompt('Digite o novo nome do item', name)
    if (newName != null && newName != '') {
        var data = {
            name: newName
        }
        dbRefUser.child(firebase.auth().currentUser.uid).child(key).set(data).then(function () {
            alert('Item editado no BD')
        }
        ).catch(function (error) {
            showError('Falha ao realizar cadastro: ', error)
        }
        )
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
        var deleteButton = document.createElement('button')
        var editButton = document.createElement('button')

        var btnContainer = document.createElement('div')
        btnContainer.style.display = 'flex'
        btnContainer.style.gap = '10px'

        var btnExcluir = document.createElement('button')
        btnExcluir.textContent = 'Excluir'
        btnExcluir.className = 'btn btn-danger'
        btnExcluir.onclick = () => deleteItem(item.key)
        btnContainer.appendChild(btnExcluir)

        var btnEditar = document.createElement('button')
        btnEditar.textContent = 'Editar'
        btnEditar.className = 'btn btn-primary'
        btnEditar.onclick = () => editItem(item.key)
        btnContainer.appendChild(btnEditar)

        li.appendChild(btnContainer)
        ulLista.appendChild(li)
    });
}