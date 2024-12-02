var productNameInput = document.getElementById("productNameInput");
var productPriceInput = document.getElementById("productPriceInput");
var productCategoryInput = document.getElementById("productCategoryInput");
var productDescriptionInput = document.getElementById("productDescriptionInput");
var productList = [];
var searchInput = document.getElementById("searchInput");
var categorySearchInput = document.getElementById("categorySearchInput");
var indexUpdate = 0;
var updateBtn = document.getElementById("updateBtn");
var addBtn = document.getElementById("addBtn");
if (localStorage.getItem("products") != null) {
    productList = JSON.parse(localStorage.getItem("products"));
    displayData();
}

function addProduct() {
    if (validationName() && validationCategory() && validationDescription() && validationPrice() ) {
       var product = {
          name: productNameInput.value,
          price: productPriceInput.value , 
          category: productCategoryInput.value,
          desc: productDescriptionInput.value
         }
      productList.push(product);
      localStorage.setItem("products" , JSON.stringify(productList)); 
      clearForm();
      displayData();  
      console.log(productList);
      productNameInput.classList.remove("is-valid");
      productCategoryInput.classList.remove("is-valid");
      productDescriptionInput.classList.remove("is-valid");
      productPriceInput.classList.remove("is-valid");     
    }    
    }

function clearForm() {
    productNameInput.value = "";
    productPriceInput.value = "";
    productCategoryInput.value = "";
    productDescriptionInput.value = "";
}

function displayData() {
    var cartona = "";
    for (let i = 0; i < productList.length; i++) {
        cartona += `
        <tr>
            <td>${i}</td>
            <td>${productList[i].name}</td>
            <td>${productList[i].price}</td>
            <td>${productList[i].category}</td>
            <td>${productList[i].desc}</td>
            <td>
                <button onclick="setData(${i})" class="btn btn-sm btn-warning">Update</button>
                <button onclick="deleteItem(${i})" class="btn btn-sm btn-danger">Delete</button>
            </td>
        </tr>`;
    }
    document.getElementById("tableBody").innerHTML = cartona;
}

function deleteItem(index) {
    productList.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(productList));
    displayData();
}

function searchByName() {
    var term = searchInput.value.toLowerCase();
    filterResults((product) => product.name.toLowerCase().includes(term));
}

function searchByCategory() {
    var term = categorySearchInput.value.toLowerCase();
    filterResults((product) => product.category.toLowerCase().includes(term));
}

function filterResults(condition) {
    var cartona = "";
    for (let i = 0; i < productList.length; i++) {
        if (condition(productList[i])) {
            cartona += `
            <tr>
                <td>${i}</td>
                <td>${productList[i].name}</td>
                <td>${productList[i].price}</td>
                <td>${productList[i].category}</td>
                <td>${productList[i].desc}</td>
                <td>
                    <button onclick="setData(${i})" class="btn btn-sm btn-warning">Update</button>
                    <button onclick="deleteItem(${i})" class="btn btn-sm btn-danger">Delete</button>
                </td>
            </tr>`;
        }
    }
    document.getElementById("tableBody").innerHTML = cartona;
}

function setData(index) {
    indexUpdate = index;
    var currentProduct = productList[index];
    productNameInput.value = currentProduct.name;
    productPriceInput.value = currentProduct.price;
    productCategoryInput.value = currentProduct.category;
    productDescriptionInput.value = currentProduct.desc;

    updateBtn.classList.remove("d-none");
    addBtn.classList.add("d-none");
}

function updateProduct() {
    var product = {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        desc: productDescriptionInput.value
    };
    productList.splice(indexUpdate, 1, product);
    localStorage.setItem("products", JSON.stringify(productList));
    displayData();

    updateBtn.classList.add("d-none");
    addBtn.classList.remove("d-none");
}
var nameMessage = document.getElementById("nameMessage")
var priceMessage = document.getElementById("priceMessage")
var categoryMessage = document.getElementById("categoryMessage")
var descriptionMessage = document.getElementById("descriptionMessage")

function validationName() {
   var text = productNameInput.value ; 
   var regexName = /^[A-Z][a-z]{3,12}$/

if (regexName.test(text)) {
productNameInput.classList.add("is-valid")
productNameInput.classList.remove("is-invalid")

nameMessage.classList.add("d-none");
return true;

} else {
   productNameInput.classList.add("is-invalid")
   productNameInput.classList.remove("is-valid")
   nameMessage.classList.remove("d-none");
   return false;
}
}
function validationCategory() {
   var text = productCategoryInput.value ; 
   var regexName = /^[A-Z][a-z]{3,12}$/

if (regexName.test(text)) {
   
   productCategoryInput.classList.add("is-valid")
   productCategoryInput.classList.remove("is-invalid")
   categoryMessage.classList.add("d-none");
return true;

} else {

   productCategoryInput.classList.add("is-invalid")
   productCategoryInput.classList.remove("is-valid")
   categoryMessage.classList.remove("d-none");

   return false;
}
}
function validationDescription() {
   var text = productDescriptionInput.value ; 
   var regexName = /^[a-zA-Z0-9 ,.\-:()'"]{5,500}$/

if (regexName.test(text)) {
   
   productDescriptionInput.classList.add("is-valid")
   productDescriptionInput.classList.remove("is-invalid")
   descriptionMessage.classList.add("d-none");

return true;

} else {

   productDescriptionInput.classList.add("is-invalid")
   productDescriptionInput.classList.remove("is-valid")
   descriptionMessage.classList.remove("d-none");
   return false;
}
}

function validationPrice() {
   var text = productPriceInput.value ; 
   var regexName = /^(\$|€|₹)?\d+(\.\d{1,2})?$/;

if (regexName.test(text)) {
   
   productPriceInput.classList.add("is-valid")
   productPriceInput.classList.remove("is-invalid")

   priceMessage.classList.add("d-none");
   return true;
} else {

   productPriceInput.classList.add("is-invalid")
   productPriceInput.classList.remove("is-valid")

   priceMessage.classList.remove("d-none");
   return false;
}
}