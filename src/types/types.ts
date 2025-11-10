//Не знаю что лучше, вывести типы в отдельный файл или экспортировать их из компонентов.

export type Todo = {
    created: string;
    id: number;
    isDone: boolean;
    title: string;
}

//Вынужден оставить | null
export type ItemCount = {
    all: number | null;
    completed: number | null;
    inWork: number | null;
}

export type TodosData = {
    data: Todo[];
    info: ItemCount;
    meta: {
        totalAmount: number;
    }
}


// TODO: Почему я назвал тип Error?
// Поменял имя на Status. Т.к накладывается на js класс Error
export type Status = {
    isValid: boolean;
    message: string;
}