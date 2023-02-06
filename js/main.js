let elForm = document.querySelector(".header__form")
let elFormInp = document.querySelector(".header__inp")
let elHeroList = document.querySelector(".hero__list")
let elHeroModal = document.querySelector(".hero__modal")
let elCloseModal = document.querySelector(".modal__close-btn")
let elModalWrapper = document.querySelector(".modal__wrapper")
let elResultBtn = document.querySelector(".result__btn")
let elBookmarktBtn = document.querySelector(".hero__item-btn")
let elResultText = document.querySelector(".result__text")


function updateBody(bookName) {
    elResultText.textContent = `Showing ${bookName.totalItems} Result(s)`
    bookName.items.forEach(item => {
        elHeroList.innerHTML +=
            `
            <li class="hero__item">
            <img class="hero__item-img" src="${item.volumeInfo.imageLinks.smallThumbnail}" alt="book img">
            <div class="hero__item-block">
            <h2 class="hero__item-title">${item.volumeInfo.title}</h2>
            ${item.volumeInfo.authors.map(item => `<p class="hero__item-text">${item}</p>`).join(" ").trim()}
            <p class="hero__item-text">${item.volumeInfo.publishedDate}</p>
            <div class="hero__item-btns">
            <button class="hero__item-btn">Bookmark</button>
            <button class="hero__item-btn">More Info</button>
            <a class="hero__item-btn" href="${item.volumeInfo.previewLink}" target="blank">Read</a>
            </div>
            </div>
            </li>
            `
    });

    

}

let inpValue = []

if (inpValue[inpValue.length - 1] == '') {
    getBooks("q=search+terms").then((data) => updateBody(data))

}

getBooks("q=search+terms").then((data) => updateBody(data))



elForm.addEventListener('submit', (event) => {
    event.preventDefault()
    inpValue.push(elFormInp.value)
    elHeroList.innerHTML = ''


    if (inpValue.length > 0) {
        getBooks(elFormInp.value).then((data) => updateBody(data))

    }
    else {
        getBooks("q=search+terms").then((data) => updateBody(data))

    }
    elForm.reset()
    console.log(inpValue);

})



elHeroList.addEventListener('click', (event) => {
    if (event.target.innerText == "More Info") {
        elHeroModal.classList.add('modal')
        elModalWrapper.classList.add('active')

    }
})

elHeroModal.addEventListener('click', () => {
    if (elCloseModal) {
        elHeroModal.classList.remove('modal')
        elModalWrapper.classList.remove('active')

    }
    elHeroModal.classList.remove('modal')
    elModalWrapper.classList.remove('active')


})

elResultBtn.addEventListener('click', () => {
    elHeroList.innerHTML = ''
    if (inpValue.length > 0) {
        getBooks(`${inpValue[inpValue.length - 1]}&orderBy=newest`).then((data) => updateBody(data))

    }
    else {
        getBooks("q=search+terms&orderBy=newest").then((data) => updateBody(data))
    }
})

// elBookmarktBtn.addEventListener('click', () => {

// })

