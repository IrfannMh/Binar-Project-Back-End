# LepasAja backend

## Getting Started

- Clone repo
- install dependencies

  ```sh
  yarn

  # OR

  npm run install
  ```

- duplikat file `.env-example`, kemudian rename dengan `.env` dan isi environment dengan benar
- Migrating database

  ```sh
  # 1. Create database

  yarn initdb
  #OR
  npm run initdb

  # 2. Create table

  yarn dbMigrate
  #OR
  npm run dbMigrate

  # 3. Add dummy data

  yarn dbSeed
  #OR
  npm run dbSeed
  ```

## Note

Sebelum melakukan commit format code sesuai dengan standart dengan menjalankan perintah:

```sh
yarn lintfix
```

dan perhatikan **commit convention** ya.
