# 大亨哥的jue手架

## [package中的依赖](./PACKAGE.md)

`bin`文件中第一行
```
#!/usr/bin/env node
```
告诉系统在这个目录下找`node`环境，并执行该文件

`package.json` 中添加`bin`对象，使用`npm link`将对应的命令绑定到全局，绑定新命令时，需要先执行`npm unlink`解绑命令
