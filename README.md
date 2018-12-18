# wepy-plugin-compiler-plus

### `小程序wepy扩展插件，增强编译插件，很牛叉`


## 使用方式

>* 安装包
```
npm install --save wepy-plugin-compiler-plus
```

>* 修改wepy.config.js
```
{
    plugins: {
        'compiler-plus': {
            ext: '-compress.png',
            path: './images'
        }
    }
}
```


## PS

建议上线的时候编译