# Type Script Website Project Template

This project is meant to display a working starting point for a TS website project building with gulp and webpack.

## Build
    npm install
    gulp dev

All resources will be available under `./bin` folder.

## Important gulp tasks
* `gulp default` -&gt; Build the whole project (CSS, templates, TypeScript, etc.) and generate its output in the `./bin` folder.
* `gulp dev` -&gt; Starts a webpack dev server for the project.
* `gulp compile` -&gt; Build only the TypeScript code and generate its output in the `./bin` folder.
* `gulp css` -&gt; Build only the Sass code and generate its output in the `./bin` folder.

## Dev Server
Make sure you were able to run gulp entirely without any errors first. Then you can start the dev-server:
```
gulp dev
```
This will start a webpack-dev-server instance (see Webpack Dev Server).

You can now load http://localhost:8080/[PAGE_NAME] in a web browser.

> Note:
> If you are creating a new page, do not forget to add to the server router

```js
router.get('/[PAGE_NAME]', function(req, res) {
    res.render('pages/[PAGE_NAME]', {
        prototypeTitle : '[PAGE_TITLE]',
        config: cfg
    });
});
```

## License

Apache-2.0 © [Jean-François Cloutier]()
