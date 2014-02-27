casper.test.begin('add & remove todos', 5, function suite(test) {

    var links = [];

    function getTodos () {
        var todos = document.querySelectorAll('#todo-list li');
        return todos;
    }

    casper.start("index.html", function() {
        links = this.evaluate(getTodos);
        test.assert((links.length === 0), 'list should be empty');
    });

    // add new todo
    casper.then(function() {
        this.sendKeys('#new-todo', 'casperjs', {keepFocus: true});
        this.sendKeys('#new-todo', casper.page.event.key.Enter , {keepFocus: false});
    });

    casper.then(function() {
        links = this.evaluate(getTodos);
        test.assert((links.length === 1), 'list should have 1 element');
    });

    // add new todo
    casper.then(function() {
        this.sendKeys('#new-todo', 'testing', {keepFocus: true});
        this.sendKeys('#new-todo', casper.page.event.key.Enter , {keepFocus: false});
    });

    casper.then(function() {
        links = this.evaluate(getTodos);
        test.assert((links.length === 2), 'list should have 2 elements');
    });

    // remove first todo
    casper.then(function() {
        this.click('#todo-list li .destroy');
    });

    casper.then(function() {
        links = this.evaluate(getTodos);
        test.assert((links.length === 1), 'list should have 1 element');
    });

    // remove second todo
    casper.then(function() {
        this.click('#todo-list li .destroy');
        this.capture('test.png');
    });

    casper.then(function() {
        links = this.evaluate(getTodos);
        test.assert((links.length === 0), 'list should be empty');
    });

    casper.run(function() {
        test.done();
    });
});
