import db from '../config/db.js'

const UserModel = {
  register: async (firstName,lastName, email, password,role) => {
    try {
      const query = 'INSERT INTO users (firstName, lastName, email, password, role) VALUES (?, ?, ?, ?, ?)';
      const [result] = await db.promise().query(query, [firstName,lastName, email, password,role]);
      return result;
    } catch (error) {
      throw error; 
    }
  },

findByEmail: async (email) => {
  try {
    const query = 'SELECT * FROM users WHERE email = ?';
    const [result] = await db.promise().query(query, [email]);
    return result;
  } catch (error) {
    throw error
  }
},


  findById: async(id) => {
    try {
      const query = 'SELECT * FROM users WHERE id = ?';
      const [result] = await db.promise().query(query, [id]);
      return result;
    } catch (error) {
      throw error
    }
  },
};


export default UserModel