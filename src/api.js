const params = {
    headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
        
    }
}

const url = "http://localhost:3080/api";

const getNews = (subject) =>{
    return fetch(`${url}/${subject}`, params )
        .then(response => response.json())
        .catch((err)=>{
            console.error(`erro: ${err}`)
        })
}

const getNewsById = (subject, id) =>{
    return fetch(`${url}/${subject}/${id}`, params)
        .then((res)=>{
            res.json()
        })
        .catch((err)=>{
            console.error(`erro: ${err}`)
        })
}

export default { getNews, getNewsById }