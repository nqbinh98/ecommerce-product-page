const wrapperNav = document.querySelector('.wrapper-nav');
const wrapperBasket = document.querySelector('.wrapper-basket');
const wrapperBasketItem = document.querySelector('.wrapper-basket-item');
const wrapperLightbox = document.querySelector('.wrapper-lightbox');
const menuNavBtn = document.querySelector('.menu-btn');
const menuCartBtn = document.querySelector('.menu-cart');
const closeMenuBtn = document.querySelector('.close-btn');
const closeLightboxBtn = document.querySelector('.lightbox-close-btn');
const mainProduct = document.querySelector('.wrapper-slide .main-product');
const prevBtns = document.querySelectorAll('.icon-prev');
const nextBtns = document.querySelectorAll('.icon-next');
const minusBtn = document.querySelector('.icon-minus');
const plusBtn = document.querySelector('.icon-plus');
const lightboxMainProductImg = document.querySelector('.lightbox-main-product img');
const mainProductImg = document.querySelector('.wrapper-picture .main-product-img');
const amountResult = document.querySelector('.amount-result');
const allThumbnailBtn = document.querySelectorAll('.thumbnail-item');
const addCartBtn = document.querySelector('.add-cart');
const accountCart = document.querySelector('.account-cart');
const basketEmpty = document.querySelector('.basket-empty');
const checkoutBtn = document.querySelector('.checkout-btn');
let saveDataCart = [];
let totalCart = 0;
let numberImg = 1;
let numberCart = 0;

checkoutBtn.addEventListener('click', function () {
    wrapperBasket.classList.remove('active');
})

addCartBtn.addEventListener('click', function () {
    const imgActive = document.querySelector('.thumbnail-item.active img');
    if (parseFloat(amountResult.innerHTML) >= 1) {
        const basketItemData = {
            indexItem: imgActive.getAttribute('data-src'),
            imageSrc: imgActive.getAttribute('src'),
            price: 125.00,
            amount: parseFloat(amountResult.innerHTML),
            result: parseFloat(125.50) * parseFloat(amountResult.innerHTML),
        }
        totalCart += basketItemData.amount;
        numberCart = 0;
        amountResult.innerHTML = numberCart;

        if (!saveDataCart || !saveDataCart.find(item => parseFloat(item.indexItem) === parseFloat(imgActive.getAttribute('data-src')))) {
            saveDataCart.push(basketItemData);
        } else {
            saveDataCart.forEach(item => {
                if (item.indexItem === imgActive.getAttribute('data-src')) {
                    item.amount += parseFloat(basketItemData.amount);
                    item.result += parseFloat(basketItemData.result);
                }
            })
        }
        renderBasketItem();
    }
})

menuCartBtn.addEventListener('click', function () {
    if (!wrapperBasket.classList.contains('active')) {
        wrapperBasket.classList.add('active')
    } else {
        wrapperBasket.classList.remove('active')
    }
})

mainProduct.addEventListener('click', function () {
    if (!wrapperLightbox.classList.contains('active')) {
        wrapperLightbox.classList.add('active')
    }
})

closeLightboxBtn.addEventListener('click', function () {
    wrapperLightbox.classList.remove('active')
})

minusBtn.addEventListener('click', function () {
    decreaseNumberCart();
    amountResult.innerHTML = numberCart;
})

plusBtn.addEventListener('click', function () {
    increaseNumberCart();
    amountResult.innerHTML = numberCart;
})

prevBtns.forEach(prev => {
    prev.addEventListener('click', function () {
        decreaseNumberImg();
        lightboxMainProductImg.setAttribute('src', `./images/image-product-${numberImg}.jpg`);
        mainProductImg.setAttribute('src', `./images/image-product-${numberImg}.jpg`);
        activeThumbnail(numberImg);
    })
})

nextBtns.forEach(next => {
    next.addEventListener('click', function () {
        increaseNumberImg();
        lightboxMainProductImg.setAttribute('src', `./images/image-product-${numberImg}.jpg`);
        mainProductImg.setAttribute('src', `./images/image-product-${numberImg}.jpg`);
        activeThumbnail(numberImg);
    })
})

menuNavBtn.addEventListener('click', function () {
    wrapperNav.classList.add('active');
})

closeMenuBtn.addEventListener('click', function () {
    wrapperNav.classList.remove('active');
})

wrapperNav.addEventListener('click', function () {
    if (e.target === wrapperNav) {
        wrapperNav.classList.remove('active');
    }
})

