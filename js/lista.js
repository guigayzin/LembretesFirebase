listaForm.onsubmit = function(event){
    event.preventDefault()
    if (listaForm.itemName.value != ''){
        var data= {
            name: listaForm.itemName.value
        }
        dbRefUser.child(firebase.auth().currentUser.uid).push(data).then(function(){ alert('Item adicionado ao BD')})
    }
    else{
        alert('Não da pra inserir vazio no BD cara ...')
    }

}