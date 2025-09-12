export async function fetchTodoItems() {

    const response = await fetch(`https://easydev.club/api/v1/todos`);
    const resData = await response.json();
    if (!response.ok) {
        throw new Error('Не удалось получить записи списка задач');
    }

    let sortedItems = {
        "all": resData.data,
        "inWork": resData.data.filter((item) => item.isDone === false),
        "completed": resData.data.filter((item) => item.isDone === true)
    }

    return sortedItems;
}

// TODO изучить что такое .then
export async function createNewItem(title) {
    const newItem = { "isDone": false, "title": title };
    const response = await fetch('https://easydev.club/api/v1/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newItem)
    });
    const resData = await response.json();
    if (!response.ok) {
        throw new Error('Не удалось создать новую задачу');
    }
    return resData;
}

export async function editItem(id, status, title) {
    const editedItem = { "isDone": status, "title": title };
    const response = await fetch(`https://easydev.club/api/v1/todos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedItem)
    });
    const resData = await response.json();
    if (!response.ok) {
        throw new Error('Не удалось отредактировать запись');
    }
    return resData;
}


export async function deleteItem(id) {
    const response = await fetch(`https://easydev.club/api/v1/todos/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    if (!response.ok) {
        throw new Error('Не удалось удалить запись');
    }
    return response;
}

