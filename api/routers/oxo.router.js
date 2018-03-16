import {Router} from 'express';
const router = new Router();
import * as OxoServices from '../controlls/Oxo.controller';
router.route('/')
      .get(OxoServices.gethome);

export default router;
