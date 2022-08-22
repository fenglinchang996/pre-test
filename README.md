# pre-test

## 開始

- 安裝：

  ```
  npm install
  ```
  
- 啟動：

  ```
  npm run dev
  ```
  
  開啟 http://localhost:8080/ 可以在本機啟動。
  
## 說明

### CustomInputNumber

- 加減數量按壓 1 秒後，會自動加減數量（以 100 ms 的速度）
- 使用者可以輸入超過 `max` 或 小於 `min` 的值，在按壓加減數量按鈕後會跳回 `max` 或 `min`，上層使用 `CustomInputNumber` 的父元件也可以透過 `onChange` 或 `onBlur` 進行防呆處理

### RoomAllocation

- 使用者輸入不合理的數量，超過 `max` 或小於 `min` 的值，會在 onBlur 時修正位對應的 `max` 或 `min` 值

## 其他

專案設定只有使用必要的的工具或套件（webpack、babel、react、css-loader、style-loader、webpack-dev-server）以加快開發，css 用預設支援的 css module。一般如果是個人 side project 或是公司專案，我會再使用 TypeScript、ESLint、styled-component、Stylelint 等等。
