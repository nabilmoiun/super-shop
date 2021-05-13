const searchKey = document.getElementById('product');
const searchResults = document.getElementById('searchResults');
const product = document.getElementById("product");
const quantity = document.getElementById("quantity");
const quantityLabel = document.getElementById("quantityLabel");
const quantityMessage = document.getElementById("quantity_validation_message");
const addProductButton = document.getElementById("addProductButton");
const productForm = document.getElementById("productForm");
const productTable = document.getElementById("productTable");
const orderTable = document.getElementById("orderTable");
const orderForm = document.getElementById("orderForm");
const orderButton = document.getElementById('orderButton');
const customerName = document.getElementById("customer_name");
const customerNameMessage = document.getElementById(
  "customer_name_validation_message"
);
const customerPhone = document.getElementById("phone");
const customerPhoneMessage = document.getElementById(
  "customer_phone_validation_message"
);
const customerEmail = document.getElementById("email");
const customerEmailMessage = document.getElementById(
  "customer_email_validation_message"
);
const orderConfirmationMessage = document.getElementById('order-success-message');

let validatedData = {
  product: false,
  quantiy: false,
  price: false,
  stock: false
};
let validatedOrderData = {
  customer_name: false,
  phone: false,
  email: false,
};

searchKey.onkeyup = () => productList(searchKey.value);
addProductButton.onclick = () => addProduct(event);
orderForm.onsubmit = (event) => createOrder(event);

function productList(key) {
  if(key) {
    const url = `/search_products/${key}/`
    fetch(url, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(response => {
      return response.json();
    })
    .then(data => {
      generateResultDom(data);
    })
    .catch(error => {
      alert('Something went wrong');
    })
  }
  else{
    searchResults.innerHTML = '';
    searchResults.style.display = "none";
  }
}

function generateResultDom(results) {
  if(results.length > 0) {
    let ul = document.createElement('ul');
    ul.setAttribute('class', 'list-unstyled');
    for(let result of results) {
      let li = document.createElement('li');
      li.innerHTML = result.name;
      ul.appendChild(li);
      li.addEventListener('click', () => setValue(result));
    }
    displaySearchResults(ul);
  }
  else {
    searchResults.innerHTML = '';
    searchResults.innerHTML = `<h5 class="text-monospace">No results</h5>`
    searchResults.style.display = "block";
  }
  }

function displaySearchResults(dom) {
  searchResults.innerHTML = '';
  searchResults.appendChild(dom);
  searchResults.style.display = "block";
}

function setValue(product) {
  searchKey.value = product.name;
  searchKey.setAttribute('data-product', `${product.id}`);
  searchResults.innerHTML = '';
  searchResults.style.display = "none";
  getProductInformation(parseInt(searchKey.dataset.product));
}

function getProductInformation(product) {
  const url = `/get_product_information/${product}/`;
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      fillUpProductInformation(data[0]);
    })
    .catch((error) => {
      alert("Something went wrong");
    });
}

function fillUpProductInformation(data) {
  const price = document.getElementById("price");
  const stock = document.getElementById("stock");
  const category = document.getElementById("category");
  price.value = data.price;
  stock.value = `${data.stock} ${data.unit}`;
  category.value = data.category;
  category.setAttribute("category_id", data.category_id);
  quantityLabel.innerHTML = "";
  quantityLabel.innerHTML = `Quantity in(${data.unit})`;
  quantityMessage.innerHTML = '';
}

function validateProductSelection(value) {
  if(!value) {
    alert('Please select a product');
    validatedData.product = false;
    return false;
  }
  else {
    validatedData.product = true;
    return true;
  }
}

function validatePrice(value) {
  if(!value) {
    alert('Please select a product');
    validatedData.price = false;
    return false;
  }
  else {
    validatedData.price = true;
    return true;
  }
}

function validateQuantity(value) {
  if (!quantity.value) {
    quantityMessage.innerHTML = "";
    quantityMessage.innerHTML = "Please enter quantity";
    validatedData.quantiy = false;
    return false;
  } else if (parseFloat(quantity.value) < 1) {
    quantityMessage.innerHTML = "";
    quantityMessage.innerHTML = "Cant be less than 1";
    validatedData.quantiy = false;
    return false;
  } else if (parseFloat(quantity.value) > parseFloat(stock.value)) {
    quantityMessage.innerHTML = "";
    quantityMessage.innerHTML = "Not available in stocks";
    validatedData.quantiy = false;
    return false;
  } else {
    quantityMessage.innerHTML = "";
    validatedData.quantiy = true;
    return true;
  }
}

function addProduct(event) {
  if (validateQuantity(quantity.value) && validateProductSelection(product.value) && validatePrice(price.value)) {
    event.preventDefault();
    let addedProduct = {
      productId: parseInt(product.dataset.product),
      productName: product.value,
      productPrice: parseFloat(price.value),
      quantity: parseFloat(quantity.value),
      subtotal: parseFloat(price.value) * parseFloat(quantity.value),
    };
    addProductToOrderTable(addedProduct);
    productForm.reset();
  } else {
    event.preventDefault();
  }
}

