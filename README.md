# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## シーケンス図
### 最初の実行
```mermaid
sequenceDiagram
    User->>+Scanner: "スタート" ボタンクリック
    Scanner->>Scanner: "src/scripts/result.json" と "src/scripts/ips.txt" を初期化
    Scanner->>Scanner: `arp -a` コマンドの実行結果を重複なく "arc/scripts/ips.txt" に書き込む
    Scanner-->>-User: ips.txt の行数が画面に出力される
    Scanner->>Scanner: `nmap -sV -T4 -iL src/scripts/ips.txt` を実行。
    Scanner->>Scanner: 実行結果から Device name, ip, OS version, MAC address の4つの情報を抽出し、"src/scripts/result.json" に書き込む。
    Scanner-->>User: 実行完了したら、デバイス名の一覧を画面に表示
```

### デバイス詳細の表示
```mermaid
sequenceDiagram
    User->>+Scanner: デバイス名が記載されているコンポーネントをクリック
    Scanner->>Scanner: "src/scripts/result.json" と "src/scripts/ips.txt" を初期化
    Scanner->>Scanner: `arp -a` コマンドの実行結果を重複なく "arc/scripts/ips.txt" に書き込む
    Scanner-->>-User: ips.txt の行数が画面に出力される
    Scanner->>Scanner: `nmap -sV -T4 -iL src/scripts/ips.txt` を実行。
    Scanner->>Scanner: 実行結果から Device name, ip, OS version, MAC address の4つの情報を抽出し、"src/scripts/result.json" に書き込む。
    Scanner-->>User: 実行完了したら、デバイス名の一覧を画面に表示
```