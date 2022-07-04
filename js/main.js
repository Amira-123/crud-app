//set some variable
let title=document.querySelector('#title');
let price=document.querySelector('#price');
let taxes=document.querySelector('#taxes');
let ads=document.querySelector('#ads');
let discount=document.querySelector('#discount');
let total=document.querySelector('#total')
let count=document.querySelector('#count');
let category=document.querySelector('#category');
let search=document.querySelector('#search');
let submit=document.querySelector('#submit');
let totalProducts;
let mood='create';
let index;
//////////////////////set local storage
if(JSON.parse(localStorage.getItem('products'))==null ){
    totalProducts=[]
}
else{
    totalProducts=JSON.parse(localStorage.getItem('products')||'[]');
    displayProduct()
}
function calculateTotal() { 
   
    if(price.value !==''){
        let totalPrice=((Number(price.value)) + (Number(ads.value))
        +(Number(taxes.value)))-(Number(discount.value));
        total.innerHTML=totalPrice;
        total.style.background='#040';
    }
    else{
        total.innerHTML='';
        total.style.background='#770404';
    }
    

 }
function addProduct(){
    let product={
       title:title.value.toLowerCase(),
       price:price.value,
       taxes:taxes.value,
       ads:ads.value,
       discount:discount.value,
       count:count.value,
       total:total.innerHTML,
       category:category.value.toLowerCase()
    }
   
        if(title.value!='' && price.value!=''&& category.value !='' 
        &&product.count<100){
            if(mood==='create'){
                if(product.count>1){
                   for(let i=0;i<product.count;i++){
                       totalProducts.push(product);
                   }
                   count.style.display='block'
               }
               else{
                   totalProducts.push(product);
               }
           }else{
               totalProducts[index]=product;
               mood='create';
               submit.innerHTML='Create';
           } 
           clearInputs();
        }
    localStorage.setItem ('products',JSON.stringify(totalProducts))
    displayProduct();
    total.style.background='#770404';
}
function displayProduct(){
    let items='';
    for(let i=0;i<totalProducts.length;i++){
        items+=`<tr>
                    <td data-label="Id"> ${i+1} </td>
                    <td data-label="Title">${totalProducts[i].title}</td>
                    <td data-label="Price">${totalProducts[i].price} </td>
                    <td data-label="Taxes">${totalProducts[i].taxes} </td>
                    <td data-label="Ads">${totalProducts[i].ads}</td>
                    <td data-label="Discount">${totalProducts[i].discount}</td>
                    
                    <td data-label="Total">${totalProducts[i].total} </td>
                    <td data-label="Category">${totalProducts[i].category}</td>
                    <td ><button id="update" onclick="updateProduct(${i})"> Update</button> </td>
                    <td><button id="delete" onclick="deleteItems(${i})"> Delete</button> </td>
                </tr>`
    }
    document.querySelector('#tableBody').innerHTML=items;
    let deleteBtn=document.querySelector('#deleteAll');
    if(totalProducts.length>0){
        deleteBtn.innerHTML=`
        <button onclick="deleteAllItems()">Delete All(${totalProducts.length})</button>`
    }
    else{
        deleteBtn.innerHTML=''
    }
}
function clearInputs(){
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    count.value='';
    total.innerHTML='';
   category.value='';
 }
function deleteItems(index){
    totalProducts.splice(index,1);
    localStorage.setItem ('products',JSON.stringify(totalProducts))
    displayProduct()
}
function deleteAllItems(){
   totalProducts.splice(0);
   localStorage.setItem ('products',JSON.stringify(totalProducts))
   displayProduct()
}
function updateProduct(i){
    title.value=totalProducts[i].title;
    price.value=totalProducts[i].price;
    taxes.value=totalProducts[i].taxes;
    ads.value=totalProducts[i].ads;
    discount.value=totalProducts[i].discount;
    category.value=totalProducts[i].category;
    calculateTotal() ;
    index=i;
    count.style.display='none';
    submit.innerHTML='Update';
    mood='update';
    scroll({
        top:0,
        behavior:'smooth'
    })
}
/////////////set search function
let searchMood='title';
function getSearchMood(id){
    if(id=='searchTitle'){
       searchMood='title';
    //    search.placeholder='search By title';
    }
    else{
        searchMood='category';
        // search.placeholder='search By Category';
    }
    search.placeholder='search By '+searchMood;
    search.focus();
    search.value='';
     displayProduct()
    console.log(searchMood)
    
}
function searchProduct(value){
    let items='';
    for(let i=0;i<totalProducts.length;i++){
        if(searchMood=='title'){
            // for(let item in totalProducts){
                if(totalProducts[i].title.includes(value.toLowerCase())){
                    items+=`<tr>
                                <td>${i+1}</td>
                                <td>${totalProducts[i].title}</td>
                                <td>${totalProducts[i].price} </td>
                                <td>${totalProducts[i].taxes} </td>
                                <td>${totalProducts[i].ads}</td>
                                <td>${totalProducts[i].discount}</td>
                                
                                <td>${totalProducts[i].total} </td>
                                <td>${totalProducts[i].category}</td>
                                <td><button id="update" onclick="updateProduct(${i})"> Update</button> </td>
                                <td><button id="delete" onclick="deleteItems(${i})"> Delete</button> </td>
                            </tr>`
            }
            // }
        }
        else{
            console.log(value)
            // for(let item in totalProducts){
                if(totalProducts[i].category.includes(value.toLowerCase())){
                    items+=`<tr>
                                <td>${Number(i)+1}</td>
                                <td>${totalProducts[i].title}</td>
                                <td>${totalProducts[i].price} </td>
                                <td>${totalProducts[i].taxes} </td>
                                <td>${totalProducts[i].ads}</td>
                                <td>${totalProducts[i].discount}</td>
                                
                                <td>${totalProducts[i].total} </td>
                                <td>${totalProducts[i].category}</td>
                                <td><button id="update" onclick="updateProduct(${i})"> Update</button> </td>
                                <td><button id="delete" onclick="deleteItems(${i})"> Delete</button> </td>
                            </tr>`
                }
            // }
        }
    }    
    document.querySelector('#tableBody').innerHTML=items;
}