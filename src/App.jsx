import "./styles.css";
import React, { useState } from "react";

// リストアイテムのコンポーネント
const ListItem = ({ id, isUpdated, onUpdate }) => {
  return (
    <div className={`item ${isUpdated ? "updated" : ""}`}>
      <span>{isUpdated ? `Updated Item ${id} - Updated!` : `Item ${id}`}</span>
      <button onClick={() => onUpdate(id)}>更新</button>
    </div>
  );
};

// メインコンポーネント
const App = () => {
  const totalItems = 1000;

  // 各アイテムが更新されたかどうかの状態を管理
  const [updatedItems, setUpdatedItems] = useState(
    Array(totalItems).fill(false)
  );
  const [updateCount, setUpdateCount] = useState(1); // 更新回数を追跡

  // リストアイテムの更新を行う関数
  const handleUpdate = (id) => {
    setUpdatedItems((prevItems) =>
      prevItems.map((item, index) => (index === id - 1 ? !item : item))
    );
    setUpdateCount(updateCount + 1); // 更新回数を増やす
  };

  return (
    <div className="container">
      <h1>リストのパフォーマンステスト</h1>
      <div id="item-list">
        {Array.from({ length: totalItems }, (_, index) => (
          <ListItem
            key={index + 1}
            id={index + 1}
            isUpdated={updatedItems[index]}
            onUpdate={handleUpdate}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
