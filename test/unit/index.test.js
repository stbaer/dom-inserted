var test = require('tape');
var domInserted = require('../../');

function addElements(howMany, className){
    var el;
    for (var i = 0; i < howMany; i++) {
        el = document.createElement('div');
        el.classList.add(className || 'test');
        document.body.appendChild(el);
    }
}

test('Has a test suite', function(t) {
    t.equal(1, 1, 'yes');
    t.end();
});

test('There is a browser environment', function(t) {
    addElements(2, 'env');
    t.equal(document.querySelectorAll('.env').length, 2, 'elements are there' );
    t.end();
});

test('Inserted events fire', function(t) {
    var nFired = 0;
    var nrOfElementsToCreate = 5;

    domInserted.listen('meow');
    document.addEventListener('inserted', addToCount);
    function addToCount(){
        nFired += 1;
    }
    addElements(nrOfElementsToCreate, 'meow');

    setTimeout(function(){
        t.equal(nFired, nrOfElementsToCreate, 'inserted events fired' );
        t.end();
    }, 500);

});

test('Can listen to inserted elements with multiple selectors', function(t) {
    var nFired = 0;
    var nrOfDefaultElementsToCreate = 5;
    var nrOfMeowElementsToCreate = 5;

    domInserted.listen('meow');
    domInserted.listen();

    document.addEventListener('inserted', addToCount);
    function addToCount(){
        nFired += 1;
    }
    addElements(nrOfMeowElementsToCreate, 'meow');
    addElements(nrOfDefaultElementsToCreate);

    setTimeout(function(){
        t.equal(nFired, nrOfMeowElementsToCreate + nrOfDefaultElementsToCreate, 'multiple inserted events fired' );
        t.end();
    }, 500);

});
