import { TodoFilter } from "../cmps/TodoFilter.jsx"
import { TodoList } from "../cmps/TodoList.jsx"
import { DataTable } from "../cmps/data-table/DataTable.jsx"
import { todoService } from "../services/todo.service.js"
import { showErrorMsg, showSuccessMsg, showUserInteraction } from "../services/event-bus.service.js"
import { loadTodos, removeTodo, saveTodo, setFilterBy } from "../store/actions/todo.actions.js"
import { setLoading } from "../store/actions/loading.actions.js"
import { utilService } from "../services/util.service.js"

const { useEffect } = React
const { useSelector } = ReactRedux
const { Link, useSearchParams } = ReactRouterDOM

export function TodoIndex() {

    const [searchParams, setSearchParams] = useSearchParams()

    const todos = useSelector(storeState => storeState.todoModule.todos)
    const todosLength = useSelector(storeState => storeState.todoModule.todos.filter(todo => !todo.isDone).length)
    const filterBy = useSelector(storeState => storeState.todoModule.filterBy)
    const isLoading = useSelector(storeState => storeState.loadingModule.loading)

    useEffect(() => {

        const defaultFilter = todoService.getFilterFromSearchParams(searchParams)
        onSetFilterBy(defaultFilter)
        utilService.debounce(loadTodos(defaultFilter)
            .then(() => setLoading(false))
            .catch(() => showErrorMsg('Cannot load todos')))

    }, [searchParams])

    function onSetFilterBy(filterBy) {

        setSearchParams(filterBy)
        setFilterBy(filterBy)
    }

    function onRemoveTodo(todoId) {
        showUserInteraction({
            txt: 'Are you sure you want to remove this Todo?',
            type: 'interaction',
            button:
            {
                txt: 'Yes',
                action: () => {
                    removeTodo(todoId)
                        .then(() => showSuccessMsg(`Todo removed`))
                        .catch(() => showErrorMsg('Cannot remove todo ' + todoId))
                }
            }

        })
    }

    function onToggleTodo(todo) {
        const todoToSave = { ...todo, isDone: !todo.isDone }
        saveTodo(todoToSave)
            .then((savedTodo) => showSuccessMsg(`Todo is ${(savedTodo.isDone) ? 'done' : 'back on your list'}`))
            .catch(() => showErrorMsg('Cannot toggle todo '))
    }

    if (isLoading) return <div className="loading"><h1>Loading Todos...</h1></div>
    if (!todos) return <div className="loading"><h1>No Todos to show</h1></div>

    return (
        <section className="todo-index">
            <TodoFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
            <div>
                <Link to="/todo/edit" className="btn" >Add Todo</Link>
            </div>
            <h2>Todos List</h2>
            <TodoList todos={todos} onRemoveTodo={onRemoveTodo} onToggleTodo={onToggleTodo} />
            <hr />
            <h2>{todosLength} todos left</h2>
            <hr />
            <h2>Todos Table</h2>
            <div style={{ width: '60%', margin: 'auto' }}>
                <DataTable todos={todos} onRemoveTodo={onRemoveTodo} />
            </div>
        </section>
    )
}