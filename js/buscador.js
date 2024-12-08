document.addEventListener("keyup", e =>{
    
    if(e.target.matches("#buscador"))
    {
        document.querySelectorAll(".article-card").forEach(product =>{

            product.textContent.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
            ?product.classList.remove("filtro")
            :product.classList.add("filtro")
        })
    }
})