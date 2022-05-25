/*
 * BY-Health Front-end Team (https://www.by-health.com/)
 *
 * Copyright © 2016-present By-Health Co Ltd. All rights reserved.
 * @file
 */

/**
 * 角色名称
 */
export enum RoleType {
  /**
   * 连锁管理者
   */
  RoleChainManager = 1,
  /**
   * 店长
   */
  RoleStoreManager = 2,
  /**
   * 店员
   */
  RoleStoreAssistant = 3,

  // ------------ 经销商 ------------
  // #region
  /**
   * 经销商总经理
   */
  RoleDealerGeneralManager = 100,
  /**
   * 经销商业务经理
   */
  RoleDealerBusinessManager = 101,
  /**
   * 经销商副总经理
   */
  RoleDealerViceGeneralManager = 102,
  /**
   * 经销商销售总监
   */
  RoleDealerSalesDirector = 103,
  /**
   * 经销商业务主管
   */
  RoleDealerAccountDirector = 104,
  /**
   * 经销商业务代表
   */
  RoleDealerSalesRepresentative = 105,
  /**
   * 经销商促销员
   */
  RoleDealerPromotionsSpecialist = 106,
  /**
   * 经销商资料管理员
   */
  RoleDealerDataManager = 107,
  /**
   * 订单专员
   */
  RoleDealerOrderSpecialist = 108,
  // #endregion

  // ------------------------------------
  // 经销商 - 如果是以下三种角色，职位名称则要获取userInfo.user.outterRoletypename
  // ------------------------------------
  // #region
  /**
   * 经销商高级管理员：经销商总经理
   */
  RolePartnerSeniorAdministrator = 121,
  /**
   * 经销商管理员：经销商副总经理，经销商销售总监，订单专员
   */
  RolePartnerAdministrator = 122,
  /**
   * 经销商业务员：经销商业务经理，经销商业务代表，经销商业务主管，经销商资料管理员
   */
  RolePartnerBusinessManager = 123,
  // #endregion

  // ------------ 讲师 ------------
  // #region
  /**
   * 总负责讲师
   */
  RoleLecturerBoss = 201,
  /**
   * [健康管理]场景负责讲师
   */
  RoleLecturerManageScene = 202,
  /**
   * [健康管理]现场操作讲师
   */
  RoleLecturerManageOperation = 203,
  /**
   * [大健康快车]现场操作讲师
   */
  RoleLecturerBusOperation = 204,
  /**
   * [大健康快车]场景负责讲师
   */
  RoleLecturerBusScene = 205,
  //#endregion

  // ------------------------------------
  // 讲师也类似经销商账号，如果是以下三种角色，职位名称则要获取userInfo.user.outterRoletypename
  // 培训经理：培训经理，培训部经理，培训高级主管，电商培训部经理，健康快车培训经理
  // 项目主管：项目主管，健康快车项目车长
  // 培训主管：培训主管
  // ------------------------------------
  // #region
  /**
   * 培训经理
   */
  RoleTrainingManager = 211,
  /**
   * 培训主管
   */
  RoleTrainingSupervisor = 212,
  /**
   * 项目主管
   */
  RoleProjectSupervisor = 213,
  /**
   * 培训副经理
   */
  RoleTrainingDeputyManager = 214,
  /**
   * 培训部经理
   */
  RoleTrainingDepartmentManager = 215,
  /**
   * 培训高级主管
   */
  RoleTrainingSeniorSupervisor = 216,
  /**
   * 电商培训部经理
   */
  RoleElectricBusinessTrainingDepartmentManager = 217,
  /**
   * 健康快车培训经理
   */
  RoleHealthExpressTrainingManager = 218,
  /**
   * 区培训主管
   */
  RoleDistrictTrainingSupervisor = 219,
  /**
   * 健康快车项目车长
   */
  RoleHealthExpressProjectDriver = 220,
  /**
   * 健康车主管
   */
  RoleHealthExpressSupervisor = 221,
  // #endregion

  // ------------ 销售 ------------
  // #region
  /**
   * 销售总监
   */
  RoleSaleManager = 301,
  /**
   * 大区经理
   */
  RoleDistictManager = 302,
  /**
   * 区域经理
   */
  RoleRegionManager = 303,
  /**
   * 城市经理
   */
  RoleCityManager = 304,
  /**
   * 市场代表
   */
  RoleMarketRepresent = 305,
  /**
   * 大区推广经理
   */
  RoleAreaPromotionManager = 306,
  /**
   * 公司区域助理
   */
  RoleCompanyAreaMan = 307,
  /**
   * 区域助理
   */
  RoleRegionalAssistant = 308,
  // #endregion
}

/**
 * 用户性别
 */
export enum Gender {
  /**
   * 男
   */
  Male = 0,
  /**
   * 女
   */
  Female = 1,
}

/**
 * 用户信息
 */
export interface UserInfo {
  /**
   * 角色类型
   */
  roleType: RoleType;
  /**
   * 用户信息
   */
  user: {
    usertel: string;
    usertypename: string;
    usercode: string;
    usertype: number;
    username: string;
    outterusername: string;
    outteruserid: string;
  };
  /**
   * 用户扩展信息
   */
  userExt: {
    /**
     * 性别
     */
    gender: Gender;
    /**
     * 手机号
     */
    phone: string;
    /**
     * 门店编号
     */
    storeNum: string;
    /**
     * 用户昵称
     */
    userName: string;
    /**
     * 生日（时间戳）
     */
    birthday: number;
    /**
     * 头像链接
     */
    imageUrl: string;
  };
  auth: {
    /**
     * 店员手机
     */
    userName: string;
    memberType: string;
  };

