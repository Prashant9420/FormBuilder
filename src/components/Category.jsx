import React, { useState } from "react";
import "./Category.css";

const Category = ({setFinalForm}) => {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);

  const handleAddItem = () => {
    const newItem = {
      id: `item${items.length + 1}`,
      title: `Item ${items.length + 1}`,
      category: categories[0],
      isEditing: true,
    };
    setItems((prevItems) => [...prevItems, newItem]);
  };

  const handleItemChange = (index, property, value) => {
    const updatedItems = [...items];
    updatedItems[index][property] = value;
    setItems(updatedItems);
  };

  const handleDeleteItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const handleEditToggle = (index) => {
    const updatedItems = [...items];
    updatedItems[index].isEditing = !updatedItems[index].isEditing;
    setItems(updatedItems);
    setFinalForm((prevState) => ({
      ...prevState,
      category:{categories:categories,items:items},
    }))

  };

  return (
    <div className="form-container my-4">
      <div className="form-section my-2">
        <h2><u>Question 1</u></h2>
        <h3>Categories The Followings</h3>
        <h5>Categories</h5>
        <input
          type="text"
          onChange={(e) => setCategories(e.target.value.split(","))}
          value={categories.join(",")}
        />
      </div>
      <div className="form-section my-3">
        <h3>Items</h3>
        <div className="items-container my-2">
          {items.map((item, index) => (
            <div key={item.id} className={`item mx-3 my-0${item.isEditing ? "editing" : ""}`}>
              {item.isEditing ? (
                <>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => handleItemChange(index, "title", e.target.value)}
                  />
                  <select
                    value={item.category}
                    onChange={(e) => handleItemChange(index, "category", e.target.value)}
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>

                  <button className="btn btn-success my-3" onClick={() => handleEditToggle(index)}>
                    Save
                  </button>
                </>
              ) : (
                <>
                  <p>{item.title}</p>
                  <p>Category: {item.category}</p>
                  <button
                    className="btn btn-primary mx-3 my-3"
                    onClick={() => handleEditToggle(index)}
                  >
                    Edit
                  </button>
                </>
              )}
              <button className="btn btn-danger" onClick={() => handleDeleteItem(index)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
      <button className="btn btn-info my-2" onClick={handleAddItem}>
        Add Item
      </button>
    </div>
  );
};

export default Category;