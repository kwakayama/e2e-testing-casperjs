casper.test.begin('Basic Setup Test', 3, function suite(test) {

    casper.start("index.html", function() {
        this.echo(this.getCurrentUrl());

        test.assertTitle("Backbone.js • TodoMVC", "title is the one expected");

        test.assertTextExists('todos', 'page body contains header "todos"');

        // check for the heading
        test.assertEvalEquals(function() {
            return __utils__.findOne('h1').textContent;
        }, 'todos');
    });

    casper.run(function() {
        test.done();
    });
});
