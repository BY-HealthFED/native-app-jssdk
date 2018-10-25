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
 * 分享信息
 */
export interface ShareInfo {
  title: string;
  content: string;
  image: string;
  url: string;
}

/**
 * Java native bridge
 * @ignore
 */
export default interface MemberAppJs {
  [api: string]: (...args: any) => void;
}
