## readME file for the API file :

In the `index file` import your route in this way:

```
import { Router } from "express";
import example from "./routes/example";
module.export =  () => {
const app = Router();
example(app);
return app;
};
```

Read more about routes and middlewares in their respective files.

Note: **_DO NOT IMPORT MIDDLEWARES TO THE INDEX FILE_**
