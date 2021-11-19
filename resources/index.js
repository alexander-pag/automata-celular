'use strict'

document.addEventListener('DOMContentLoaded', async event => {
      
    document.querySelector('#btn_aceptar').addEventListener('click', e =>{

    })

    const instrumentos = await fetchData('./data/instrumentos.json')
    populateSelectList('#instrumentos', instrumentos, 'value', 'name')
    const instrumento = document.querySelector('#instrumentos')

    instrumento.addEventListener('change', e => {
        const list = e.target
        const item = list.options[list.selectedIndex]
        console.log(instrumento[list.selectedIndex].value, instrumento[list.selectedIndex].text);
    })

    const notas = await fetchData('./data/notas.json')
    populateSelectList('#notaUno', notas, 'value', 'name')
    const notaUno = document.querySelector('#notaUno')

    populateSelectList('#notaDos', notas, 'value', 'name')
    const notaDos = document.querySelector('#notaDos')


    notaUno.addEventListener('change', e => {
        const list = e.target
        const item = list.options[list.selectedIndex]
        console.log(notaUno[list.selectedIndex].value, notaUno[list.selectedIndex].text);
    })

    notaDos.addEventListener('change', e => {
        const list = e.target
        const item = list.options[list.selectedIndex]
        console.log(notaDos[list.selectedIndex].value, notaDos[list.selectedIndex].text);
    })

})


async function populateSelectList(selector, items = [], value = '', text = '') {
    let lista = document.querySelector(selector)
    lista.options.length = 0
    items.forEach(item => lista.add(new Option(item[text], item[value])))
}



async function fetchData(url, data = {}) {

    if (Object.entries(data).length > 0) {
        if (!('headers' in data)) {
            data.headers = {
                'Content-Type': 'application/json'
            }
        }
        if ('body' in data) {
            data.body = JSON.stringify(data.body)
        }
    }

    const respuestas = await fetch(url, data)

    if (!respuestas.ok) {
        document.querySelector('#content').innerHTML = 'No encontramos lo que búscas <b>:(</b>'
        throw new Error(`${respuesta.status} - ${respuesta.statusText}`)
    }
    return await respuestas.json()

}

