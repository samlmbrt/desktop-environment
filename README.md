# Desktop environment UI prototype

This is a very simple and incomplete prototype of a desktop environment user interface written in React.

Right now, it is possible to move, resize and focus windows. In the future, it might be possible to minimize, maximize and close windows.

The implementation is not ideal since it calls `window.getBoundingClientRect` quite a lot, which might force an awful lot of reflows.

You can access the demo [here](https://desktop-environment-deploy.vercel.app/).
