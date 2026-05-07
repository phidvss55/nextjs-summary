This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

### Prisma

```bash
pnpm dlx create-db # generate database

# generated prisma
pnpm dlx auth@latest generate

# create new migrations based on the changes in `schema.prisma` and apply to db
npx prisma migrate dev

# migrate
npx auth@latest migrate # ??
npx auth generate # run before generate
```
