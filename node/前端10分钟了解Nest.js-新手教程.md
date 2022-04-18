## 框架简介

> `Nest` 是一个用于构建高效，可扩展的 `Node.js` 服务器端应用程序的框架。它使用渐进式 `JavaScript`，内置并完全支持 `TypeScript`（但仍然允许开发人员使用纯 `JavaScript` 编写代码）并结合了 `OOP`（面向对象编程），`FP`（函数式编程）和 `FRP`（函数式响应编程）的元素。
>
> 在底层，`Nest` 使用强大的 `HTTP Server` 框架，如 `Express`（默认）和 `Fastify`。`Nest` 在这些框架之上提供了一定程度的抽象，同时也将其 `API` 直接暴露给开发人员。这样可以轻松使用每个平台的无数第三方模块。

我猜肯定很多同学看不懂这段话，没关系，我也暂时看不懂，但这不影响我们学会用它 `CRUD`。

我们只需要知道它是一款 `Node.js` 的后端框架，**规范化**和**开箱即用**的特性使其在国外开发者社区非常流行，社区也非常活跃，[GitHub Repo](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fnestjs%2Fnest) 拥有 `31.1k Star`。

相比于 `Express` 和 `Koa` 的千奇百怪五花八门，`Nest` 确实是一股清流。

## 前置知识

- HTTP
- TypeScript/JavaScript

## 项目环境

- git
- mongodb
- node.js >= 10.13.0

## 安装 MongoDB

