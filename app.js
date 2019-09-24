/*
-----------------TO-DOs:
Add event handler to delete button
    Delete item from data structure
    Delete item from UI 
Recalc budget
Update UI after recalc
*/

//3 modules - Budget for performing maths / UI for DOM manipulation / App for controlling functionality
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
    var calculateTotal = function (type){
        var sum = 0;
        data.allItems[type].forEach(function(cur){
           sum += cur.value;
        });
        data.totals[type] = sum;
    };
    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
    };
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
        calcBudget: function(){
            //calcuate total inc and total exp
            calculateTotal('exp');
            calculateTotal('inc');
            //calcuate the budget
            data.budget = data.totals.inc - data.totals.exp;
            //calculate percentage of income already spend
            if(data.totals.inc > 0){
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            }else{
                data.percentage = -1;
            }
        },
        getBudget: function(){
            return{
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            }
        },
        //Testing that new items get properly added to data structure
        testing: function(){
            console.log(data);
        }
    };
})();
var uiController = (function(){
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incContainer: '.income__list',
        expContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incLabel: '.budget__income--value',
        expLabel: '.budget__expenses--value',
        percentLabel: '.budget__expenses--percentage'
    };
    return {
        getInput: function(){
            return{
                type: document.querySelector(DOMstrings.inputType).value, // either inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
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
        clearFields: function(){
            var fields, fieldsArray;
            fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);
            fieldsArray = Array.prototype.slice.call(fields);
            fieldsArray.forEach(function(curVal, iNum, array){
                curVal.value = "";
            });
            fieldsArray[0].focus();
        },
        displayBudget: function(obj){
            document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
            document.querySelector(DOMstrings.incLabel).textContent = obj.totalInc;
            document.querySelector(DOMstrings.expLabel).textContent = obj.totalExp;
            if(obj.percentage > 0){
                document.querySelector(DOMstrings.percentLabel).textContent = obj.percentage + '%';
            }else{
                document.querySelector(DOMstrings.percentLabel).textContent = '--';
            }
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
    
    var updateBudget = function(){
        // 1. Calculate new budget
        budgetCtrl.calcBudget();
        // 2. Return budget
        var budget = budgetCtrl.getBudget();
        // 3. display new budget to UI
        uiController.displayBudget(budget);
    }
    var ctrlAddItem = function(){
        var input, newItem;
        // 1. Get input data
        input = uiController.getInput();
        if(input.description !== "" && !isNaN(input.value) && input.value > 0){
            // 2. add item to budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);
            // 3. add item to UI
            UICtrl.addListItem(newItem, input.type);
            // 4. Clear fields
            UICtrl.clearFields();
            // 5. Calc and update Budget
            updateBudget();
        }
    };
    return {
        init: function(){
            uiController.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            });
            setupEventListeners();
        }
    };
})(budgetController, uiController);

appController.init();







