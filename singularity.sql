/*
Navicat MySQL Data Transfer

Source Server         : 本地
Source Server Version : 50714
Source Host           : localhost:3306
Source Database       : singularity

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2017-05-31 07:50:41
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for sg_apply_note
-- ----------------------------
DROP TABLE IF EXISTS `sg_apply_note`;
CREATE TABLE `sg_apply_note` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `user_id` int(11) NOT NULL DEFAULT '0' COMMENT '用户ID',
  `mobile` varchar(20) DEFAULT '' COMMENT '手机号码',
  `type` tinyint(4) unsigned DEFAULT '0' COMMENT '[1=POS机],[2=信用卡],[3=贷款],[4=车险],[5=代理加盟]',
  `apply_type` varchar(30) DEFAULT '' COMMENT '由type决定,比如POS机有通付和大机',
  `credit_card` tinyint(2) unsigned DEFAULT '0' COMMENT '有无信用卡[0=无],[1=有]',
  `quota` decimal(4,0) DEFAULT '0' COMMENT '信用卡额度',
  `sum` decimal(4,0) DEFAULT '0' COMMENT '目标贷款金额',
  `asset` varchar(200) DEFAULT '' COMMENT '资产',
  `banks` varchar(255) DEFAULT '' COMMENT '银行列表',
  `created_at` int(11) DEFAULT '0' COMMENT '创建时间',
  `updated_at` int(11) DEFAULT '0' COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='申请记录';

-- ----------------------------
-- Records of sg_apply_note
-- ----------------------------

-- ----------------------------
-- Table structure for sg_banner
-- ----------------------------
DROP TABLE IF EXISTS `sg_banner`;
CREATE TABLE `sg_banner` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `material_id` int(11) DEFAULT '0' COMMENT '轮播图id',
  `url` varchar(100) DEFAULT '' COMMENT '链接',
  `sort` int(11) DEFAULT '0' COMMENT '排序',
  `wechat_id` int(11) DEFAULT '0' COMMENT '公众号ID',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='轮播图';

-- ----------------------------
-- Records of sg_banner
-- ----------------------------
INSERT INTO `sg_banner` VALUES ('1', '1', '', '1', '1');
INSERT INTO `sg_banner` VALUES ('2', '2', '', '2', '1');

-- ----------------------------
-- Table structure for sg_company
-- ----------------------------
DROP TABLE IF EXISTS `sg_company`;
CREATE TABLE `sg_company` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `name` varchar(50) NOT NULL DEFAULT '' COMMENT '公司名称',
  `intro` text COMMENT '介绍',
  `tel` varchar(20) DEFAULT NULL COMMENT '客服电话',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='公司介绍';

-- ----------------------------
-- Records of sg_company
-- ----------------------------

-- ----------------------------
-- Table structure for sg_material
-- ----------------------------
DROP TABLE IF EXISTS `sg_material`;
CREATE TABLE `sg_material` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `type` tinyint(1) NOT NULL COMMENT '文件资料类型;[1=图片],[2=音频],[3=视频]',
  `path` varchar(200) DEFAULT NULL COMMENT '文件资料路径',
  `size` int(11) DEFAULT NULL COMMENT '文件大小',
  `md5` char(32) DEFAULT NULL COMMENT 'MD5值',
  `upload_at` int(11) NOT NULL COMMENT '上传时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='文件资料库';

-- ----------------------------
-- Records of sg_material
-- ----------------------------
INSERT INTO `sg_material` VALUES ('1', '1', '20170530/20170530123116-592d661468a63.jpg', '147883', '4a5c30ee024ca6f9cd668b3203b7a855', '1496147476');
INSERT INTO `sg_material` VALUES ('2', '1', '20170530/20170530133824-592d75d0eba05.jpg', '168676', 'faee33a01c1c583bd2362432a99bf1c7', '1496151504');

-- ----------------------------
-- Table structure for sg_news
-- ----------------------------
DROP TABLE IF EXISTS `sg_news`;
CREATE TABLE `sg_news` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `title` varchar(50) DEFAULT '' COMMENT '标题',
  `content` text COMMENT '内容',
  `created_at` int(11) DEFAULT '0' COMMENT '创建时间',
  `updated_at` int(11) DEFAULT '0' COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='资讯';

-- ----------------------------
-- Records of sg_news
-- ----------------------------

-- ----------------------------
-- Table structure for sg_user
-- ----------------------------
DROP TABLE IF EXISTS `sg_user`;
CREATE TABLE `sg_user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'id',
  `open_id` varchar(30) NOT NULL COMMENT '微信open_id',
  `sex` tinyint(1) NOT NULL DEFAULT '0' COMMENT '性别;[1=男],[2=女]',
  `mobile` varchar(20) DEFAULT NULL COMMENT '手机',
  `avatar` varchar(255) DEFAULT NULL COMMENT '头像',
  `username` varchar(30) NOT NULL DEFAULT '' COMMENT '姓名',
  `address` varchar(255) NOT NULL DEFAULT '' COMMENT '详细地址',
  `nickname` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` varchar(20) DEFAULT NULL COMMENT '国家',
  `province` varchar(20) DEFAULT NULL COMMENT '省份',
  `city` varchar(20) DEFAULT NULL COMMENT '城市',
  `language` varchar(20) DEFAULT NULL COMMENT '语言',
  `subscribe_time` int(11) DEFAULT NULL COMMENT '关注时间',
  `remark` varchar(20) DEFAULT NULL COMMENT '备注(个性签名)',
  `union_id` varchar(40) DEFAULT NULL COMMENT 'unionid',
  `group_id` int(11) DEFAULT NULL COMMENT '分组ID',
  `status` tinyint(1) DEFAULT '0' COMMENT '关注状态;[1=关注],[0=未关注]',
  `birthday` int(11) DEFAULT '0' COMMENT '出生日期',
  `created_at` int(11) NOT NULL DEFAULT '0' COMMENT '添加时间',
  `updated_at` int(11) DEFAULT NULL COMMENT '修改时间',
  `last_active_time` int(10) DEFAULT NULL COMMENT '最后活跃时间',
  `wechat_id` int(11) DEFAULT NULL COMMENT '所属商家公众号',
  PRIMARY KEY (`id`),
  KEY `user_name` (`open_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='用户表';

-- ----------------------------
-- Records of sg_user
-- ----------------------------
INSERT INTO `sg_user` VALUES ('1', 'openid', '1', '13794117440', 'http://www.baidu.com', 'xiaojun', '1701', 'xiaojun', 'China', '广东省', '揭阳市', 'Chinese', '1479792322', 'aa', '1', '1', '0', '1479792322', '1479792322', '1479792322', '1479792322', '1');

-- ----------------------------
-- Table structure for sg_wechat
-- ----------------------------
DROP TABLE IF EXISTS `sg_wechat`;
CREATE TABLE `sg_wechat` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `wechat_name` varchar(100) DEFAULT NULL COMMENT '公众号名称',
  `wechat_code` varchar(100) DEFAULT NULL COMMENT '微信号',
  `company_name` varchar(100) DEFAULT NULL COMMENT '账号主体',
  `intro` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '介绍',
  `app_id` varchar(100) DEFAULT NULL COMMENT 'appId',
  `app_secret` varchar(255) DEFAULT NULL COMMENT 'appSecret',
  `token` varchar(255) DEFAULT NULL COMMENT 'token',
  `encoding_aeskey` varchar(255) DEFAULT NULL COMMENT 'encodingAesKey',
  `original_id` varchar(255) DEFAULT NULL COMMENT '公众号原始ID',
  `access_token` varchar(512) DEFAULT NULL COMMENT '当前access_token',
  `expire_time` int(10) DEFAULT NULL COMMENT 'access_token过期时间',
  `refresh_token` varchar(512) DEFAULT NULL COMMENT '刷新令牌',
  `mode` tinyint(1) DEFAULT '0' COMMENT '模式;[0=非授权模式],[1=授权模式]',
  `status` tinyint(1) DEFAULT '1' COMMENT '状态;[0=删除],[1=正常]',
  `component_appid` varchar(100) DEFAULT NULL COMMENT '第三方平台方APPID',
  `authorization_code` varchar(512) DEFAULT NULL COMMENT '授权码',
  `authorization_code_expire_time` int(11) DEFAULT NULL COMMENT '授权码过期时间',
  `service_type_info` tinyint(4) DEFAULT NULL COMMENT '授权方公众号类型',
  `verify_type_info` tinyint(4) DEFAULT NULL COMMENT '授权方认证类型',
  `business_info` varchar(512) DEFAULT NULL COMMENT '功能的开通状况',
  `func_info` varchar(512) DEFAULT NULL COMMENT '公众号授权给开发者的权限',
  `industry_set` tinyint(2) DEFAULT '0' COMMENT '是否已经设置行业[0=否],[1=是]',
  `created_at` int(11) DEFAULT '0' COMMENT '添加时间',
  `updated_at` int(11) DEFAULT '0' COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='公众号';

-- ----------------------------
-- Records of sg_wechat
-- ----------------------------