这个章节的教程我就只写 `Mac OS` 上的安装了，毕竟上了大学就很少用 `Windows` 了，用 `Windows` 的同学可以到 [`MongoDB` 官网](https://link.juejin.cn?target=https%3A%2F%2Fmongodb.com%2Fdownload-center%2Fcommunity)选择对应的系统版本去下载 `msi` 的安装包，或者**搜索引擎**里搜索一下，记得限定一下结果的时间，保证能够搜索到最新的教程。

强烈建议使用 `Homebrew` 来对 `Mac OS` 的软件包环境进行管理，没有安装的同学可以[点击这里](https://link.juejin.cn?target=https%3A%2F%2Fbrew.sh%2F)下载。

由于目前 `MongoDB` 已经不开源了，因此我们想要安装 `MongoDB` 就只能安装社区版本。

```bash
brew tap mongodb/brew
brew install mongodb-community
复制代码
```

安装好之后我们就可以启动 `MongoDB` 的服务了：

```bash
brew services start mongodb-community
复制代码
```

服务启动了就不用管了，如果要关闭的话可以把 `start` 改成 `stop`，就能够停止 `MongoDB` 的服务了。

## 构建项目

有两种方式，可以自行选择，两者没有区别：

### 使用 `Nest CLI` 安装：

```bash
npm i -g @nestjs/cli
nest new nest-crud-demo
复制代码
```

### 使用 `Git` 安装：

```bash
git clone https://github.com/nestjs/typescript-starter.git nest-crud-demo
复制代码
```

这两条命令的效果完全一致，就是初始化一个 `Nest.js` 的项目到当前文件夹下，项目的文件夹名字为 `nest-crud-demo`，两种方式都可以。

**当然，我还是建议采用第一种方式，因为后面我们可以直接使用脚手架工具生成项目文件。**

## 启动服务

```bash
cd nest-crud-demo
npm run start:dev 或者 yarn run start:dev
复制代码
```

就可以**以开发模式**启动我们的项目了。

这里其实有一个小小的点，就是启动的时候应该以 `dev` 模式启动，这样 `Nest` 会**自动检测我们的文件变化**，然后**自动重启服务**。

如果是直接 `npm start` 或者 `yarn start` 的话，虽然服务启动了，但是我们如果在开发的过程中修改了文件，就要手动停止服务然后重新启动，效率挺低的。

## 安装依赖

项目中我们会用到 `Mongoose` 来操作我们的数据库，`Nest` 官方为我们提供了一个 `Mongoose` 的封装，我们需要安装 `mongoose` 和 `@nestjs/mongoose`：

```bash
npm install mongoose @nestjs/mongoose --save
复制代码
```

安装好之后我们就可以开始编码过程了。

## 编写代码

### 创建 `Module`

我们这次就创建一个 `User` 模块，写一个用户增删改查，带大家熟悉一下这个过程。

```bash
nest g module user server
复制代码
```

脚手架工具会自动在 `src/server/user` 文件夹下创建一个 `user.module.ts`，这是 `Nest` 的模块文件，`Nest` 用它来组织整个应用程序的结构。

```ts
// user.module.ts
import { Module } from '@nestjs/common';

@Module({})
export class UserModule {}
复制代码
```

同时还会在根模块 `app.module.ts` 中引入 `UserModule` 这个模块，相当于一个树形结构，在根模块中引入了 `User` 模块。

执行上面的终端命令之后，我们会惊讶地发现，`app.module.ts` 中的代码已经发生了变化，在文件顶部自动引入了 `UserModule`，同时也在 `@Module` 装饰器的 `imports` 中引入了 `UserModule`。

```ts
// app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './server/user/user.module'; // 自动引入

@Module({
  imports: [UserModule], // 自动引入
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
复制代码
```

### 创建 `Controller`

```bash
nest g controller user server
复制代码
```

在 `Nest` 中，`controller` 就类似前端的**路由**，负责处理**客户端传入的请求**和**服务端返回的响应**。

举个例子，我们如果要通过 `http://localhost:3000/user/users` 获取所有的用户信息，那么我们可以在 `UserController` 中创建一个 `GET` 方法，路径为 `users` 的路由，这个路由负责返回所有的用户信息。

```ts
// user.controller.ts
import { Controller, Get } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Get('users')
  findAll(): string {
    return "All User's Info"; // [All User's Info] 暂时代替所有用户的信息
  }
}
复制代码
```

这就是 `controller` 的作用，负责分发和处理**请求**和**响应**。

当然，也可以把 `findAll` 方法写成异步方法，像这样：

```ts
// user.controller.ts
import { Controller, Get } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Get('users')
  async findAll(): Promise<any> {
    return await this.xxx.xxx(); // 一些异步操作
  }
}
复制代码
```

### 创建 `Provider`

```bash
nest g service user server
复制代码
```

`provider` 我们可以简单地从字面意思来理解，就是**服务的提供者**。

怎么去理解这个**服务提供者**呢？举个例子，我们的 `controller` 接收到了一个用户的查询请求，我们不能直接在 `controller` 中去查询数据库并返回，而是要将查询请求交给 `provider` 来处理，这里我们创建了一个 `UserService`，就是用来提供**数据库操作服务**的。

```ts
// user.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {}
复制代码
```

当然，`provider` 不一定只能用来提供数据库的操作服务，还可以用来做一些用户校验，比如使用 `JWT` 对用户权限进行校验的策略，就可以写成一个策略类，放到 `provider` 中，为模块提供相应的服务。

挺多文档将 `controller` 和 `provider` 翻译为**控制器**和**提供者**，我感觉这种翻译挺生硬的，让人不知所云，所以我们姑且记忆他们的英文名吧。

`controller` 和 `provider` 都创建完后，我们又会惊奇地发现，`user.module.ts` 文件中多了一些代码，变成了这样：

```ts
// user.module.ts
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
复制代码
```

从这里开始，我们就要开始用到数据库了~

## 连接数据库

### 引入 `Mongoose` 根模块

连接数据之前，我们要先在根模块，也就是 `app.module.ts` 中引入 `Mongoose` 的连接模块：

```ts
// app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './server/user/user.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/xxx'), UserModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
复制代码
```

这段代码里面的 `mongodb://localhost/xxx` 其实就是本地数据库的地址，`xxx` 是数据库的名字。

这时候保存文件，肯定有同学会发现控制台还是报错的，我们看一下报错信息就很容易知道问题在哪里了。

其实就是 `mongoose` 模块没有类型声明文件，这就很容易解决了，安装一下就好：

```bash
npm install @types/mongoose --dev 或者 yarn add @types/mongoose --dev
复制代码
```

安装完之后服务就正常重启了。

### 引入 `Mongoose` 分模块

这里我们先要创建一个数据表的格式，在 `src/server/user` 文件夹下创建一个 `user.schema.ts` 文件，定义一个数据表的格式：

```ts
// user.schema.ts
import { Schema } from 'mongoose';

export const userSchema = new Schema({
  _id: { type: String, required: true }, // 覆盖 Mongoose 生成的默认 _id
  user_name: { type: String, required: true },
  password: { type: String, required: true }
});
复制代码
```

然后将我们的 `user.module.ts` 文件修改成这样：

```ts
// user.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { userSchema } from './user.schema';
import { UserService } from './user.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Users', schema: userSchema }])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
复制代码
```

好了，现在一切就绪，终于可以开始编写我们的 `CRUD` 逻辑了！冲冲冲~

## `CRUD`

我们打开 `user.service.ts` 文件，为 `UserService` 类添加一个构造函数，让其在实例化的时候能够接收到数据库 `Model`，这样才能在类中的方法里操作数据库。

```ts
// user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDTO, EditUserDTO } from './user.dto';
import { User } from './user.interface';

@Injectable()
export class UserService {
  constructor(@InjectModel('Users') private readonly userModel: Model<User>) {}

  // 查找所有用户
  async findAll(): Promise<User[]> {
    const users = await this.userModel.find();
    return users;
  }

  // 查找单个用户
  async findOne(_id: string): Promise<User> {
    return await this.userModel.findById(_id);
  }

  // 添加单个用户
  async addOne(body: CreateUserDTO): Promise<void> {
    await this.userModel.create(body);
  }

  // 编辑单个用户
  async editOne(_id: string, body: EditUserDTO): Promise<void> {
    await this.userModel.findByIdAndUpdate(_id, body);
  }

  // 删除单个用户
  async deleteOne(_id: string): Promise<void> {
    await this.userModel.findByIdAndDelete(_id);
  }
}
复制代码
```

因为 `mongoose` 操作数据库其实是异步的，所以这里我们使用 `async` 函数来处理异步的过程。

好奇的同学会发现，这里突然出现了两个文件，一个是 `user.interface.ts`，另一个是 `user.dto.ts`，我们现在来创建一下：

```ts
// user.interface.ts
import { Document } from 'mongoose';

export interface User extends Document {
  readonly _id: string;
  readonly user_name: string;
  readonly password: string;
}
复制代码
// user.dto.ts
export class CreateUserDTO {
  readonly _id: string;
  readonly user_name: string;
  readonly password: string;
}

export class EditUserDTO {
  readonly user_name: string;
  readonly password: string;
}
复制代码
```

其实就是对数据类型做了一个定义。

现在，我们可以到 `user.controller.ts` 中设置路由了，将**客户端的请求**进行处理，调用相应的服务实现相应的功能：

```ts
// user.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put
} from '@nestjs/common';
import { CreateUserDTO, EditUserDTO } from './user.dto';
import { User } from './user.interface';
import { UserService } from './user.service';

interface UserResponse<T = unknown> {
  code: number;
  data?: T;
  message: string;
}

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // GET /user/users
  @Get('users')
  async findAll(): Promise<UserResponse<User[]>> {
    return {
      code: 200,
      data: await this.userService.findAll(),
      message: 'Success.'
    };
  }

  // GET /user/:_id
  @Get(':_id')
  async findOne(@Param('_id') _id: string): Promise<UserResponse<User>> {
    return {
      code: 200,
      data: await this.userService.findOne(_id),
      message: 'Success.'
    };
  }

  // POST /user
  @Post()
  async addOne(@Body() body: CreateUserDTO): Promise<UserResponse> {
    await this.userService.addOne(body);
    return {
      code: 200,
      message: 'Success.'
    };
  }

  // PUT /user/:_id
  @Put(':_id')
  async editOne(
    @Param('_id') _id: string,
    @Body() body: EditUserDTO
  ): Promise<UserResponse> {
    await this.userService.editOne(_id, body);
    return {
      code: 200,
      message: 'Success.'
    };
  }

  // DELETE /user/:_id
  @Delete(':_id')
  async deleteOne(@Param('_id') _id: string): Promise<UserResponse> {
    await this.userService.deleteOne(_id);
    return {
      code: 200,
      message: 'Success.'
    };
  }
}
复制代码
```

至此，我们就完成了一个完整的 `CRUD` 操作，接下来我们来测试一下~

## 接口测试

接口测试我们用的是 `Postman`，大家可以去下载一个，非常好用的接口自测工具。

数据库可视化工具我们用的是 `MongoDB` 官方的 `MongoDB Compass`，也很不错。

### `GET /user/users`

![GET /user/users](https:////p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f44a1cd395bb4ddea456bd3e134a614e~tplv-k3u1fbpfcp-watermark.awebp)

一开始我们的数据库中什么都没有，所以返回了一个空数组，没用用户信息。

### `POST /user`

![POST /user](https:////p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/43831a59ba7a4d44a3872093f9afd229~tplv-k3u1fbpfcp-watermark.awebp)

现在我们添加一条用户信息，服务器返回添加成功。

![Added](https:////p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/de0d72f3034f47b3b37bb66b060ccd03~tplv-k3u1fbpfcp-watermark.awebp)

### `GET /user/:_id`

![GET /user/:_id](https:////p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d37cf70091ca496183824b164e4d2cbc~tplv-k3u1fbpfcp-watermark.awebp)

添加完一条用户信息之后再查询，可算是能查询到我的信息了。

### `PUT /user/:_id`

![PUT /user/:_id](https:////p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3219d66af2a446fe94dfe1ec2f319eb1~tplv-k3u1fbpfcp-watermark.awebp)

现在假如我想修改密码，发送一个 `PUT` 请求。

![Edited](https:////p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fb8bfd4058874f5c9bc87e74034cb5f5~tplv-k3u1fbpfcp-watermark.awebp)

### `DELETE /user/:_id`

![DELETE /user/:_id](https:////p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/515372d5fb42498ea39a0c2dc7a019b2~tplv-k3u1fbpfcp-watermark.awebp)

现在我们删除一下刚才添加的用户信息。

![Deleted](https:////p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d6c16fa1384d4128b1d3b044fa86e6c2~tplv-k3u1fbpfcp-watermark.awebp)

会发现数据库中的内容已经被删除了。

## 完结撒花

大功告成，`CRUD` 就这么简单。

## 总结

教程还算是用了比较通俗易懂的方式为大家讲解了如何写一个带有 `CRUD` 功能的后端 `Node.js` 应用，框架采用的是 `Nest.js`。

相信大家在上面的教程中肯定有非常多不懂的部分，比如说 `@Get()`、`@Post()`、`@Param()`、`@Body()` 等等的装饰器，再比如说一些 `Nest.js` 相关的概念。

没关系，我的建议是：**学编程先模仿，遇到不懂的地方先记住，等到自己的积累够多了，总有一天你会回过头发现自己茅塞顿开，突然懂了。**这也是我个人学习的一个小技巧。

在学习的过程中，也一定会遇到一些问题，学习编程的过程中遇到问题不能自己憋着，**一定要学会请教大佬！一定要学会请教大佬！一定要学会请教大佬！**重要的事情说三遍。

不过也别很简单的问题就去请教大佬，而且最好给一点小小的报酬，毕竟谁也没有义务帮你解决问题。

我在学习的过程中也请教了一些社区里面的大佬，同时还进入了 `Nest.js` 的社区答疑群，向国外友人请教学到了不少知识。

当然，这个 `Demo` 中也有很多可以完善的地方，比如说**错误处理**。

数据库的操作肯定是有可能出现错误的，比如说我们漏传了 `required: true` 的参数，数据库就会报错。

这个时候我们就要写一个 `try/catch` 捕获这个异常，或者干脆写一个异常的过滤器，将所有的异常统一处理（`Nest.js` 支持过滤器）

除此之外，既然有可能出现异常，那么我们就需要一个日志系统去捕获这个异常，方便查错纠错。

如果涉及到登录注册的部分，还有密码加解密的过程，同时还可能有权限校验问题需要进行处理。

所以后端的同学肯定不止 `CRUD` 啦（可算圆回来了）。

## 参考资料

- [NestJS - A progressive Node.js framework](https://link.juejin.cn/?target=https%3A%2F%2Fnestjs.com%2F)
- [Nest.js 中文文档](https://link.juejin.cn/?target=https%3A%2F%2Fdocs.nestjs.cn%2F)

作者：炽翎
链接：https://juejin.cn/post/6885751452015263758
来源：稀土掘金