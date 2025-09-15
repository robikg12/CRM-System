export async function fetchItems(category) {

    const params = {
        filter: category
    };
    const queryParams = new URLSearchParams(params);

    const response = await fetch(`https://easydev.club/api/v1/todos?${queryParams}`);
    const resData = await response.json();
    if (!response.ok) {
        throw new Error('Не удалось получить записи списка задач по категории');
    }
    const resItemsAndCount = { categoryArray: resData.data, count: resData.info }
    
    return resItemsAndCount;

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

