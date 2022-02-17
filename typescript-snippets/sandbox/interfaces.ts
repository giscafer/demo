declare global {
  interface Window {
    __QIANKUN_DEVELOPMENT__?: boolean;
    Zone?: CallableFunction;
  }
}

export enum SandBoxType {
  Proxy = 'Proxy',
  Snapshot = 'Snapshot',

  // for legacy sandbox
  // https://github.com/umijs/qiankun/blob/0d1d3f0c5ed1642f01854f96c3fabf0a2148bd26/src/sandbox/legacy/sandbox.ts#L22...L25
  LegacyProxy = 'LegacyProxy',
}

export type SandBox = {
  /** 沙箱的名字 */
  name: string;
  /** 沙箱的类型 */
  type: SandBoxType;
  /** 沙箱导出的代理实体 */
  proxy: WindowProxy;
  /** 沙箱是否在运行中 */
  sandboxRunning: boolean;
  /** latest set property */
  latestSetProp?: PropertyKey | null;
  /** 启动沙箱 */
  active: () => void;
  /** 关闭沙箱 */
  inactive: () => void;
};
