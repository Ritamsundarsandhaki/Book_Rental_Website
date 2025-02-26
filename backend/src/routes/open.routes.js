import express from 'express'
import { Home, Search} from '../controllers/open.controller.js';
const Router = express.Router();

Router.get('/home',Home);
Router.get("/search",Search)

export default Router;