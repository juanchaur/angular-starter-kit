# Angular StarterKit

The Angular StarterKit sets up a basic navigation-style architecture for you along with some basic screens. You can create your own screens by only creating modules and views and creating the state for it.

This StarterKit comes with

 * [AngularJS](https://angularjs.org/)
 * [Bootstrap](http://getbootstrap.com/css/#overview) (SCSS)
 * [ui-router](https://github.com/angular-ui/ui-router)


A test-suite is now set-up


If you're using Linux and the watch task is not working do:

**CentOS:** ```su -c "echo fs.inotify.max_user_watches=524288 |  tee -a /etc/sysctl.conf && sysctl -p"```

**Ubuntu:** ```echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p```
