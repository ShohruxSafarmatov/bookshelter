let getBook = async (book) => {
    const request = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${book}&maxResults=6`)
    const data = await request.json()
    return data

}


async function getBooks(book) {

    const data = await getBook(book)

    return data

}