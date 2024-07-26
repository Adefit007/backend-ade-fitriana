## Cara Menjalankan Program

- silahkan clone di repository github

```bash
git clone https://github.com/Adefit007/backend-ade-fitriana.git
```

- setelah itu masuk ke folder dan buka di code editor

- instal npm module

```bash
npm i
```

- Jalankan aplikasi xampp dan kemudian aktifkan Apache dan Mysql

- buat database baru di dalam phpMyadmin dengan nama "marketplace"

- setelah itu migrasikan model database

```bash
npx sequelize-cli db:migrate
```

- jalankan kode program

```bash
npm start
```

- Jalankan aplikasi postman untuk test API.
