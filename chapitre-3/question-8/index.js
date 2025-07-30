import jwt from 'jsonwebtoken'
const generateToken = (id) => {
  return jwt.sign({id}, 'mysecret');
}

console.log(generateToken(12))