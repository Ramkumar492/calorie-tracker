// const Storagectr;

const StorageCtrl = (function() {


  return {

    getFromStorage: function() {
      let items;
      if (localStorage.getItem('items') === null) {
        items = [];
      } else {
        items = JSON.parse(localStorage.getItem('items'));
      }

      return items;
    },

    addtoStorage: function(item) {
      let items = [];
      if (localStorage.getItem('items') === null) {
        items.push(item);
      } else {
        items = JSON.parse(localStorage.getItem('items'));
        items.push(item);
      }

      localStorage.setItem('items', JSON.stringify(items));
    },

    updateToStorage: function(updatedItem) {
      let items = JSON.parse(localStorage.getItem('items'));

      items.forEach((item, index) => {

        if (item.id === updatedItem.id) {
          items.splice(index, 1, updatedItem);
        }


      });

      localStorage.setItem('items', JSON.stringify(items));
    },

    deleteFromStorage: function(deleteItem) {
      let items = JSON.parse(localStorage.getItem('items'));

      items.forEach((item, index) => {

        if (item.id === deleteItem.id) {
          items.splice(index, 1);
        }


      });

      localStorage.setItem('items', JSON.stringify(items));
    },
    clearAllFromStorage: function() {
      let items = [];
      localStorage.setItem('items', JSON.stringify(items));
    }
  }
})();

//Item Controller

const ItemCtrl = (function() {
  const Item = function(id, item, calories) {
    this.id = id;
    this.name = item;
    this.calories = calories;
  }

  const data = {

    // items: [
    //   // {id: 0, name: "Steak", calories: 2000},
    //   // {id: 1, name: "Cofee", calories: 200},
    //   // {id: 2, name: "Sole0", calories: 10}
    // ],

    items: StorageCtrl.getFromStorage(),

    currentItem: null,

    totalCalories: 0
  }


  return {
    logData: function() {
      return data;
    },

    addItemList: function(name, calorie) {


      let ID;

      if (data.items.length === 0) {
        ID = 0;
      } else {
        ID = data.items[data.items.length - 1].id + 1;
      }

      const item = new Item(ID, name, calorie);

      data.items.push(item);

      return item;

    },

    updateItem: function(name, calories) {

      data.items.forEach((item) => {
        if (item.id === data.currentItem.id) {
          item.name = name;
          item.calories = calories;
        }
      });


    },
    getItem: function() {
        return data.items;
      }

      ,
    getTotalCalories: function() {
      let totalCalories = 0;
      data.items.forEach((item) => {

        totalCalories += item.calories;
      });

      data.totalCalories = totalCalories;

      return data.totalCalories;

    },

    getItembyID: function(id) {
      let found = 0;
      data.items.forEach((item) => {

        if (item.id === id) {
          found = item;

        }
      });

      return found;
    },

    deleteItem: function() {
      let found = null;
      data.items.forEach((item, index) => {
        if (item.id === data.currentItem.id) {
          found = index;
        }
      });

      data.items.splice(found, 1);



    },
    clearAllItems: function() {
      data.items = [];
    },
    getCurrentItem: function() {
      return data.currentItem;
    },

    setCurrentItem: function(item) {
      data.currentItem = item;
    }
  }
})();


// UI Controller

const UICtrl = (function() {

  const uiElements = {
    itemList: '.item-list',
    itemName: '#item-name',
    itemCalories: '#item-calories',
    addItem: '.add-item',
    totalCaloriesField: '.total-cal',
    updateItemBtn: '.update-item',
    deleteItemBtn: '.delete-item',
    backBtn: '.back-btn',
    listItems: '.collection-item',
    clearAll: '.clearall-btn'
  };

  return {

    addBtn: function() {
      return uiElements.addItem;
    },

    getInputValues: function() {
      return {
        itemName: document.querySelector(uiElements.itemName).value,
        itemCalories: document.querySelector(uiElements.itemCalories).value
      }
    },

    addItemList: function(item) {
      let li = document.createElement('li');
      li.className = 'collection-item';
      li.id = `item-${item.id}`;
      li.innerHTML = `
        <strong>${item.name} :</strong><em> ${item.calories} Calories</em>
        <a class="secondary-content">
        <i class=" remove-item fas fa-edit"></i>
        </a>

        `;

      document.querySelector(uiElements.itemList).appendChild(li);

    },
    populateItems: function(items) {

      let html = "";
      items.forEach((item) => {

        html += `<li class="collection-item" id="item-${item.id}">
          <strong>${item.name} :</strong><em> ${item.calories} Calories</em>
          <a class="secondary-content">
          <i class=" remove-item fas fa-edit"></i>
          </a>
        </li>`
      });

      const listitem = document.querySelector(uiElements.itemList);
      listitem.innerHTML = html;

    },

    updateListItem: function(item) {
      let itemsli = document.querySelectorAll(uiElements.listItems);

      itemsli = Array.from(itemsli);

      itemsli.forEach((itemli) => {
        if (itemli.id === `item-${item.id}`) {
          itemli.innerHTML = `
             <strong>${item.name} :</strong><em> ${item.calories} Calories</em>
             <a class="secondary-content">
             <i class=" remove-item fas fa-edit"></i>
             </a>`
        }
      });
    },

    deleteItemList: function(item) {
      let element = document.querySelector(`#item-${item.id}`);
      element.remove();

    },

    hideEditState: function() {
      document.querySelector(uiElements.updateItemBtn).style.display = 'none';
      document.querySelector(uiElements.deleteItemBtn).style.display = 'none';
      document.querySelector(uiElements.backBtn).style.display = 'none';
      document.querySelector(uiElements.addItem).style.display = 'inline';


    },

    showEditState: function() {
      document.querySelector(uiElements.updateItemBtn).style.display = 'inline';
      document.querySelector(uiElements.deleteItemBtn).style.display = 'inline';
      document.querySelector(uiElements.backBtn).style.display = 'inline';
      document.querySelector(uiElements.addItem).style.display = 'none';
    },
    clearInputFields: function() {
      document.querySelector(uiElements.itemName).value = '';
      document.querySelector(uiElements.itemCalories).value = '';
    },

    hideList: function() {
      document.querySelector(uiElements.itemList).style.display = 'none';
    },
    unhideList: function() {
      document.querySelector(uiElements.itemList).style.display = 'block';
    },

    showTotatCalories: function(totalCalories) {
      document.querySelector(uiElements.totalCaloriesField).textContent = totalCalories;
    },

    getUISelector: function() {
      return uiElements;
    },

    setEditValues: function(item) {
      document.querySelector(uiElements.itemName).value = item.name;
      document.querySelector(uiElements.itemCalories).value = item.calories;
    },

    clearAllList: function() {
      document.querySelector(uiElements.itemList).innerHTML = "";

    }


  }

})();


