# 概要
フリーランスイラストレーターである[コレフジ様](https://chorefuji.tumblr.com/) のポートフォリオサイトの開発プロジェクトです
。
最終的には、イラストレーターのプロフィールや制作物と依頼に関するメールフォームを一体化させ、公開したイラストからクライアントの依頼獲得に繋げることをコンセプトとしています。

そのため、実際にイラストレーターとして活動されているコレフジ様に協力して頂き、依頼の獲得に繋げられるかを検証するつもりです。

ポートフォリオサイトの効果について確認した後、本格的なサービス開発の計画を予定しています。

#  使用している技術
### プログラミング言語
TypeScript

### ライブラリ
React

### フレームワーク
Next.js

TailwindCSS

### データベース
Supabase (PostgreSQL)

### ホスティング
vercel

# 設計の方針
プロジェクトのUI設計には、可読性の高い関数コンポーネントを採用しています。

Atomic DesignをベースにUIの基本単位を決めて設計し、コンポーネントを組み合わせてページの要素を構成しています。

コンポーネントは繰り返し利用できるように設計し、propsの入力に応じて表示内容を変更しています。

また、後からのデザインや仕様の変更にも大元のコンポーネントを変更することで柔軟に対応できます。

<!-- This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details. -->
