let elForm = document.querySelector(".header__form")
let elFormInp = document.querySelector(".header__inp")
let elHeroList = document.querySelector(".hero__list")
let elHeroModal = document.querySelector(".hero__modal")
let elCloseModal = document.querySelector(".modal__close-btn")
let elModalWrapper = document.querySelector(".modal__wrapper")
let elResultBtn = document.querySelector(".result__btn")
let elBookmarktBtn = document.querySelector(".hero__item-btn")
let elResultText = document.querySelector(".result__text")
let elBookmarkList = document.querySelector(".boookmark__list")


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
let bookmarkArr = []

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

})



let idNum = 0
elHeroList.addEventListener('click', (event) => {

    if (event.target.innerText == "More Info") {
        elHeroModal.classList.add('modal')
        elModalWrapper.classList.add('active')

    } else if (event.target.textContent == 'Bookmark') {
        elBookmarkList.innerHTML = ''
        bookmarkArr.push(
            {
                bookId: idNum,
                bookName: event.target.parentElement.parentElement.childNodes[1].textContent,
                bookAuthor: event.target.parentElement.parentElement.childNodes[3].textContent,
                bookLink: event.target.parentElement.childNodes[5].href
            }
        )
        idNum++
        bookmarkArr.forEach(item => {
            // // CreatElement
            // let elItem = document.createElement("li")
            // let elItemWrapper = document.createElement("div")
            // let elItemTitle = document.createElement("h2")
            // let elItemText = document.createElement("p")
            // let elItemBtns = document.createElement("div")
            // let elItemRead = document.createElement("a")
            // let elItemRemove = document.createElement("button")
            // let elItemIconRead = document.createElement("i")
            // let elItemIconClose = document.createElement("i")
            // // ClassList
            // elItem.classList.add("bookmark__item")
            // elItemWrapper.classList.add("bookmark__item-wrapper")
            // elItemTitle.classList.add("bookmark__item-title")
            // elItemText.classList.add("bookmark__item-text")
            // elItemBtns.classList.add("bookmark__item-btns")
            // elItemRead.classList.add("bookmark__item-btn")
            // elItemRemove.classList.add("bookmark__item-btn")
            // elItemIconRead.className = "bx bx-book-open"
            // elItemIconClose.className = "bx bx-x-circle"
            // // SettAtribute
            // elItemRead.setAttribute('href', item.bookLink)
            // // TextContent
            // elItemTitle.textContent = item.bookName
            // elItemText.textContent = item.bookAuthor
            // // Append
            // elItemRemove.append(elItemIconClose)
            // elItemRead.append(elItemIconRead)
            // elItemBtns.append(elItemRead, elItemRemove)
            // elItemWrapper.append(elItemTitle, elItemText)
            // elItem.append(elItemWrapper, elItemBtns)
            // elBookmarkList.append(elItem)



            elBookmarkList.innerHTML +=
                `
                <li class="bookmark__item">
                <div class="bookmark__item-wrapper">
                <h3 class="bookmark__item-title">${item.bookName}</h3>
                <p class="bookmark__item-text">${item.bookAuthor} </p>
                </div>
                <div class="bookmark__item-btns">
                <a class="bookmark__item-btn" href="${item.bookLink}" target="blank"><i class='bx bx-book-open'></i></a>
                <button class="bookmark__item-btn"><i class='bx bx-x-circle'></i></button>
                </div>
                </li>
                `
        })
    }

})


elHeroModal.addEventListener('click', () => {
    if (elCloseModal) {
        elHeroModal.classList.remove('modal')
        elModalWrapper.classList.remove('active')

    }
    elHeroModal.classList.remove('modal')
    elModalWrapper.classList.remove('active')
    // localStorage.setItem('bookmarkArr', JSON.stringify(bookmarkArr))
    // console.log(JSON.parse(localStorage.getItem('bookmarkArr')));



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


elBookmarkList.addEventListener('click', (event) => {

    if (event.target.classList[1] == "bx-x-circle") {

        let bookmarkTarget = event.target.parentNode.parentNode.parentNode.childNodes[1].childNodes[1].textContent
        event.target.parentNode.parentNode.parentNode.remove()
        bookmarkArr = bookmarkArr.filter(item => item.bookName !== bookmarkTarget)
        elBookmarkList.innerHTML = ''
        bookmarkArr.forEach(item => {
            elBookmarkList.innerHTML +=
                `
                <li class="bookmark__item">
                <div class="bookmark__item-wrapper">
                <h3 class="bookmark__item-title">${item.bookName}</h3>
                <p class="bookmark__item-text">${item.bookAuthor} </p>
                </div>
                <div class="bookmark__item-btns">
                <a class="bookmark__item-btn" href="${item.bookLink}" target="blank">
                <i class='bx bx-book-open'></i>
                </a>
                <button class="bookmark__item-btn">
                <i class='bx bx-x-circle'></i>
                </button>
                </div>
                </li>
                `
        })

        console.log(bookmarkArr);
    }


})
