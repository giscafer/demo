// 模拟代码，定义类型
interface RpcRequest {}

// Filter 接口
interface Filter {
  doFilter(req: RpcRequest): void;
}

// 接口实现：鉴权过滤器
class AuthencationFilter implements Filter {
  doFilter(req: RpcRequest): void {
    // 省略逻辑
  }
}

// 接口实现：限流过滤器
class RateLimitFilter implements Filter {
  doFilter(req: RpcRequest): void {
    // 省略逻辑
  }
}

// 过滤器使用 demo
class Applicaption {
  private filters: Array<Filter> = [];
  public handleRpcRequest(req: RpcRequest) {
    try {
      for (const filter of this.filters) {
        filter.doFilter(req);
      }
    } catch (error) {
      // 省略
    }
  }
}