function addProductToOrderTable(data) {
  const product = document.getElementById(data.productId);
  if (product) {
    alert("Proudct already added");
  } else {
    const totalRows = document.getElementsByTagName("tr").length;
    const tr = document.createElement("tr");
    tr.setAttribute("id", data.productId);
    tr.setAttribute("data-product", data.productId);
    tr.setAttribute("data-quantity", data.quantity);
    const td = document.createElement("td");
    const deleteIcon = document.createElement("i");
    deleteIcon.setAttribute("class", "fa fa-trash");
    deleteIcon.setAttribute(
      "onclick",
      `removeProductFromOrderTable(${data.productId})`
    );
    td.appendChild(deleteIcon);
    const objectLength = Object.keys(data).length;
    const keys = Object.keys(data);
    for (let i = 1; i < objectLength; i++) {
      tr.innerHTML += `
                    <td>${data[keys[i]]}</td>
                `;
    }
    tr.appendChild(td);
    orderTable.appendChild(tr);
  }
}

function removeProductFromOrderTable(productId) {
  let product = document.getElementById(productId);
  product.remove();
}

function validateCustomerName() {
  if (!customerName.value) {
    customerNameMessage.innerHTML = "";
    customerNameMessage.innerHTML = "Please enter customer name";
    validatedOrderData.customer_name = false;
  } else {
    customerNameMessage.innerHTML = "";
    validatedOrderData.customer_name = true;
  }
}

function validateCustomerPhone() {
  if (!customerPhone.value) {
    customerPhoneMessage.innerHTML = "";
    customerPhoneMessage.innerHTML = "Please enter customer phone number";
    validatedOrderData.phone = false;
  } else {
    customerPhoneMessage.innerHTML = "";
    validatedOrderData.phone = true;
  }
}

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function validateCustomerEmail() {
  if (!customerEmail.value) {
    customerEmailMessage.innerHTML = "";
    customerEmailMessage.innerHTML = "Please enter customer email address";
    validatedOrderData.email = false;
  }
  else{
    if(!validateEmail(customerEmail.value)) {
      customerEmailMessage.innerHTML = "";
      customerEmailMessage.innerHTML = "Please enter a valid email address";
      validatedOrderData.email = false;
    }
    else {
      customerEmailMessage.innerHTML = "";
      validatedOrderData.email = true;
    }
  }
}

function createOrder(event) {
  event.preventDefault();
  const totalSelectedProducts = orderTable.querySelectorAll("tr");
  if (totalSelectedProducts.length < 1) {
    alert("Please select product first");
  } else {
    validateCustomerName(customerName.value);
    validateCustomerPhone(customerPhone.value);
    validateCustomerEmail(customerEmail.value);
    if (
      validatedOrderData.customer_name &&
      validatedOrderData.phone &&
      validatedOrderData.email
    ) {
      let order = [];
      let products = [];
      const customerInformation = {
        customer_name: customerName.value,
        phone: customerPhone.value,
        email: customerEmail.value,
      };
      for (let product of totalSelectedProducts) {
        products.push({
          product_id: product.dataset.product,
          quantity: parseFloat(product.dataset.quantity),
        });
      }
      order.push(customerInformation);
      order.push(products);

      saveOrder(JSON.stringify(order));
    } else {
      event.preventDefault();
    }
  }
}

function saveOrder(orderData) {
  const url = `/save_order/`;
  orderButton.setAttribute("disabled", true);
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-CSRFToken": csrftoken,
    },
    body: orderData,
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      orderTable.innerHTML = "";
      orderForm.reset();
      if(orderConfirmationMessage.classList.contains('hide-message')) {
        orderConfirmationMessage.classList.remove('hide-message');
      }
      orderConfirmationMessage.classList.add('show-message');
      let div = document.createElement('div');
      div.setAttribute('class', 'view-order');
      let viewLink = document.createElement('a');
      viewLink.setAttribute('href', `/order_details/invoice/${data.invoice_id}/`);
      let viewText = document.createTextNode('View Order');
      viewLink.appendChild(viewText);
      div.appendChild(viewLink);
      document.getElementById('message-div').appendChild(div);
      orderButton.removeAttribute('disabled');
    })
    .catch((error) => {
      alert('Something went wrong');
      orderButton.removeAttribute('disabled');
    });
}

function closeOrderMessage(event) {
  if(orderConfirmationMessage.classList.contains('show-message')) {
    orderConfirmationMessage.classList.remove('show-message');
  }
  orderConfirmationMessage.classList.add('hide-message');
  const orderLink = event.target.parentElement.parentElement.nextElementSibling;
  if(orderLink) {
    orderLink.remove();
  };
}

