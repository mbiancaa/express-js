const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

const todosPath = path.join(__dirname, '../data/todos.json');

function getTodos() {
    return JSON.parse(fs.readFileSync(todosPath, 'utf-8'));
}

function saveTodos(todos) {
    fs.writeFileSync(todosPath, JSON.stringify(todos, null, 2));
}

router.get('/', (req, res) => {
    res.json(getTodos());
});

router.get('/:id', (req, res) => {
    const todos = getTodos();
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) return res.status(404).send("Todo not found");
    res.json(todo);
});

router.post('/', (req, res) => {
    const todos = getTodos();
    const newTodo = {
        id: Date.now(),
        task: req.body.task,
        done: false
    };
    todos.push(newTodo);
    saveTodos(todos);
    res.status(201).json(newTodo);
})

router.put('/:id', (req, res) => {
    const todos = getTodos();
    const idx = todos.findIndex(t => t.id === parseInt(req.params.id));
    if (idx === -1) return res.status(404).send("Todo not found");

    todos[idx] = { ...todos[idx], ...req.body };
    saveTodos(todos);
    res.json(todos[idx]);
})

router.delete('/:id', (req, res) => {
    let todos = getTodos();
    todos = todos.filter(t => t.id !== parseInt(req.params.id));
    saveTodos(todos);
    res.status(204).end();
});

module.exports = router;