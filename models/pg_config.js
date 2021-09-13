const Pool = require('pg').Pool;

const pg_conn = new Pool (
    {
        user: 'wmcdvgqlewyxqa',
        host: 'ec2-54-83-82-187.compute-1.amazonaws.com',
        database: 'd2d137tn7s5vee',
        password: 'b01b3974eaf23b4fce134e65a4ab2a49a25b73a83c31fe9153ab350fe5f28b7b',
        port: 5432,
        ssl: {
            rejectUnauthorized: false
          },
    });

module.exports = pg_conn;