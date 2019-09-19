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
    var Expense = function(id,description,value){
        this.id = id;
        this.description = description;
        this.value = value;
    };
    var Income = function(id,description,value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    }
    return{
        addItem: function(type, desc, val){
            var newItem, ID;
            //Create new ID based on the last ID in 'inc' or 'exp' arrays
            if (data.allItems[type].length > 0){
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            }else{
                ID = 0;
            }
            
            //Create new item based on 'inc' or 'exp'
            if (type === 'exp'){
                newItem = new Expense(ID, desc, val)
            }else{
                newItem = new Income(ID, desc, val)
            }
            //push newItem into data structure and return it
            data.allItems[type].push(newItem);
            return newItem;
        },
        //Testing that new items get properly added to data structure
        testing: function(){
            console.log(data);
        }
    }
})();
var uiController = (function(){
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incContainer: '.income__list',
        expContainer: '.expenses__list'
    };
    return {
        getInput: function(){
            return{
                type: document.querySelector(DOMstrings.inputType).value, // either inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            };
        },
        addListItem: function(obj, type){
            var html, newHTML, element;
            //CREATE HTML Placeholder
            if(type === 'inc'){
                element = DOMstrings.incContainer;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><buttonclass="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }else if(type === 'exp'){
                element = DOMstrings.expContainer;
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }
            //Replace placeholder with real data
            newHTML = html.replace('%id%',obj.id);
            newHTML = newHTML.replace('%description%', obj.description);
            newHTML = newHTML.replace('%value%',obj.value);
            //Inster HTML into DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHTML);
        },
        getDOMstrings: function(){
            return DOMstrings;
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
        var inpute, newItem;
        // 1. Get input data
        input = uiController.getInput();
        // 2. add item to budget controller
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);
        // 3. add item to UI
        UICtrl.addListItem(newItem, input.type);
        // 4. Calculate new budget

        // 5. display new budget to UI

    }
    return {
        init: function(){
            setupEventListeners();
        }
    };
})(budgetController, uiController);

appController.init();