allThumbnailBtn.forEach(thumbnailBtn => {
    thumbnailBtn.addEventListener('click', function () {
        if (!this.classList.contains('active')) {
            const imgElement = this.querySelector('img');
            const dataIndex = imgElement.getAttribute('data-src'); 
            numberImg = parseInt(dataIndex);
            mainProductImg.setAttribute('src', `./images/image-product-${numberImg}.jpg`);
            lightboxMainProductImg.setAttribute('src', `./images/image-product-${numberImg}.jpg`);
            activeThumbnail(numberImg);
        }
    })
})

function renderBasketItem () {
    wrapperBasketItem.innerHTML = ``;
    saveDataCart.forEach(basketItemData => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('basket-item');
        
        // basket-item-product
        const productElement = document.createElement('div');
        productElement.classList.add('basket-item-product');
        const imgProduct = document.createElement('img');
        imgProduct.setAttribute('src', `${basketItemData.imageSrc}`);
        productElement.append(imgProduct);
        
        // basket-item-info
        const infoElement = document.createElement('div');
        infoElement.classList.add('basket-item-info');
        const spanElement = document.createElement('span');
        spanElement.textContent = 'Fall Limited Edition Sneakers';
        const moneyElement = document.createElement('div');
        moneyElement.classList.add('basket-item-money');
        const price = document.createElement('div');
        price.classList.add('basket-item-price');
        price.textContent = `$${basketItemData.price.toFixed(2)}`;
        const multiSign = document.createElement('span');
        multiSign.textContent = ' x ';
        const amount = document.createElement('div');
        amount.classList.add('basket-item-amount');
        amount.textContent = `${basketItemData.amount}`;
        const result = document.createElement('div');
        result.classList.add('basket-item-result');
        result.textContent = `$${basketItemData.result.toFixed(2)}`;
        moneyElement.append(price);
        moneyElement.append(multiSign);
        moneyElement.append(amount);
        moneyElement.append(result);
        infoElement.append(spanElement);
        infoElement.append(moneyElement);
    
        // btn-delete
        const deleteBtn = document.createElement('div');
        deleteBtn.classList.add('btn-delete');
        deleteBtn.addEventListener('click', () => {
            deleteCart(itemElement, basketItemData)
        })

        const deleteIcon = document.createElement('img');
        deleteIcon.setAttribute('src', './images/icon-delete.svg');
        deleteBtn.append(deleteIcon);
        
        itemElement.append(productElement);
        itemElement.append(infoElement);
        itemElement.append(deleteBtn);

        wrapperBasketItem.append(itemElement);

    })

    checkEmptyBasket();
}

function activeThumbnail (indexThumb) {
    allThumbnailBtn.forEach(thumbnailBtn => {
        thumbnailBtn.classList.remove('active');
    })

    allThumbnailBtn.forEach(thumbnailBtn => {
        const imgElement = thumbnailBtn.querySelector('img');
        const dataIndex = imgElement.getAttribute('data-src'); 
        if (parseInt(dataIndex) === parseInt(indexThumb)) {
            thumbnailBtn.classList.add('active');
        }
    })
}

function increaseNumberImg () {
    if (numberImg >= 4) {
        numberImg = 1;
    } else {
        numberImg++;
    }
}

function decreaseNumberImg () {
    if (numberImg <= 1) {
        numberImg = 4;
    } else {
        numberImg--;
    }
}

function decreaseNumberCart () {
    if (numberCart <= 0) {
        numberCart = 0;
    } else {
        numberCart--;
    }
}   

function increaseNumberCart () {
    numberCart++;
}

function deleteCart (itemElement, basketItemData) {
    itemElement.remove();
    totalCart -= basketItemData.amount;
    saveDataCart = saveDataCart.filter(item => item !== basketItemData);
    checkEmptyBasket();
}

function checkEmptyBasket () {    
    if (wrapperBasketItem.children.length <= 0) {
        accountCart.classList.remove('active');
        accountCart.innerHTML = totalCart;
        basketEmpty.classList.remove('hide');
        checkoutBtn.classList.remove('active');
        wrapperBasketItem.classList.remove('active');
    } else {
        accountCart.classList.add('active');
        accountCart.innerHTML = totalCart;
        basketEmpty.classList.add('hide');
        checkoutBtn.classList.add('active');
        wrapperBasketItem.classList.add('active');
    }
}