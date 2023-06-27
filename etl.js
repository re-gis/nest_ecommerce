/* eslint-disable @typescript-eslint/no-var-requires */ /* eslint-disable prettier/prettier */
const axios = require('axios');
(async () => {
  const { data } = await axios.post('http://localhost:3000/auth/register', {
    username: 'test',
    password: 'test',
  });
  console.log(data);
})();
