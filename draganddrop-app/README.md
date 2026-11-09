# Drag and Drop Todo App

## 1. Overview

Reactを用いて開発したTrello風のTodo管理アプリケーション。

Todoを複数のステータスに分類し、ドラッグ＆ドロップによってタスクを移動・管理する。

## 2. Purpose

- Reactの基本的な仕組みを理解する。
- コンポーネントの分割・再利用を学習する。
- State管理による画面更新を理解する。
- イベント処理を実践する。
- ドラッグ＆ドロップによるUI操作を実装する。

## 3. Technology Stack

| Technology | Purpose |
|---|---|
| React | UI Development |
| JavaScript | Programming Language |
| react-beautiful-dnd | Drag and Drop |
| uuid | Unique ID Generation |

## 4. Features

- Todoの表示・管理
- ステータスごとのタスク管理
- ドラッグ＆ドロップによるタスク移動
- コンポーネント単位でのUI管理


## 5. Quickstart

### Prerequisites

- Node.js
- npm

### Installation

```bash
# Move to project directory
cd draganddrop-app

# Install dependencies
npm install
```

### Run Application

```bash
# Check available scripts
npm start

# Start development server
npm start dev
```

※ package.jsonに `dev` が定義されていない場合は、登録されている起動スクリプトを使用する。

## 6. Project Structure

```text
draganddrop-app/
├── public/
├── src/
├── package.json
├── package-lock.json
└── README.md
```


## 7. Learning Points

- Reactのコンポーネント設計
- useStateによる状態管理
- Propsによるコンポーネント間のデータ受け渡し
- イベント処理
- ドラッグ＆ドロップの実装