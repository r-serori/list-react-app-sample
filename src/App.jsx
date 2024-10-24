import React, { useState } from "react";
import "./styles.css";

const ListItem = ({ id, inStock }) => {
  return (
    <div className={`item ${inStock ? "in-stock" : ""}`}>
      <span>{inStock ? `商品 ${id} - 在庫あり` : `商品 ${id} - 在庫なし`}</span>
    </div>
  );
};

const App = () => {
  const totalItems = 10000;
  const [updatedItems, setUpdatedItems] = useState(
    Array(totalItems).fill(false)
  );
  const [updateCount, setUpdateCount] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 一気に100個更新する関数
  const handleUpdateAll = () => {
    setUpdatedItems((prevItems) => {
      return prevItems.map((item, index) => {
        if (index >= currentIndex && index < currentIndex + 100) {
          return true;
        }
        return item;
      });
    });
    setUpdateCount(
      currentIndex + 100 > totalItems ? totalItems : currentIndex + 100
    );
    setCurrentIndex(currentIndex + 100);
  };

  // 在庫をすべて「なし」に戻す関数
  const handleResetAll = () => {
    setUpdatedItems(Array(totalItems).fill(false)); // 全てを在庫なしにリセット
    setUpdateCount(0); // 更新数もリセット
    setCurrentIndex(0); // インデックスもリセット
  };

  return (
    <div className="container">
      <h1>在庫管理システム（仮想DOM）</h1>
      <button onClick={handleUpdateAll}>一気に100個を在庫ありに変更</button>
      <button onClick={handleResetAll}>全ての在庫を「なし」にリセット</button>
      <span> 更新した数: {updateCount}</span>
      <div id="item-list">
        {Array.from({ length: totalItems }, (_, index) => (
          <ListItem
            key={index + 1}
            id={index + 1}
            inStock={updatedItems[index]}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
