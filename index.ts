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
        if (this.type === TodoType.ConfirmationRequired) {
            console.log('Confirm editing!');
        }
        
        if (!name.trim() || !content.trim()) {
            throw new Error('Content cannot be empty, type something!');
        }

        this.name = name;
        this.content = content;
        this.lastEditDate = new Date();
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
}

let todoList = new TodoList();

todoList.addItem(new TodoItem('1', 'Test Todo', 'Do something important', TodoType.Default));
todoList.addItem(new TodoItem('2', 'Read a book', 'Read Clean Code by Robert C. Martin', TodoType.Default));
todoList.addItem(new TodoItem('3', 'Book reading', 'Read Clean Code by Robert C. Martin', TodoType.Default));
console.log(todoList.getAllItems());

let searchResults = todoList.searchItems('clean');
console.log(searchResults);

let sortedByStatus = todoList.sortItems('status', 'asc');
console.log(sortedByStatus);

let sortedByCreationDate = todoList.sortItems('creationDate', 'desc');
console.log(sortedByCreationDate);