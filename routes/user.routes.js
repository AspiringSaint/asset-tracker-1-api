const router = require('express').Router();
const { authenticate, authorize } = require('../middlewares/auth');
const { 
    getAllUsers, 
    createUser, 
    getUserById, 
    updateUserById, 
    deleteUserById 
} = require('../controllers/user.controller');

router.get('/', getAllUsers);
router.post('/', createUser);
router.get('/:id', getUserById);
router.put('/:id', updateUserById);
router.delete('/:id', deleteUserById);

module.exports = router;