// App Controller

const App = (function(Itemctrl, UICtrl, StorageCtrl) {

  const loadEventListners = function() {
    document.querySelector(UICtrl.addBtn()).addEventListener('click', addItem);

    document.querySelector(UICtrl.getUISelector().itemList).addEventListener('click', editItem);

    document.addEventListener('keypress', function(e) {

      if (e.keyCode === 13 || e.which === 13) {
        e.preventDefault();
        return false;
      }
    });


    document.querySelector(UICtrl.getUISelector().updateItemBtn).addEventListener('click', updateItem);
    document.querySelector(UICtrl.getUISelector().backBtn).addEventListener('click', backBtn);

    document.querySelector(UICtrl.getUISelector().deleteItemBtn).addEventListener('click', deleteItem);
    document.querySelector(UICtrl.getUISelector().clearAll).addEventListener('click', clearAll);
  };



  const addItem = function(e) {

    e.preventDefault();
    const inputs = UICtrl.getInputValues();
    inputs.itemCalories = parseInt(inputs.itemCalories);



    if (inputs.itemName !== "" && inputs.itemCalories !== "" && Number.isInteger(inputs.itemCalories)) {
      const newItem = ItemCtrl.addItemList(inputs.itemName, inputs.itemCalories);
      UICtrl.unhideList();
      UICtrl.addItemList(newItem);
      UICtrl.clearInputFields();
      caloriesReload();
      StorageCtrl.addtoStorage(newItem);

    }

  }


  const editItem = function(e) {
    e.preventDefault();


    if (e.target.classList.contains('remove-item')) {
      UICtrl.showEditState();
      const li = e.target.parentElement.parentElement.id;

      const id = parseInt(li.split('-')[1]);

      const item = ItemCtrl.getItembyID(id);
      ItemCtrl.setCurrentItem(item);

      UICtrl.setEditValues(item);
    }
  }

  const updateItem = function() {

    let changeData = UICtrl.getInputValues();

    ItemCtrl.updateItem(changeData.itemName, parseInt(changeData.itemCalories));
    UICtrl.updateListItem(ItemCtrl.getCurrentItem());
    StorageCtrl.updateToStorage(ItemCtrl.getCurrentItem());
    caloriesReload();
    UICtrl.hideEditState();
    UICtrl.clearInputFields();


  }

  const deleteItem = function() {
    const item = ItemCtrl.getCurrentItem();

    ItemCtrl.deleteItem();
    UICtrl.deleteItemList(item);
    StorageCtrl.deleteFromStorage(item);
    UICtrl.clearInputFields();
    caloriesReload();
    UICtrl.hideEditState();

    if (ItemCtrl.getItem().length === 0) {
      UICtrl.hideList();
    }
  }

  const clearAll = function() {
    ItemCtrl.clearAllItems();
    UICtrl.clearAllList();
    StorageCtrl.clearAllFromStorage();
    caloriesReload();
    UICtrl.hideList();
  }

  const caloriesReload = function() {
    const totalcalories = ItemCtrl.getTotalCalories();
    UICtrl.showTotatCalories(totalcalories);
  }

  const backBtn = function() {
    UICtrl.hideEditState();
    UICtrl.clearInputFields();
  }

  return {

    init: function() {

      UICtrl.hideEditState();
      loadEventListners();
      const data = ItemCtrl.getItem();

      if (data.length === 0) {
        UICtrl.hideList();
      } else {
        UICtrl.unhideList();
        UICtrl.populateItems(data);
      }

      caloriesReload();





    }


  }
})(ItemCtrl, UICtrl, StorageCtrl);


App.init();