  /**
   * 门店信息
   */
  store: {
    /**
     * 门店编号
     */
    bhNo: string;
    /**
     * 门店名称
     */
    bhName: string;
    bhStoreid: string;
    bhStoreType: string;
    bhManager: string;
    bhMemberId: string;
  };
  storeMember: {
    bhStoreid: string;
  };
}

/**
 * [新版]用户性别
 */
export enum NewUserGender {
  /**
   * 未知
   */
  Unknow = 0,
  /**
   * 男
   */
  Male = 1,
  /**
   * 女
   */
  Female = 2,
}

/**
 * [新版]用户类型
 */
export enum NewMemberType {
  /**
   * 粉丝
   */
  Fans = 0,
  /**
   * 会员
   */
  Member = 1,
  /**
   * 内部人员
   */
  Insider = 2,
  /**
   * 同时是会员和内部人员
   */
  InsiderMember = 3,
}

/**
 * [新版]用户角色
 */
export enum NewUserRole {
  /**
   * 店长
   */
  StoreManager = 1,
  /**
   * 店员
   */
  StoreAssistant = 1,
}

/**
 * [新版]店员状态
 */
export enum NewUserStatus {
  /**
   * 未激活
   */
  Inactive = 0,
  /**
   * 启用
   */
  Enabled = 1,
  /**
   * 禁用
   */
  Disabled = 2,
  /**
   * 作废
   */
  Deactivate = 3,
}
/**
 * [新版]用户信息
 */
export interface NewUserInfo {
  /**
   * 员工ID (店员ID)
   */
  memberId: number;
  /**
   * 登陆认证授权token
   */
  authToken: string;
  /**
   * 员工名称 (店员名称)
   */
  memberName: string;
  /**
   * 员工昵称 (店员昵称)
   */
  nickName: string;
  /**
   * 手机
   */
  mobilePhone: string;
  /**
   * 座机
   */
  telephone: string;
  /**
   * 1:男性2:女性0:未知
   */
  gender: NewUserGender;
  /**
   * 生日（YYYY-MM-DD)
   */
  birthday: string;
  /**
   * 会员类型
   */
  memberType: NewMemberType;
  /**
   * 头像链接
   */
  headimg: string;
  /**
   * 省份ID
   */
  regionProvinceId: number;
  /**
   * 市/行政区ID
   */
  regionCityId: number;
  /**
   * 城市ID
   */
  regionCountyId: number;
  /**
   * 地址
   */
  address: string;
  /**
   * 工作
   */
  job: string;
  /**
   * 兴趣爱好
   */
  hobby: string;
  /**
   * 公司名称
   */
  company: string;
  /**
   * 电子邮件
   */
  email: string;
  /**
   * 邮政编码
   */
  postCode: string;
  /**
   * 月收入
   */
  incomeMonth: string;
  /**
   * 身份证号
   */
  idcard: string;
  /**
   * 机构ID (门店ID)
   */
  orgId: string;
  /**
   * 机构编号 (门店编号)
   */
  orgNo: string;
  /**
   * 角色
   */
  roles: NewUserRole[];
  /**
   * 可用汤币
   */
  availableMoney: number;
  /**
   * 冻结汤币
   */
  freezingMoney: number;
  /**
   * 用户状态
   */
  status: NewUserStatus;
  /**
   * 创建时间 (2018-11-20T06:27:06.121Z)
   */
  createTime: string;
  /**
   * 更新时间 (2018-11-20T06:27:06.121Z)
   */
  updateTime: string;
}

/**
 * 分享信息
 */
export interface ShareInfo {
  title: string;
  content: string;
  image: string;
  url: string;
}

/**
 * 设备信息
 *
 * @example
 * iPhone:
 *  {
 *    "brand": "Apple",
 *    "phoneName": "iPhone 12",
 *    "osVersion": "IOS 15.4",
 *    "screenDpi": "2532*1170",
 *    "operators": "中国移动",
 *    "networkType": "4G",
 *  }
 *
 * @example
 * Redmi 5:
 *  {
 *    "brand": "xiaomi",
 *    "phoneName": "Redmi 5 Plus",
 *    "osVersion": "android 7.1.2",
 *    "screenDpi": "2030*1080",
 *    "operators": "中国移动",
 *    "networkType": "WIFI",
 *  }
 */
export interface DeviceInfo {
  /**
   * 手机品牌：Apple xiaomi
   */
  brand: string;
  /**
   * 机型代码
   */
  phoneName: string;
  /**
   * 操作系统版本
   */
  osVersion: string;
  /**
   * 屏幕分辨率（高度 * 宽度，2532 * 1170）
   */
  screenDpi: string;
  /**
   * 电信运营商（中国移动、中国联通、中国电信）
   */
  operators: string;
  /**
   * 网络类型（3G、4G、5G、WIFI）
   */
  networkType: string;
}

/**
 * Java native bridge
 * @ignore
 */
export default interface MemberAppJs {
  [api: string]: (...args: any) => void;
}
