/*
-----------------TO-DOs:
- DATA MODULE - 
add data from above into internal data structure
calculate new budget

- UI MODULE - 
get input values for the description/value fields
after added to data structure then display on UI
update UI with new budget

- CONTROLLER MODULE - 
Add event handler for entering expenses/deposits

*/

//Creating modules for various aspects of the app
var budgetController = (function(){

    //some code

})();
var uiController = (function(){
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
    };
    return {
        getInput: function(){
            return{
                type: document.querySelector(DOMstrings.inputType).value, // either inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            };
        },
        getDOMstrings: function(){
            return DOMstrings;0
        }
    };
})();

//using different names for arguments to leave this controller more independant
var appController = (function(budgetCtrl, UICtrl){
    var setupEventListeners = function(){
        var DOM = uiController.getDOMstrings();
        document.querySelector(DOM.inputBtn).addEventListener('click',ctrlAddItem);
        document.addEventListener('keypress', function(e){
            if(e.keyCode === 13 || event.which === 13){
                ctrlAddItem();
            }
        });
    };
    
    var ctrlAddItem = function(){
        // 1. Get input data
        var input = uiController.getInput();
        console.log(input);
        // 2. add item to budget controller

        // 3. add item to UI

        // 4. Calculate new budget

        // 5. display new budget to UI

    }
    return {
        init: function(){
            setupEventListeners();
        }
    }
})(budgetController, uiController);








