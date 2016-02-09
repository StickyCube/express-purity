# express-purity

Express purity is middleware for your express application to enforce constraints on the data which flows through it.

Express purity is installable from [npm]():

```
npm install express-purity --save
```

## Usage Guide
Create Schemas to validate your data.

```javascript
import { Schema } from 'express-purity';

const schema = Schema({
  name: { $type: String, $required: true },
  age: { $type: Number },
  email: { $type: String, $required: true, $transform: v => v.toLowerCase() }
});
```

Once you have a schmea, you can use it in your express app:

```javascript
app.post('/users/createuser', schema, createUserRoute);
```

By default the schema will validate against `request.body`.
```javascript
// your app receives data
// -> request.body = { name: 'jerry', email: 'Jerry.Cress@Email.com' }

// in createUserRoute
function createUserRoute (req, res) {
  assert.equal(req.body.name, 'jerry');
  assert.equal(req.body.email, 'jerry.cress@email.com');
  assert(!('age' in req.body));
}
```

Errors will be handed to `next()`. Pick them up in your error handler.

```javascript
import { ValidationError } from 'express-purity';

app.use((err, req, res, next) => {
  if (err instanceof VaidationError) {
    return res.status(460).end(err.message);
  } else {
    res.sendStatus(404);
  }
});
```

## API Reference

For the full api on creating Schemas please read the docs for [purity](https://www.npmjs.com/package/purity).


### Schema(definition [, options])

express-purity adds 2 additional options for schemas:

###### `options.target {String}`
The target property on `request` to validate. Defaults to `'body'`.

###### `options.modify {Boolean}`
Whether or not to modify the request object's `target` property. Defaults to true. (Note it is necessary to set this to false when `options.target` is a read-only property).

# Bugs and Features
Please log issues and feature requests on the github [issue tracker]().
