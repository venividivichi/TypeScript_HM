enum TodoStatus { Pending, Completed }
enum TodoType { Default, ConfirmationRequired }

type SortCriteria = 'status' | 'creationDate';
type SortOrder = 'asc' | 'desc';

interface ITodoItem {
    id: string;
    name: string;
    content: string;
    creationDate: Date;
    lastEditDate: Date;
    status: TodoStatus;
    type: TodoType;
    edit(name: string, content: string): void;
}

class TodoItem implements ITodoItem {
    id: string;
    name: string;
    content: string;
    creationDate: Date;
    lastEditDate: Date;
    status: TodoStatus;
    type: TodoType;

    constructor(id: string, name: string, content: string, type: TodoType) {
        if (!name.trim() || !content.trim()) {
            throw new Error('Content cannot be empty, type something!');
        }

        this.id = id;
        this.name = name;
        this.content = content;
        this.creationDate = new Date();
        this.lastEditDate = new Date();
        this.status = TodoStatus.Pending;
        this.type = type;
    }

    edit(name: string, content: string): void {
        
        if (!name.trim() || !content.trim()) {
            throw new Error('Content cannot be empty, type something!');
        }

        this.name = name;
        this.content = content;
        this.lastEditDate = new Date();
        console.log(`Item '${this.id}' has been edited.`);
    }
}

class TodoList {
    private items: ITodoItem[] = [];

    addItem(item: ITodoItem): void {
        this.items.push(item);
    }

    removeItem(id: string): void {
        this.items = this.items.filter(item => item.id !== id);
    }

    editItem(id: string, name: string, content: string): void {
        let item = this.items.find(item => item.id === id);
        if (item) {
            item.edit(name, content);
        }
    }

    getItem(id: string): ITodoItem | undefined {
        return this.items.find(item => item.id === id);
    }

    getAllItems(): ITodoItem[] {
        return this.items;
    }

    markCompleted(id: string): void {
        let item = this.items.find(item => item.id === id);
        if (item) {
            item.status = TodoStatus.Completed;
        }
    }

    getItemsCount(): number {
        return this.items.length;
    }

    getPendingItemsCount(): number {
        return this.items.filter(item => item.status === TodoStatus.Pending).length;
    }

    searchItems(query: string): ITodoItem[] {
        query = query.toLowerCase();
        return this.items.filter(item => item.name.toLowerCase().includes(query) || item.content.toLowerCase().includes(query));
    }

    sortItems(criteria: SortCriteria, order: SortOrder = 'asc'): ITodoItem[] {
        return this.items.sort((a, b) => {
            if (criteria === 'status') {
                if (order === 'asc') {
                    return a.status - b.status;
                } else {
                    return b.status - a.status;
                }
            } else if (criteria === 'creationDate') {
                if (order === 'asc') {
                    return a.creationDate.getTime() - b.creationDate.getTime();
                } else {
                    return b.creationDate.getTime() - a.creationDate.getTime();
                }
            } else {
                throw new Error('Bad sort condition');
            }``
        });
    }

    editWithConfirmation(id: string, name: string, content: string, user_confirm: boolean): void {
        let item = this.items.find(item => item.id === id);
        if (!item) {
            console.log(`Note with ID ${id} not found.`);
            return;
        }
        if (item.type !== TodoType.ConfirmationRequired) {
            console.log(`Editing note with ID ${id} need confirmation and right note Type.`);
            return
        }

        try {
            item.edit(name, content);
            console.log(`Note with ID ${id} was edit successful.`);
        } catch (error) {
            if (error instanceof Error)
             console.error(`Get error: ${error.message}`);
        }
    }
}

let todoList = new TodoList();

todoList.addItem(new TodoItem('1', 'Сніданок', 'Зробити бутіки та чайок', TodoType.Default));
todoList.addItem(new TodoItem('2', 'Погуляти собакена', 'Минути всіх собак та всі калюжі', TodoType.Default));
todoList.addItem(new TodoItem('3', 'Приїхати на роботку', 'Послухати файну музику, незабувати оглядатись навколо', TodoType.ConfirmationRequired));
console.log(todoList.getAllItems());
console.log('---------------------------------');
let searchResults = todoList.searchItems('собакен');
console.log(searchResults);
console.log('---------------------------------');
let sortedByStatus = todoList.sortItems('status', 'asc');
console.log(sortedByStatus);
console.log('---------------------------------');
let sortedByCreationDate = todoList.sortItems('creationDate', 'desc');
console.log(sortedByCreationDate);
console.log('---------------------------------');
todoList.markCompleted('3');
console.log(todoList.getItem('3'));
console.log('---------------------------------');
console.log('Before edit:', todoList.getItem('2'));
todoList.editItem('2', 'Погуляти собакена', 'Пройтися парком, обнюхати все');
console.log('After edit:', todoList.getItem('2'));
console.log('---------------------------------');
todoList.editWithConfirmation('3', 'Приїхати на роботку', 'Зайти за кавульою', true);