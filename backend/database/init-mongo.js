db.createUser({
  user: process.env.DATABASE_HOST,
  pwd: process.env.DATABASE_PWD,
  roles: [
    {
      role: 'dbOwner',
      db: process.env.DB_NAME,
    },
  ],
});
