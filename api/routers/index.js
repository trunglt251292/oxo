//quan ly routers
import {Router} from 'express';
import RouterExam from './exam.router';
import RouterOxo from './oxo.router';

const router = new Router();

router.use('/exam',RouterExam);
router.use('/oxo',RouterOxo);

export default router;
