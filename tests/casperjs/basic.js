casper.test.begin('Basic Setup Test', 5, function suite(test) {

    casper.start("index.html", function() {
        this.echo(this.getCurrentUrl());

        test.assertTitle("Backbone.js • TodoMVC", "title is the one expected");

        test.assertTextExists('Double-click to edit a todo', 'page body contains info');

        // check for the heading
        test.assertEvalEquals(function() {
            return __utils__.findOne('h1').textContent;
        }, 'todos');

        test.assertEvalEquals(function() {
            return __utils__.findOne('#new-todo').getAttribute('placeholder');
        }, 'What needs to be done?');

        test.assertExists('#todo-list', 'body contains list');
    });

    casper.run(function() {
        test.done();
    });
});
