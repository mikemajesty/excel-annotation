import * as express from 'express'
import * as path from 'path';
import * as service from './lib/excel-annotation';
var excel = require("exceljs");

class App {
  public express

  constructor () {
    this.express = express()
    this.mountRoutes()
  }

  private mountRoutes (): void {
    const router = express.Router()
    router.get('/', (req, res) => {
      res.sendfile(path.resolve("./src/demo/index.html"));
    })
    router.get('/example', (req, res) =>  {
     
      service.Excel.create(res).then(function() {
        res.end();
      });
    });
    this.express.use('/', router)
  }
}

export default new App().express