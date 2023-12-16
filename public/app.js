const deleteUserForm = document.querySelector('#deleteUser')
const deleteCategoryForm = document.querySelector('#deleteCategory')
const filterRecordForm = document.querySelector('#filterRecord')
const deleteRecordForm = document.querySelector('#deleteRecord')

const elems = document.querySelectorAll('select')
instance = M.FormSelect.getInstance(elems)

if (deleteUserForm) {
    deleteUserForm.addEventListener('submit', (event) => {
        event.preventDefault()
        const userId = deleteUserForm.querySelector("input[name='id']").value
        fetch(`/user/${userId}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(res => {
                if (res.status == 0) {
                    window.location.href = '/users'
                } else {
                    window.location.href = '/delete/user/error'
                }
            })
    })
}

if (deleteCategoryForm) {
    deleteCategoryForm.addEventListener('submit', (event) => {
        event.preventDefault()
        const categoryName = deleteCategoryForm.querySelector("input[id='name']").value
        fetch(`/category?categoryName=${categoryName}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(res => {
                if (Array.isArray(res)) {
                    window.location.href = '/category'
                } else {
                    window.location.href = '/delete/category/error'
                }
            })
    })
}

if (filterRecordForm) {
    filterRecordForm.addEventListener('submit', (event) => {
        event.preventDefault()
        const userId = filterRecordForm.querySelector("input[id='user_id']").value
        const categoryId = filterRecordForm.querySelector("input[id='category_id']").value
        fetch(`/record?userId=${userId}&categoryId=${categoryId}`)
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if (res.selectedRecords.length) {
                    document.body.innerHTML = "";
                    const jsonDisplay = document.createElement("pre");
                    jsonDisplay.textContent = JSON.stringify(res.selectedRecords, null, 2);
                    document.body.appendChild(jsonDisplay);
                } else {
                    if (res.status == 'u') {
                        window.location.href = '/find/filter/userId/error'
                    } else if (res.status == 'c') {
                        window.location.href = '/find/filter/categoryId/error'
                    } else if (res.status == 'a') {
                        window.location.href = '/find/filter/error'
                    } else {
                        window.location.href = '/find/filter/noParams/error'
                    }
                }
            })
    })
}

if (deleteRecordForm) {
    deleteRecordForm.addEventListener('submit', (event) => {
        event.preventDefault()
        const recordId = deleteRecordForm.querySelector("input[id='id']").value
        fetch(`/record/${recordId}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(res => {
                if (Array.isArray(res)) {
                    window.location.href = '/records'
                } else {
                    window.location.href = '/delete/record/error'

                }
            })
    })
}
