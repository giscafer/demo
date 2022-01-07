//  View Object
class UserVo {
  id: string | number;
  username: string;
  email?: string;
  cellphone?: string;
}

//  Business Object
class UserBo {
  id: string | number;
  username: string;
  email?: string;
  cellphone?: string;
}

/**
 * UserRepository + Entity
 * 负责数据库查询访问
 */
class UserRepository {
  getUserById(userId: string) {
    // 省略细节
    return { id: 20210813164354, username: '张三' };
  }
}

/**
 * UserService + BO （ Business Object)
 * 负责业务逻辑处理
 */
class UserService {
  private userRepository: UserRepository; // 依赖注入，忽略此细节
  getUserById(userId: string): UserBo {
    // 省略细节
    const userEntity: UserBo = this.userRepository.getUserById(userId);
    // 这里其实会有 Entity 转 BO 的动作，省略
    return userEntity;
  }
}

/**
 * UserController + VO （ View Object)
 * 视图层数据处理，暴露接口
 */
class UserController {
  private userService: UserService; // 依赖注入，忽略此细节

  public getUserById(userId: string): UserVo {
    const user: UserBo = this.userService.getUserById(userId);
    // 这里其实有 UserBo转为 UserVo 的过程，为了方便省略
    return user;
  }
}
