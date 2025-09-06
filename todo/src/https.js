export async function fetchTodoItems(category) {
    const params = new URLSearchParams({
        filter: category
    });
    const response = await fetch(`https://easydev.club/api/v1/todos?${params}`);
    const resData = await response.json();
    if (!response.ok) {
        throw new Error('Не удалось получить записи списка задач');
    }
    return resData.data;
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

