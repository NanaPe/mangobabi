const update = document.querySelector('#update-button')
const deleteButton = document.querySelector('#delete-button')

update.addEventListener('click', _ =>{
    fetch('/quotes', {
        method:'put',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            name:'Daddy',
            quote:'Daddy"s love is also strong'
        })
    })
    .then(res => {
        if (res.ok) return res.json()
    })
    .then(response => {
        window.location.reload(true)
    })
})

deleteButton.addEventListener('click', _ =>{
    fetch('/quotes', {
        method:'delete',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            name:'Daddy'
        })
    })
    .then(res => {
        if (res.ok) return res.json()
    })
    .then(response => {
        window.location.reload(true)
    })
})