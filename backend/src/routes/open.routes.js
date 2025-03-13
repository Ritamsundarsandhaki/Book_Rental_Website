import express from 'express'
import { Home, Search,detail} from '../controllers/open.controller.js';
const Router = express.Router();

Router.get('/home',Home);
Router.get("/search",Search)
Router.get('/detail/:productId',detail)

export default Router;