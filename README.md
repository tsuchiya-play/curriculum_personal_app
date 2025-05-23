# フェスタイムテーブル

## サービス概要
フェスタイムテーブルは音楽フェスのタイムテーブルを管理するサービスです。

## 想定されるユーザー層
音楽フェスに行く人を想定しています。

## サービスコンセプト
音楽フェスでは、タイムテーブルによる時間管理は人それぞれであり、画像をスクリーンショットで保存してスマホの背景に設定したり、大規模なフェスの場合は運営公式アプリが提供しているものを使う人が多いです。小さいフェスだと前者の方で、現在の時刻と照らし合わせて管理しなくてはならない。大規模フェスの場合でも、フェスごとにその都度公式のアプリをインストールしなくてはならない。また、SNSでユーザごとのタイムテーブルを画像で共有する文化があり、公式アプリ、公式SNSの画像、各プラットフォームのSNSと様々なサービスを行き来しないといけない。タイムテーブル作成・共有、Googleカレンダーのようなリアルタイムのスケジュール管理が一つのサービスでできれば、この煩わしさを解消できると考えました。
フェスタイムテーブルでは、フェス初心者でも使いやすいようなサービスにしていきたいと考えています。

## 実装を予定している機能
### MVP
- タイムテーブルの作成
- 日付と時間を参照して、時間軸の表示
- 作成したタイムテーブルの共有
- ログイン機能/新規登録

### その後の機能
- アーティスト情報をSpotify Apple MusicなどのAPIを使って参照
- PWAによるスマホのホーム画面へ表示
- フェスの位置情報を添付
- オフラインでも使えるQRコードやBluetoothによるタイムテーブル共有
- 簡易ログ機能（感想・写真をその場で記録）
- 同じアーティストの予定を持つユーザーを発見・フォローできる「仲間探し」機能
　
### 画面遷移図(figma)
https://www.figma.com/board/RFdcvNNOXrYzZG57ox4JVS/%E7%94%BB%E9%9D%A2%E9%81%B7%E7%A7%BB_%E3%83%95%E3%82%A7%E3%82%B9%E3%82%BF%E3%82%A4%E3%83%A0%E3%83%86%E3%83%BC%E3%83%96%E3%83%AB?t=H9lLaSRhIspmmuIH-1

### ER図(dbdiagram.io)
https://dbdiagram.io/d/68244f815b2fc4582f876380

## MVP用 技術スタック

---

### ■ 開発環境
- Docker（ローカル/本番の統一）
- GitHub（ソース管理）
- GitHub Actions（CI/CD）

---

### ■ バックエンド（API & サーバー）
- Ruby on Rails 7.1.5
  - Ruby 3.2.2
  - Rails API
  - 認証: has_secure_password + bcrypt
- データベース: MySQL
- ORM: ActiveRecord

---

### ■ フロントエンド（React構成オプションを使用する場合）
- React.js（使用経験あり）
- TypeScript（型安全性を活かして開発）
- Tailwind CSS
- MVPでのReact構成を導入する場合、RailsはAPIモードで提供

---

### ■ スタイリング / デザイン
- Tailwind CSS
