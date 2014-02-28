Kasperle-Theater
================
## End to End Testing with CasperJS ##
     
In this tutorial, we get in touch with end to end testing in JavaScript.
To save time, we take the [existing ToDo App][1] written with Backbone.js. We will extend this app by adding a grunt workflow.
The code of this tutorial is hosted on a [github repository][2].

### Requirements
 - Git
 - node
 - phantomjs
 - casperjs

### Technology
We are using following tools:

- [PhantomJS][3] - a commandline webkit browser without a GUI.
- [CasperJS][4] - scripting and testing tool build for PhantomJS which adds some nice JavaScript API for filling forms, making screenshots, etc.

install them by running following two commands.
    
    npm install phantomjs -g
    npm install casperjs -g

### Getting started
To follow with this tutorial, just clone the repository.

    git clone https://github.com/kwakayama/Testing_Todo_Backbone.git

Now verify if all dependencies are installed by running

    npm install && bower install

When everything is set, you can run the app by opening the index.html.

![TodoMVC App][5]

To start the tests just run the following grunt command. This runs the [grunt-casperjs][6] task registered in the Gruntfile.js.
    
    grunt test
    
You should see something like this terminal output.
![sample terminal output][7]

### Basic Tests
Casperjs has a ton of test and assert functions.
For our basic tests we will use the following commands:

- [assertTitle][8]
- [assertTextExists][9]
- [assertEvalEquals][10]
- [assertExists][11]

You can find the basic tests in the tests/casperjs/basic.js file.

We check that the title is correct.

    test.assertTitle("Backbone.js • TodoMVC", "title is the one expected");
    
We verify that the info text is shown.
    
    test.assertTextExists('Double-click to edit a todo', 'page body contains info');
    
We query the dom to ensure the correct text in the header.

    test.assertEvalEquals(function() {
        return __utils__.findOne('h1').textContent;
    }, 'todos');

We query the dom to ensure the correct placeholder text.

    test.assertEvalEquals(function() {
        return __utils__.findOne('#new-todo').getAttribute('placeholder');
    }, 'What needs to be done?');

We check that the todo list is there.

    test.assertExists('#todo-list', 'body contains list');

### Advanced Tests

In the advanced tests we will interact with the app.
Our tests will cover adding and removing todos.
You can find the advanced tests in the tests/casperjs/advanced.js file.

We create a helper function which will return our todos.

    function getTodos () {
        var todos = document.querySelectorAll('#todo-list li');
        return todos;
    }

At the beginning we make sure that the todo list is empty.
We call the getTodos function by passing it to the [evaluate][12] function. The evaluate function runs getTodos in the dom context.
The return value is an array containing the todos.
At this point of time we expect the array to be empty.

    links = this.evaluate(getTodos);
    test.assert((links.length === 0), 'list should be empty');
    
Now we create a new todo with the title 'casperjs'. To add a new todo, we have to fill out the input with the id 'new-todo' and hit enter. Therefore we're using the [sendKeys][13] function. With this function we send keyboard  events to the input element. We're sending the string 'casperjs' and the enter key.

    this.sendKeys('#new-todo', 'casperjs');
    this.sendKeys('#new-todo', casper.page.event.key.Enter);

The list should now contain one todo.

    links = this.evaluate(getTodos);
    test.assert((links.length === 1), 'list should have 1 element');
    
We repeat the add step and change only the title

    this.sendKeys('#new-todo', 'testing');
    this.sendKeys('#new-todo', casper.page.event.key.Enter);
    
The list should now contain two todos.

    links = this.evaluate(getTodos);
    test.assert((links.length === 2), 'list should have 2 element');
    
To delete a todo, each has a button with the 'destroy' class.
We can click the todo with this simple snippet.

    this.click('#todo-list li .destroy');

At the end we have again an empty list.

    links = this.evaluate(getTodos);
    test.assert((links.length === 0), 'list should be empty');
    
 
That's it. You made the first steps in end to end testing with CasperJs.
If you have any questions or suggestions to improve/extend this tutorial, feel free to leave a comment.


  [1]: https://github.com/tastejs/todomvc/tree/gh-pages/architecture-examples/backbone
  [2]: https://github.com/kwakayama/Kasperle-Theater.git
  [3]: http://phantomjs.org/
  [4]: http://casperjs.org/
  [5]: https://lh6.googleusercontent.com/-gcUPOl9aZ94/Uw-tpZ29B0I/AAAAAAAAByg/r8NE3a-5l4w/s0/TodoMVC_Backbone.png "TodoMVC_Backbone.png"
  [6]: https://github.com/ronaldlokers/grunt-casperjs
  [7]: https://lh5.googleusercontent.com/-XidoQhDQYBk/Uw-wXwi6WlI/AAAAAAAABys/58WmXFqD3cY/s0/Terminal.png "Terminal.png"
  [8]: http://casperjs.readthedocs.org/en/latest/modules/tester.html#asserttitle
  [9]: http://casperjs.readthedocs.org/en/latest/modules/tester.html#asserttextexists
  [10]: http://casperjs.readthedocs.org/en/latest/modules/tester.html#assertevalequals
  [11]: http://casperjs.readthedocs.org/en/latest/modules/tester.html#assertexists
  [12]: http://docs.casperjs.org/en/latest/modules/casper.html#evaluate
  [13]: http://docs.casperjs.org/en/latest/modules/casper.html?highlight=sendkeys#sendkeys
