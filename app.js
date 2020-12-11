const form = document.getElementById('form')
const list = document.getElementById('list')
const deleteButtons = document.querySelectorAll('[data-type="button"]')

let todos = JSON.parse(localStorage.getItem('todos') ?? '[]')

renderListAndUpdateLS()

const submitHandler = e => {
  e.preventDefault()

  const { input } = e.target.elements

  if (input.value.trim().length) {
    const id = Date.now()

    todos.push({ title: input.value, id, completed: false })
    renderListAndUpdateLS()
  }

  input.value = ''
}

const removeTodo = id => {
  todos = todos.filter(todo => todo.id !== id)
  renderListAndUpdateLS()
}

const changeTodo = id => {
  todos = todos.map(todo => {
    return todo.id === id ? { ...todo, completed: !todo.completed } : todo
  })
  renderListAndUpdateLS()
}

function getCurrentTodo(id) {
  return document.querySelector(`[data-id="${id}"]`)
}

function updateLS() {
  localStorage.setItem('todos', JSON.stringify(todos))
}

function renderListAndUpdateLS() {
  list.innerHTML = `
		${todos
      .map(todo => {
        return `
				<li>
					<div>
						<input 
							type="checkbox"
							oninput="changeTodo(${todo.id})"
							${todo.completed && `checked`}
						/>
						<span>${todo.title}</span>
					</div>
					<button onclick="removeTodo(${todo.id})">Delete</button>
				</li>
			`
      })
      .join('')}
	`
  updateLS()
}

form.addEventListener('submit', submitHandler)
