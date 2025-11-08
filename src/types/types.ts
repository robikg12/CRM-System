//Не знаю что лучше, вывести типы в отдельный файл или экспортировать их из компонентов.

export type Todo = {
    created: string;
    id: number;
    isDone: boolean;
    title: string;
}
export type ItemCount = {
    all: number | null;
    completed: number | null;
    inWork: number | null;
}

export type TodosData = {
    todos: Todo[];
    counts: ItemCount;
}


// TODO: Почему я назвал тип Error?
// Поменял имя на Status. Т.к накладывается на js класс Error
export type Status = {
    isValid: boolean;
    message: string;
}