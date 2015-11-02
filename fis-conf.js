// 设置图片合并的最小间隔
fis.config.set('settings.spriter.csssprites.margin', 20);

// 开启simple插件
fis.config.set('modules.postpackager', 'simple');


// 可以开启simple对零散资源的自动合并
fis.config.set('settings.postpackager.simple.autoCombine', true);


// //资源定位
fis.config.merge({
    roadmap: {
        domain: {
            //所有css文件添加http://localhost:8080作为域名
            '**.css': 'http://localhost:8080'
        },
        path: [{
            //所有的js文件
            reg: '**.js',
            //发布到/static/js/xxx目录下
            release: '/static/js$&'
        }, {
            //所有的css文件
            reg: '**.css',
            //发布到/static/css/xxx目录下
            release: '/static/css$&'
        }, {
            //所有image目录下的.png，.gif，.jpg文件
            reg: /^\/image\/(.*\.(?:png|jpg|gif))/i,
            //发布到/static/pic/xxx目录下
            release: '/static/pic/$1'
        }]
    }
});
