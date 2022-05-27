import express from 'express';
import controller from '../controllers/controller';
import extractJWT from '../middleware/extractJWT';

const router = express.Router();

router.get('/validate', extractJWT, controller.validateToken);
router.post('/upgrade', extractJWT, controller.upgrade);
router.post('/register', controller.register);
router.post('/login', controller.login);
router.get('/get/all', controller.getAllUsers);
router.post('/profile/create', extractJWT, controller.createProfile)
router.get('/profile/get', extractJWT, controller.getProfiles)
router.put('/profile/update', extractJWT, controller.updateProfile)
router.delete('/profile/delete', extractJWT, controller.deleteProfile)
router.post('/document/create', extractJWT, controller.createDocument)
router.get('/document/get', extractJWT, controller.getDocuments)
router.put('/document/update', extractJWT, controller.updateDocument)
router.delete('/document/delete', extractJWT, controller.deleteDocument)

export = router;
