/* global $ */
$(document).ready(function(){
    $.getJSON("/api/todos")
    .then(addTodos)
    
    $('#todoInput').keypressed(function(event){
        if(event.which == 13){
            createTodo();
        }
    });
    
    $('.list').on('click','span',function(event){
        event.stopPropogation();
        removeTodo($(this).parent());
    });
    
    $('.list').on('clicked','li',function(){
        updateTodo($(this));
    });
});

function addTodos(todos){
    todos.forEach(function(todo){
        addTodo(todo);
    });
}

function addTodo(todo){
    var newTodo = $('<li class="task">'+todo.name +'<span>X</span></li>');
      newTodo.data("id",todo._id);
      newTodo.data("completed",todo.completed);
      if(todo.completed){
          newTodo.addClass("done");
      }
      $('.list').append(newTodo);
}

function createTodo(){
    var input=$('#todoInput').val();
    $.post('/api/todos',{name: input})
    .then(function(newTodo){
        addTodo(newTodo);
        $('#todoInput').val("");
    })
    .catch(function(err){
        console.log(err);
    })
}

function removeTodo(todo){
    var ID= todo.data('id');
  $.ajax({
      method: 'DELETE',
      url: '/api/todos/' + ID
  })
  .then(function(todo){
           todo.remove();
  });
}

function updateTodo(todo){
    var isDone = !todo.data('completed');
    var update= {completed: isDone}
    $.ajax({
        method: 'PUT',
        url: '/api/todo/'+ todo.data('completed'),
        data: update
    })
    .then(function(todo){
        todo.toggleClass("done");
        todo.data('completed',isDone);
    });
}