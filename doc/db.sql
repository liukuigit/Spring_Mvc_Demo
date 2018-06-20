/*
MySQL Data Transfer
Source Host: localhost
Source Database: bqhy-v4-001
Target Host: localhost
Target Database: bqhy-v4-001
Date: 2018-06-20 11:31:35
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for ms_expertperson
-- ----------------------------
DROP TABLE IF EXISTS `ms_expertperson`;
CREATE TABLE `ms_expertperson` (
  `ExpertID` varchar(50) NOT NULL DEFAULT '',
  `ID` varchar(50) DEFAULT NULL,
  `Name` varchar(100) DEFAULT NULL,
  `GroupName` varchar(100) DEFAULT NULL,
  `GroupID` varchar(50) DEFAULT NULL,
  `Dept` varchar(200) DEFAULT NULL,
  `Title` varchar(200) DEFAULT NULL,
  `Tel` varchar(50) DEFAULT NULL,
  `Source` varchar(50) DEFAULT NULL,
  `CreatedTime` datetime DEFAULT NULL,
  `CreatedBy` varchar(50) DEFAULT NULL,
  `LastUpdatedTime` datetime DEFAULT NULL,
  `LastUpdatedBy` varchar(255) DEFAULT NULL,
  `Mstatus` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`ExpertID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for ms_files
-- ----------------------------
DROP TABLE IF EXISTS `ms_files`;
CREATE TABLE `ms_files` (
  `FileID` varchar(50) NOT NULL,
  `filetype` int(11) DEFAULT NULL,
  `refID` varchar(50) DEFAULT NULL,
  `Filename` varchar(255) DEFAULT NULL,
  `PhysicalPath` varchar(255) DEFAULT NULL,
  `OrigFilename` varchar(255) DEFAULT NULL,
  `FileLength` bigint(20) DEFAULT NULL,
  `ContentType` varchar(255) DEFAULT NULL,
  `CreateTime` datetime DEFAULT NULL,
  `UserID` varchar(50) DEFAULT NULL,
  `differenceid` int(11) DEFAULT NULL,
  PRIMARY KEY (`FileID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for ms_folder
-- ----------------------------
DROP TABLE IF EXISTS `ms_folder`;
CREATE TABLE `ms_folder` (
  `ID` varchar(50) NOT NULL DEFAULT '',
  `MeetingID` varchar(50) DEFAULT NULL,
  `FolderType` int(11) DEFAULT NULL,
  `FolderTypeName` varchar(50) DEFAULT NULL,
  `FolderName` varchar(255) DEFAULT NULL,
  `FolderUpdateTime` datetime DEFAULT NULL,
  `PhysicalPath` varchar(255) DEFAULT NULL,
  `CreatedTime` datetime DEFAULT NULL,
  `CreatedBy` varchar(50) DEFAULT NULL,
  `LastUpdatedTime` datetime DEFAULT NULL,
  `LastUpdatedBy` varchar(50) DEFAULT NULL,
  `Mstatus` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for ms_group
-- ----------------------------
DROP TABLE IF EXISTS `ms_group`;
CREATE TABLE `ms_group` (
  `GroupID` varchar(50) NOT NULL DEFAULT '',
  `ID` varchar(50) DEFAULT NULL,
  `Name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`GroupID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for ms_meetingdata
-- ----------------------------
DROP TABLE IF EXISTS `ms_meetingdata`;
CREATE TABLE `ms_meetingdata` (
  `ID` varchar(50) NOT NULL,
  `PAD_SerialNumber` varchar(50) DEFAULT NULL,
  `ms_PadInfo_ID` varchar(50) DEFAULT NULL,
  `ms_MeetingInfo_ID` varchar(50) DEFAULT NULL,
  `attendeesID` varchar(50) DEFAULT NULL,
  `attendeesName` varchar(50) DEFAULT NULL,
  `SignInDate` datetime DEFAULT NULL,
  `meetingOpinion` varchar(5000) DEFAULT NULL,
  `CreatedTime` datetime DEFAULT NULL,
  `CreatedBy` varchar(50) DEFAULT NULL,
  `LastUpdatedTime` datetime DEFAULT NULL,
  `LastUpdatedBy` varchar(50) DEFAULT NULL,
  `Mstatus` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for ms_meetinginfo
-- ----------------------------
DROP TABLE IF EXISTS `ms_meetinginfo`;
CREATE TABLE `ms_meetinginfo` (
  `ID` varchar(50) NOT NULL,
  `MeetingPassword` varchar(100) DEFAULT NULL,
  `Title` varchar(500) DEFAULT NULL,
  `Organizer` varchar(200) DEFAULT NULL,
  `Address` varchar(500) DEFAULT NULL,
  `LogoUrl` varchar(255) DEFAULT NULL,
  `StartTime` datetime DEFAULT NULL,
  `EndTime` datetime DEFAULT NULL,
  `MeetingDays` decimal(12,1) DEFAULT NULL,
  `MeetingDocUrl` varchar(255) DEFAULT NULL,
  `SecurityClassification` varchar(50) DEFAULT NULL,
  `CreatedTime` datetime DEFAULT NULL,
  `CreatedBy` varchar(50) DEFAULT NULL,
  `LastUpdatedTime` datetime DEFAULT NULL,
  `LastUpdatedBy` varchar(50) DEFAULT NULL,
  `Mstatus` varchar(10) DEFAULT NULL,
  `SubTitle` varchar(500) DEFAULT NULL,
  `DefaultNotion` varchar(1000) DEFAULT '',
  `MeetingType` varchar(10) DEFAULT NULL,
  `IsCurrent` bit(1) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for ms_meetingpackageinfo
-- ----------------------------
DROP TABLE IF EXISTS `ms_meetingpackageinfo`;
CREATE TABLE `ms_meetingpackageinfo` (
  `ID` varchar(50) NOT NULL,
  `ms_MeetingInfo_ID` varchar(50) DEFAULT NULL,
  `PAD_SerialNumber` varchar(50) DEFAULT NULL,
  `MeetingPackageName` varchar(255) DEFAULT NULL,
  `GroupID` varchar(50) DEFAULT NULL,
  `PackageURL` varchar(255) DEFAULT NULL,
  `CreatedTime` datetime DEFAULT NULL,
  `CreatedBy` varchar(50) DEFAULT NULL,
  `LastUpdatedTime` datetime DEFAULT NULL,
  `LastUpdatedBy` varchar(50) DEFAULT NULL,
  `Mstatus` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for ms_meetingpadlist
-- ----------------------------
DROP TABLE IF EXISTS `ms_meetingpadlist`;
CREATE TABLE `ms_meetingpadlist` (
  `ID` varchar(50) NOT NULL,
  `ms_RegistrationPadList_ID` varchar(50) DEFAULT NULL,
  `ms_PadInfo_ID` varchar(50) DEFAULT NULL,
  `ms_MeetingInfo_ID` varchar(50) DEFAULT NULL,
  `UserAccount` varchar(50) DEFAULT NULL,
  `StartTime` datetime DEFAULT NULL,
  `EndTime` datetime DEFAULT NULL,
  `StateID` int(11) DEFAULT NULL,
  `StateName` varchar(50) DEFAULT NULL,
  `ApplicationDate` datetime DEFAULT NULL,
  `BackDate` datetime DEFAULT NULL,
  `BackRemark` varchar(4000) DEFAULT NULL,
  `CreatedTime` datetime DEFAULT NULL,
  `CreatedBy` varchar(50) DEFAULT NULL,
  `LastUpdatedTime` datetime DEFAULT NULL,
  `LastUpdatedBy` varchar(50) DEFAULT NULL,
  `Mstatus` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for ms_mettingperson
-- ----------------------------
DROP TABLE IF EXISTS `ms_mettingperson`;
CREATE TABLE `ms_mettingperson` (
  `ID` varchar(50) NOT NULL DEFAULT '',
  `MeetingId` varchar(50) DEFAULT NULL,
  `PersonId` varchar(50) DEFAULT NULL,
  `PersonName` varchar(100) DEFAULT NULL,
  `GroupID` varchar(50) DEFAULT NULL,
  `GroupName` varchar(100) DEFAULT NULL,
  `CreatedTime` datetime DEFAULT NULL,
  `CreatedBy` varchar(50) DEFAULT NULL,
  `LastUpdatedTime` datetime DEFAULT NULL,
  `LastUpdatedBy` varchar(50) DEFAULT NULL,
  `Mstatus` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for ms_padinfo
-- ----------------------------
DROP TABLE IF EXISTS `ms_padinfo`;
CREATE TABLE `ms_padinfo` (
  `ID` varchar(50) NOT NULL,
  `SerialNumber` varchar(50) DEFAULT NULL,
  `ModelName` varchar(100) DEFAULT NULL,
  `Brand` varchar(100) DEFAULT NULL,
  `PurchaseDate` datetime DEFAULT NULL,
  `StateId` int(11) DEFAULT NULL,
  `StateName` varchar(50) DEFAULT NULL,
  `Remark` text,
  `CreatedTime` datetime DEFAULT NULL,
  `CreatedBy` varchar(50) DEFAULT NULL,
  `LastUpdatedTime` datetime DEFAULT NULL,
  `LastUpdatedBy` varchar(50) DEFAULT NULL,
  `Mstatus` varchar(10) DEFAULT NULL,
  `PADNO` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for ms_projectcalculaterewarddetail
-- ----------------------------
DROP TABLE IF EXISTS `ms_projectcalculaterewarddetail`;
CREATE TABLE `ms_projectcalculaterewarddetail` (
  `ProjectID` varchar(50) NOT NULL DEFAULT '',
  `MeetingID` varchar(50) DEFAULT NULL,
  `N1` decimal(12,5) DEFAULT NULL,
  `N3` decimal(12,5) DEFAULT NULL,
  `N5` decimal(12,5) DEFAULT NULL,
  `N7` decimal(12,5) DEFAULT NULL,
  `N1_Votes` int(11) DEFAULT NULL,
  `N3_Votes` int(11) DEFAULT NULL,
  `N5_Votes` int(11) DEFAULT NULL,
  `N7_Votes` int(11) DEFAULT NULL,
  `N_Votes` int(11) DEFAULT NULL,
  `ZNPY_N1_Votes` int(11) DEFAULT NULL,
  `ZNPY_N3_Votes` int(11) DEFAULT NULL,
  `ZNPY_N5_Votes` int(11) DEFAULT NULL,
  `ZNPY_N7_Votes` int(11) DEFAULT NULL,
  `ZNPY_N1` decimal(12,5) DEFAULT NULL,
  `ZNPY_N3` decimal(12,5) DEFAULT NULL,
  `ZNPY_N5` decimal(12,5) DEFAULT NULL,
  `ZNPY_N7` decimal(12,5) DEFAULT NULL,
  `ZNPY_N_Total` decimal(12,5) DEFAULT NULL,
  `CreatedTime` datetime DEFAULT NULL,
  `CreatedBy` varchar(50) DEFAULT NULL,
  `LastUpdatedTime` datetime DEFAULT NULL,
  `LastUpdatedBy` varchar(50) DEFAULT NULL,
  `Mstatus` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`ProjectID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for ms_projectinfo
-- ----------------------------
DROP TABLE IF EXISTS `ms_projectinfo`;
CREATE TABLE `ms_projectinfo` (
  `ProjectID` varchar(50) NOT NULL DEFAULT '',
  `ID` varchar(50) DEFAULT NULL,
  `Name` varchar(500) DEFAULT NULL,
  `GroupId` varchar(50) DEFAULT NULL,
  `GroupName` varchar(150) DEFAULT NULL,
  `DeptName` varchar(300) DEFAULT NULL,
  `OnlyDX` varchar(10) DEFAULT NULL,
  `RewardType` varchar(150) DEFAULT NULL,
  `Reward` varchar(100) DEFAULT NULL,
  `AchievementCode` varchar(100) DEFAULT NULL,
  `FinishCompany` varchar(2500) DEFAULT NULL,
  `FinishPerson` varchar(2500) DEFAULT NULL,
  `ApplyGrade` varchar(50) DEFAULT NULL,
  `FirstReviewGrade` varchar(50) DEFAULT NULL,
  `FinalReviewGrade` varchar(50) DEFAULT NULL,
  `CalculateRewardGrade` varchar(50) DEFAULT NULL,
  `MeetingID` varchar(50) DEFAULT NULL,
  `IsChangeGrade` varchar(10) DEFAULT NULL,
  `AfterChangeGrade` varchar(50) DEFAULT NULL,
  `MergeProjectID` varchar(50) DEFAULT NULL,
  `AuditPersonID` varchar(50) DEFAULT NULL,
  `AuditPersonName` varchar(100) DEFAULT NULL,
  `ProjectDocUrl` varchar(255) DEFAULT NULL,
  `FolderId` varchar(50) DEFAULT NULL,
  `GFBonusLevel` varchar(50) DEFAULT NULL,
  `FPFZ` varchar(50) DEFAULT NULL,
  `CreatedTime` datetime DEFAULT NULL,
  `CreatedBy` varchar(50) DEFAULT NULL,
  `LastUpdatedTime` datetime DEFAULT NULL,
  `LastUpdatedBy` varchar(50) DEFAULT NULL,
  `Mstatus` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`ProjectID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for ms_projectreviewinfo
-- ----------------------------
DROP TABLE IF EXISTS `ms_projectreviewinfo`;
CREATE TABLE `ms_projectreviewinfo` (
  `ID` varchar(50) NOT NULL DEFAULT '',
  `MeetingId` varchar(50) DEFAULT NULL,
  `ProjectId` varchar(50) DEFAULT NULL,
  `PersonId` varchar(50) DEFAULT NULL,
  `PersonName` varchar(100) DEFAULT NULL,
  `Item1` int(50) DEFAULT NULL,
  `Item2` int(50) DEFAULT NULL,
  `Item3` int(50) DEFAULT NULL,
  `Item4` int(50) DEFAULT NULL,
  `Item5` int(50) DEFAULT NULL,
  `Item6` int(50) DEFAULT NULL,
  `Item7` int(50) DEFAULT NULL,
  `Item8` varchar(50) DEFAULT NULL,
  `MergeProjectId` varchar(50) DEFAULT NULL,
  `NotionDesc` varchar(4000) DEFAULT NULL,
  `CreatedTime` datetime DEFAULT NULL,
  `CreatedBy` varchar(50) DEFAULT NULL,
  `LastUpdatedTime` datetime DEFAULT NULL,
  `LastUpdatedBy` varchar(50) DEFAULT NULL,
  `Mstatus` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for ms_registrationpadlist
-- ----------------------------
DROP TABLE IF EXISTS `ms_registrationpadlist`;
CREATE TABLE `ms_registrationpadlist` (
  `ID` varchar(50) NOT NULL,
  `MeetingNameDesc` varchar(5000) DEFAULT NULL,
  `PadNameDesc` varchar(5000) DEFAULT NULL,
  `RegistrationDate` datetime DEFAULT NULL,
  `UserAccount` varchar(50) DEFAULT NULL,
  `CreatedTime` datetime DEFAULT NULL,
  `CreatedBy` varchar(50) DEFAULT NULL,
  `LastUpdatedTime` datetime DEFAULT NULL,
  `LastUpdatedBy` varchar(50) DEFAULT NULL,
  `Mstatus` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for ms_rewardcoefficient
-- ----------------------------
DROP TABLE IF EXISTS `ms_rewardcoefficient`;
CREATE TABLE `ms_rewardcoefficient` (
  `RewardTypeID` varchar(50) NOT NULL DEFAULT '',
  `RewardType` varchar(50) DEFAULT NULL,
  `Item1` decimal(12,4) DEFAULT NULL,
  `Item2` decimal(12,4) DEFAULT NULL,
  `Item3` decimal(12,4) DEFAULT NULL,
  `Item4` decimal(12,4) DEFAULT NULL,
  `Item5` decimal(12,4) DEFAULT NULL,
  `Item6` decimal(12,4) DEFAULT NULL,
  `Item7` decimal(12,4) DEFAULT NULL,
  PRIMARY KEY (`RewardTypeID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for ms_role
-- ----------------------------
DROP TABLE IF EXISTS `ms_role`;
CREATE TABLE `ms_role` (
  `RoleID` int(11) NOT NULL,
  `RoleName` varchar(50) DEFAULT NULL,
  `RoleDesc` varchar(4000) DEFAULT NULL,
  PRIMARY KEY (`RoleID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for ms_serial
-- ----------------------------
DROP TABLE IF EXISTS `ms_serial`;
CREATE TABLE `ms_serial` (
  `SerialNo` int(11) NOT NULL AUTO_INCREMENT,
  `SerialPrefix` varchar(50) DEFAULT NULL,
  `Date` varchar(50) DEFAULT NULL,
  `MaxNumber` int(11) DEFAULT NULL,
  PRIMARY KEY (`SerialNo`)
) ENGINE=MyISAM AUTO_INCREMENT=253 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for ms_userrole
-- ----------------------------
DROP TABLE IF EXISTS `ms_userrole`;
CREATE TABLE `ms_userrole` (
  `UserAccount` varchar(50) DEFAULT NULL,
  `RoleID` int(11) NOT NULL,
  `RoleName` varchar(50) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for ms_users
-- ----------------------------
DROP TABLE IF EXISTS `ms_users`;
CREATE TABLE `ms_users` (
  `UserID` varchar(50) NOT NULL,
  `UserAccount` varchar(50) DEFAULT NULL,
  `Password` varchar(50) DEFAULT NULL,
  `UserName` varchar(50) DEFAULT NULL,
  `Photo` varchar(255) DEFAULT NULL,
  `DeptName` varchar(200) DEFAULT NULL,
  `SecurityClassification` varchar(50) DEFAULT NULL,
  `Mobile` varchar(50) DEFAULT NULL,
  `Email` varchar(50) DEFAULT NULL,
  `StateID` int(11) DEFAULT NULL,
  `StateName` varchar(50) DEFAULT NULL,
  `CreatedTime` datetime DEFAULT NULL,
  `CreatedBy` varchar(50) DEFAULT NULL,
  `LastUpdatedTime` datetime DEFAULT NULL,
  `LastUpdatedBy` varchar(50) DEFAULT NULL,
  `Mstatus` varchar(10) DEFAULT NULL,
  `LastLogin` datetime DEFAULT NULL,
  PRIMARY KEY (`UserID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- View structure for v_meetingpadlist
-- ----------------------------
DROP VIEW IF EXISTS `v_meetingpadlist`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_meetingpadlist` AS select `ms_meetingpadlist`.`ID` AS `ID`,`ms_meetingpadlist`.`ms_PadInfo_ID` AS `ms_PadInfo_ID`,`ms_meetingpadlist`.`ms_MeetingInfo_ID` AS `ms_MeetingInfo_ID`,`ms_meetingpadlist`.`UserAccount` AS `UserAccount`,`ms_meetingpadlist`.`StartTime` AS `StartTime`,`ms_meetingpadlist`.`EndTime` AS `EndTime`,`ms_meetingpadlist`.`StateID` AS `StateID`,`ms_meetingpadlist`.`StateName` AS `StateName`,`ms_meetingpadlist`.`ApplicationDate` AS `ApplicationDate`,`ms_meetingpadlist`.`BackDate` AS `BackDate`,`ms_meetingpadlist`.`BackRemark` AS `BackRemark`,`ms_meetingpadlist`.`CreatedTime` AS `CreatedTime`,`ms_meetingpadlist`.`CreatedBy` AS `CreatedBy`,`ms_meetingpadlist`.`LastUpdatedTime` AS `LastUpdatedTime`,`ms_meetingpadlist`.`LastUpdatedBy` AS `LastUpdatedBy`,`ms_meetingpadlist`.`Mstatus` AS `Mstatus`,`ms_padinfo`.`SerialNumber` AS `SerialNumber`,`ms_padinfo`.`ModelName` AS `ModelName`,`ms_padinfo`.`Brand` AS `Brand`,`ms_padinfo`.`StateId` AS `pad_StateID`,`ms_padinfo`.`StateName` AS `pad_StateName`,`ms_meetinginfo`.`Title` AS `Title`,`ms_meetinginfo`.`Organizer` AS `Organizer`,`ms_meetinginfo`.`Address` AS `Address`,`ms_meetinginfo`.`LogoUrl` AS `LogoUrl`,`ms_meetingpadlist`.`ms_RegistrationPadList_ID` AS `ms_RegistrationPadList_ID`,`ms_meetinginfo`.`StartTime` AS `meetingStartTime`,`ms_meetinginfo`.`EndTime` AS `meetingEndTime`,`ms_users`.`UserName` AS `UserName`,`ms_meetinginfo`.`SubTitle` AS `SubTitle` from (((`ms_meetingpadlist` join `ms_padinfo` on((`ms_meetingpadlist`.`ms_PadInfo_ID` = `ms_padinfo`.`ID`))) join `ms_meetinginfo` on((`ms_meetingpadlist`.`ms_MeetingInfo_ID` = `ms_meetinginfo`.`ID`))) join `ms_users` on((`ms_meetinginfo`.`CreatedBy` = `ms_users`.`UserAccount`)));

-- ----------------------------
-- View structure for v_ms_meetinginfo
-- ----------------------------
DROP VIEW IF EXISTS `v_ms_meetinginfo`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_ms_meetinginfo` AS select `m`.`ID` AS `ID`,`m`.`MeetingPassword` AS `MeetingPassword`,`m`.`Title` AS `Title`,`m`.`SubTitle` AS `SubTitle`,`m`.`Organizer` AS `Organizer`,`m`.`Address` AS `Address`,`m`.`LogoUrl` AS `LogoUrl`,`m`.`StartTime` AS `StartTime`,`m`.`EndTime` AS `EndTime`,`m`.`MeetingDays` AS `MeetingDays`,`m`.`MeetingDocUrl` AS `MeetingDocUrl`,`m`.`SecurityClassification` AS `SecurityClassification`,`m`.`CreatedTime` AS `CreatedTime`,`m`.`CreatedBy` AS `CreatedBy`,`m`.`LastUpdatedTime` AS `LastUpdatedTime`,`m`.`LastUpdatedBy` AS `LastUpdatedBy`,`m`.`Mstatus` AS `Mstatus`,`u`.`UserName` AS `CreatedByUserName`,(select max(`mpl`.`CreatedTime`) AS `max(CreatedTime)` from `ms_meetingpadlist` `mpl` where (`m`.`ID` = `mpl`.`ms_MeetingInfo_ID`)) AS `RegCreatedTime`,`m`.`MeetingType` AS `MeetingType`,`m`.`IsCurrent` AS `IsCurrent` from (`ms_meetinginfo` `m` join `ms_users` `u` on((`m`.`CreatedBy` = `u`.`UserAccount`)));

-- ----------------------------
-- View structure for v_ms_registrationpadlist
-- ----------------------------
DROP VIEW IF EXISTS `v_ms_registrationpadlist`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_ms_registrationpadlist` AS select `r`.`ID` AS `ID`,`r`.`MeetingNameDesc` AS `MeetingNameDesc`,`r`.`PadNameDesc` AS `PadNameDesc`,`r`.`RegistrationDate` AS `RegistrationDate`,`r`.`UserAccount` AS `UserAccount`,`r`.`CreatedTime` AS `CreatedTime`,`r`.`CreatedBy` AS `CreatedBy`,`r`.`LastUpdatedTime` AS `LastUpdatedTime`,`r`.`LastUpdatedBy` AS `LastUpdatedBy`,`r`.`Mstatus` AS `Mstatus`,`u`.`UserName` AS `CreatedByUserName`,(select (count(0) > 0) AS `count(*)>0` from `ms_meetingpadlist` where ((`ms_meetingpadlist`.`ms_RegistrationPadList_ID` = `r`.`ID`) and (`ms_meetingpadlist`.`StateID` = 1))) AS `StateBack` from (`ms_registrationpadlist` `r` join `ms_users` `u` on((`r`.`CreatedBy` = `u`.`UserAccount`)));

-- ----------------------------
-- View structure for v_padcount
-- ----------------------------
DROP VIEW IF EXISTS `v_padcount`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_padcount` AS select `u`.`UserAccount` AS `UserAccount`,`u`.`UserName` AS `UserName`,`u`.`Photo` AS `Photo`,`u`.`DeptName` AS `DeptName`,`u`.`Mobile` AS `Mobile`,`u`.`Email` AS `Email`,0 AS `countTotal`,0 AS `MeetingCount` from (`ms_users` `u` join `ms_userrole` `ur` on((`u`.`UserAccount` = `ur`.`UserAccount`))) where (`ur`.`RoleID` = 2);

-- ----------------------------
-- View structure for v_padlist
-- ----------------------------
DROP VIEW IF EXISTS `v_padlist`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_padlist` AS select `ms_padinfo`.`ID` AS `ID`,`ms_padinfo`.`SerialNumber` AS `SerialNumber`,`ms_padinfo`.`ModelName` AS `ModelName`,`ms_padinfo`.`Brand` AS `Brand`,`ms_padinfo`.`StateId` AS `StateId`,`ms_padinfo`.`StateName` AS `StateName`,`ms_padinfo`.`Remark` AS `Remark`,`ms_padinfo`.`CreatedTime` AS `CreatedTime`,`ms_padinfo`.`CreatedBy` AS `CreatedBy`,`ms_padinfo`.`LastUpdatedTime` AS `LastUpdatedTime`,`ms_padinfo`.`LastUpdatedBy` AS `LastUpdatedBy`,`ms_padinfo`.`Mstatus` AS `Mstatus`,(select `ms_meetingpadlist`.`ApplicationDate` AS `ApplicationDate` from `ms_meetingpadlist` where (`ms_meetingpadlist`.`ms_PadInfo_ID` = `ms_padinfo`.`ID`) order by `ms_meetingpadlist`.`ID` desc limit 1) AS `ApplicationDate`,(select `ms_meetingpadlist`.`BackDate` AS `BackDate` from `ms_meetingpadlist` where (`ms_meetingpadlist`.`ms_PadInfo_ID` = `ms_padinfo`.`ID`) order by `ms_meetingpadlist`.`ID` desc limit 1) AS `BackDate` from `ms_padinfo`;

-- ----------------------------
-- View structure for v_registrationpad
-- ----------------------------
DROP VIEW IF EXISTS `v_registrationpad`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_registrationpad` AS select distinct `v_meetingpadlist`.`ms_PadInfo_ID` AS `ms_padinfo_id`,`v_meetingpadlist`.`SerialNumber` AS `SerialNumber`,`v_meetingpadlist`.`ModelName` AS `ModelName`,`v_meetingpadlist`.`ApplicationDate` AS `ApplicationDate`,`v_meetingpadlist`.`BackDate` AS `BackDate`,`v_meetingpadlist`.`pad_StateName` AS `pad_StateName`,`v_meetingpadlist`.`ms_RegistrationPadList_ID` AS `ms_RegistrationPadList_ID`,`v_meetingpadlist`.`StateID` AS `StateID`,`v_meetingpadlist`.`StateName` AS `StateName`,`v_meetingpadlist`.`BackRemark` AS `BackRemark` from `v_meetingpadlist`;

-- ----------------------------
-- Procedure structure for proc_GetSerial
-- ----------------------------
DROP PROCEDURE IF EXISTS `proc_GetSerial`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `proc_GetSerial`(prefix varchar(50),
	currdate varchar(50),
	out maxnum int)
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from


	IF NOT EXISTS (Select 1 FROM ms_serial WHERE SerialPrefix = prefix AND Date=currdate)
	then
		INSERT INTO ms_serial (SerialPrefix,Date,MaxNumber) VALUES (prefix,currdate,1);
		SET maxnum = 1;

	ELSE

		set maxnum =(Select  MaxNumber FROM ms_serial WHERE SerialPrefix = prefix AND Date=currdate);
		SET maxnum = maxnum + 1;
		UPDATE ms_serial SET MaxNumber = maxnum WHERE SerialPrefix = prefix AND Date=currdate;
		END	if;
END;;
DELIMITER ;

INSERT INTO `ms_meetinginfo` VALUES ('M20160301002', null, '会议主题222', '会议主题222', '会议主题222', null, '2016-03-02 08:00:00', '2016-03-04 08:00:00', null, '/Uploads/MeetingDocs/M20160301002/M20160301002/', null, '2016-03-01 20:09:47', 'test001', '2016-03-01 20:09:47', 'test001', null, '会议主题222', '', null, '');
INSERT INTO `ms_meetinginfo` VALUES ('M20160301003', null, '会议主题333', '会议主题333', '会议主题333', null, '2016-03-01 08:00:00', '2016-03-03 08:00:00', null, '/Uploads/MeetingDocs/M20160301003/M20160301003/', null, '2016-03-01 20:57:07', 'test001', '2016-03-01 20:57:07', 'test001', null, '会议主题333', '', null, '');
INSERT INTO `ms_meetinginfo` VALUES ('M20160301004', null, '会议主题444', '会议主题444', '会议主题444', null, '2016-03-22 08:00:00', '2016-03-23 08:00:00', null, '/Uploads/MeetingDocs/M20160301004/M20160301004/', null, '2016-03-01 20:57:19', 'test001', '2016-03-01 20:57:19', 'test001', null, '会议主题444', '', null, '');
INSERT INTO `ms_meetinginfo` VALUES ('M20160301005', null, '会议主题555', '会议主题555', '会议主题555', null, '2016-03-10 08:00:00', '2016-03-11 08:00:00', null, '/Uploads/MeetingDocs/M20160301005/M20160301005/', null, '2016-03-01 21:00:00', 'test001', '2016-07-14 21:00:42', 'test001', null, '会议主题555', '', null, '');
INSERT INTO `ms_meetinginfo` VALUES ('M20160305001', null, '测试会议', '测试会议', '测试会议', null, '2016-03-02 08:00:00', '2016-03-17 08:00:00', null, '/Uploads/MeetingDocs/M20160305001/M20160305001/', null, '2016-03-05 22:00:00', 'test001', '2016-03-05 22:00:54', 'test001', null, '测试会议', 'Mysql命令alter add:增加表的字段_MySQL中文网Mysql命令alter add:增加表的字段_MySQL中文网Mysql命令alter add:增加表的字段_MySQL中文网Mysql命令alter add:增加表的字段_MySQL中文网Mysql命令alter add:增加表的字段_MySQL中文网Mysql命令alter add:增加表的字段_MySQL中文网Mysql命令a', null, '');
INSERT INTO `ms_meetinginfo` VALUES ('M20160914001', null, 'yyyy', 'yyy', 'yyy', null, '2016-09-14 08:00:00', '2016-09-16 08:00:00', null, '/Uploads/MeetingDocs/M20160914001/M20160914001/', null, '2016-09-14 10:40:49', 'test001', '2016-09-14 10:40:49', 'test001', null, 'yyyy', null, null, '');
INSERT INTO `ms_meetinginfo` VALUES ('M20160928001', null, '埃塞俄比亚铁路机车\\n跨境运输采购项目启动会议\\n采购项目启动会议', '埃塞俄比亚铁路机车', '埃塞俄比亚铁路机车', null, '2016-09-20 08:00:00', '2016-09-30 08:00:00', null, '/Uploads/MeetingDocs/M20160928001/M20160928001/', null, '2016-09-28 23:18:16', 'test001', '2016-09-28 23:18:16', 'test001', null, '埃塞俄比亚铁路机车跨境运输采购项目启动会议采购项目启动会议', null, null, '');
INSERT INTO `ms_meetinginfo` VALUES ('M20161001001', null, '用于在前端换行显示', '用于在前端换行显示', '用于在前端换行显示', null, '2016-11-02 08:00:00', '2016-11-12 08:00:00', null, '/Uploads/MeetingDocs/M20161001001/M20161001001/', null, '2016-10-01 18:08:00', 'test001', '2016-10-11 21:01:29', 'test001', null, '用于在前端换行显示', null, null, '');
INSERT INTO `ms_meetinginfo` VALUES ('M20161015001', '111', '专家意见模板专家意见模板专家意见模板专家意见模板专家意见模板', '专家意见模板专家意见模板专家意见模板专家意见模板', '专家意见模板专家意见模板', null, '2016-11-14 08:00:00', '2016-11-30 08:00:00', null, '/Uploads/MeetingDocs/M20161015001/M20161015001/', null, '2016-10-15 21:24:10', 'test001', '2016-10-15 21:24:10', 'test001', null, '专家意见模板专家意见模板专家意见模板专家意见模板专家意见模板', '默认专家意见', null, '');
INSERT INTO `ms_meetinginfo` VALUES ('M20161015002', null, '开始时间开始时间开始时间开始时间', '开始时间开始时间开始时间', '开始时间开始时间开始时间', null, '2016-10-12 08:00:00', '2016-10-28 08:00:00', null, '/Uploads/MeetingDocs/M20161015002/M20161015002/', null, '2016-10-15 21:40:51', 'test001', '2016-10-15 21:40:51', 'test001', null, '开始时间开始时间开始时间开始时间', null, null, '');
INSERT INTO `ms_meetinginfo` VALUES ('M20161015003', null, '结束时间结束时间结束时间', '结束时间结束时间结束时间结束时间', '结束时间结束时间结束时间', null, '2016-10-25 08:00:00', '2016-10-28 08:00:00', null, '/Uploads/MeetingDocs/M20161015003/M20161015003/', null, '2016-10-15 22:12:09', 'test001', '2016-10-15 22:12:09', 'test001', null, '结束时间结束时间结束时间', null, null, '');
INSERT INTO `ms_meetinginfo` VALUES ('M20161015004', null, '参会密码参会密码', '参会密码参会密码', '参会密码参会密码', null, '2016-10-28 08:00:00', '2016-10-30 08:00:00', null, '/Uploads/MeetingDocs/M20161015004/M20161015004/', null, '2016-10-15 22:13:27', 'test001', '2016-10-15 22:13:27', 'test001', null, '参会密码参会密码', null, null, '');
INSERT INTO `ms_meetinginfo` VALUES ('M20161019001', null, 'sdlfkajsldkfjasldkfsadfsdfsdfs', 'dfsdfs', 'dfsadfsadf', null, '2016-10-19 08:00:00', '2016-10-29 08:00:00', null, '/Uploads/MeetingDocs/M20161019001/M20161019001/', null, '2016-10-19 13:54:01', 'test001', '2016-10-19 13:54:01', 'test001', null, 'sdlfkajsldkfjasldkfsadfsdfsdfs', null, null, '');
INSERT INTO `ms_meetinginfo` VALUES ('M20161031001', null, '开始时间开始时间', '开始时间开始时间', '开始时间开始时间', null, '2016-10-26 08:00:00', '2016-10-28 08:00:00', null, '/Uploads/MeetingDocs/M20161031001/M20161031001/', null, '2016-10-31 11:50:21', 'test001', '2018-01-25 20:45:06', 'test001', null, '开始时间开始时间', null, null, '');
INSERT INTO `ms_meetinginfo` VALUES ('M20161031002', null, '埃塞俄比亚铁路机车跨境运输采购项目启动会议', '埃塞俄比亚铁路机车跨境运输采购项目启动会议', '埃塞俄比亚铁路机车跨境运输采购项目启动会议', null, '2016-10-18 08:00:00', '2016-10-30 08:00:00', null, '/Uploads/MeetingDocs/M20161031002/M20161031002/', null, '2016-10-31 20:58:29', null, '2016-10-31 20:58:29', null, null, '埃塞俄比亚铁路机车跨境运输采购项目启动会议', null, null, '');
INSERT INTO `ms_meetinginfo` VALUES ('M20161031003', '111', '埃塞俄比亚铁路机车跨境运输采购项目启动会议', '埃塞俄比亚铁路机车跨境运输采购项目启动会议', '埃塞俄比亚铁路机车跨境运输采购项目启动会议', null, '2016-10-18 08:00:00', '2016-10-28 08:00:00', null, '/Uploads/MeetingDocs/M20161031003/M20161031003/', null, '2016-10-31 20:59:00', 'test001', '2016-10-31 20:59:23', 'test001', null, '埃塞俄比亚铁路机车跨境运输采购项目启动会议', '专家意见', null, '');
INSERT INTO `ms_meetinginfo` VALUES ('M20161110001', null, 'M20161031003M20161031003M20161031003', 'M20161031003M20161031003', 'M20161031003M20161031003M20161', null, '2016-11-01 08:00:00', '2016-11-25 08:00:00', null, '/Uploads/MeetingDocs/M20161110001/M20161110001/', null, '2016-11-10 20:06:35', 'test001', '2018-01-25 20:45:02', 'test001', null, 'M20161031003M20161031003M20161031003', null, null, '');
INSERT INTO `ms_meetinginfo` VALUES ('M20161117001', null, '组织会议资料组织会议资料', '组织会议资料组织会议资料', '组织会议资料组织会议资料', null, '2016-11-16 08:00:00', '2016-11-24 08:00:00', null, '/Uploads/MeetingDocs/M20161117001/M20161117001/', null, '2016-11-17 20:46:44', 'test001', '2018-01-25 20:44:16', 'test001', null, '组织会议资料组织会议资料', '家意见模', null, '');
INSERT INTO `ms_meetinginfo` VALUES ('M20161128001', null, '会务管理员会务管理员', '会务管理员会务管理员', '会务管理员会务管理员', null, '2016-11-02 08:00:00', '2016-11-26 08:00:00', null, '/Uploads/MeetingDocs/M20161128001/M20161128001/', null, '2016-11-28 20:06:00', 'test001', '2018-01-26 14:20:32', 'test001', null, '会务管理员会务管理员', null, '初评', '');
INSERT INTO `ms_meetinginfo` VALUES ('M20161230001', null, '参会密码 参会密码 参会密码 参会密码 参会密码 ', '参会密码 参会密码 参会密码 参会密码 ', '参会密码 参会密码 参会密码 参会密码 ', null, '2016-12-15 08:00:00', '2016-12-23 08:00:00', null, '/Uploads/MeetingDocs/M20161230001/M20161230001/', null, '2016-12-30 11:55:00', 'test001', '2018-01-26 14:20:26', 'test001', null, '参会密码 参会密码 参会密码 参会密码 参会密码 ', null, '初评', '');
INSERT INTO `ms_meetinginfo` VALUES ('M20170102001', null, '水电费水电费', '水电费水电费水电费水电费', '水电费水电费水电费水电费', null, '2017-01-11 08:00:00', '2017-01-26 08:00:00', null, '/Uploads/MeetingDocs/M20170102001/M20170102001/', null, '2017-01-02 21:58:46', null, '2017-01-02 21:58:46', null, null, '水电费水电费', null, null, '');
INSERT INTO `ms_meetinginfo` VALUES ('M20170102002', null, '测试会议', '撒旦法撒旦法撒的撒旦法撒旦法撒的', '撒旦法撒旦法撒的撒旦法撒旦法撒的', null, '2017-01-11 08:00:00', '2017-01-20 08:00:00', null, '/Uploads/MeetingDocs/M20170102002/M20170102002/', null, '2017-01-02 21:59:00', 'test001', '2018-01-26 14:20:21', 'test001', null, '测试会议', null, '初评', '');
INSERT INTO `ms_meetinginfo` VALUES ('M20170110001', null, '家意见模家意见模家意见模', '家意见模家意见模家意见模', '家意见模家意见模', null, '2017-01-10 08:00:00', '2017-01-26 08:00:00', null, '/Uploads/MeetingDocs/M20170110001/M20170110001/', null, '2017-01-10 21:59:00', 'test001', '2018-01-25 20:49:00', 'test001', null, '家意见模家意见模家意见模', null, '初评', '');
INSERT INTO `ms_meetinginfo` VALUES ('M20180113001', null, 'test会议主题', '会议主题', '会议主题', null, '2018-01-10 08:00:00', '2018-01-20 08:00:00', null, '/Uploads/MeetingDocs/M20180113001/M20180113001/', null, '2018-01-13 21:42:00', 'test001', '2018-01-25 20:45:44', 'test001', null, 'test会议主题', null, '初评', '');
INSERT INTO `ms_meetinginfo` VALUES ('M20180126001', null, '会议主题会议主题', '会议主题会议主题', null, null, '2018-01-23 08:00:00', '2018-01-27 08:00:00', null, '/Uploads/MeetingDocs/M20180126001/M20180126001/', null, '2018-01-26 14:42:55', 'test001', '2018-01-26 14:42:55', 'test001', null, '会议主题会议主题', null, '初评', '');
INSERT INTO `ms_meetinginfo` VALUES ('M20180127001', null, '测试活动会议', '测试活动会议', null, null, '2018-01-23 08:00:00', '2018-01-25 08:00:00', null, '/Uploads/MeetingDocs/M20180127001/M20180127001/', null, '2018-01-27 14:55:41', 'test001', '2018-01-27 14:55:41', 'test001', null, '测试活动会议', 'TEST', '初评', '');

INSERT INTO `ms_role` VALUES ('1', '系统管理员', '系统管理员');
INSERT INTO `ms_role` VALUES ('2', '会务管理员', '会务管理员');
INSERT INTO `ms_serial` VALUES ('138', 'U', '20160229', '1');
INSERT INTO `ms_serial` VALUES ('139', 'M', '20160229', '1');
INSERT INTO `ms_serial` VALUES ('140', 'P', '20160301', '4');
INSERT INTO `ms_serial` VALUES ('141', 'M', '20160301', '5');
INSERT INTO `ms_serial` VALUES ('142', 'R', '20160301', '3');
INSERT INTO `ms_serial` VALUES ('143', 'MP', '20160301', '11');
INSERT INTO `ms_serial` VALUES ('144', 'M', '20160305', '1');
INSERT INTO `ms_serial` VALUES ('145', 'M', '20160912', '1');
INSERT INTO `ms_serial` VALUES ('146', 'M', '20160914', '1');
INSERT INTO `ms_serial` VALUES ('147', 'M', '20160927', '1');
INSERT INTO `ms_serial` VALUES ('148', 'M', '20160928', '1');
INSERT INTO `ms_serial` VALUES ('149', 'M', '20161001', '1');
INSERT INTO `ms_serial` VALUES ('150', 'M', '20161015', '4');
INSERT INTO `ms_serial` VALUES ('151', 'M', '20161019', '1');
INSERT INTO `ms_serial` VALUES ('152', 'M', '20161031', '3');
INSERT INTO `ms_serial` VALUES ('153', 'M', '20161110', '1');
INSERT INTO `ms_serial` VALUES ('154', 'N', '20161113', '1');
INSERT INTO `ms_serial` VALUES ('155', 'M', '20161117', '1');
INSERT INTO `ms_serial` VALUES ('156', 'M', '20161128', '1');
INSERT INTO `ms_serial` VALUES ('157', 'M', '20161230', '1');
INSERT INTO `ms_serial` VALUES ('158', 'M', '20170102', '2');
INSERT INTO `ms_serial` VALUES ('159', 'M', '20170110', '1');
INSERT INTO `ms_serial` VALUES ('160', 'N', '20180113', '2');
INSERT INTO `ms_serial` VALUES ('161', 'M', '20180113', '1');
INSERT INTO `ms_serial` VALUES ('162', 'E', '20180124', '7');
INSERT INTO `ms_serial` VALUES ('163', 'MP', '20180125', '25');
INSERT INTO `ms_serial` VALUES ('164', 'MP', '20180126', '33');
INSERT INTO `ms_serial` VALUES ('165', 'M', '20180126', '1');
INSERT INTO `ms_serial` VALUES ('166', 'PID', '20180126', '63');
INSERT INTO `ms_serial` VALUES ('167', 'M', '20180127', '1');
INSERT INTO `ms_serial` VALUES ('168', 'MP', '20180127', '12');
INSERT INTO `ms_serial` VALUES ('169', 'M', '20180129', '2');
INSERT INTO `ms_serial` VALUES ('170', 'G', '20180129', '27');
INSERT INTO `ms_serial` VALUES ('171', 'E', '20180129', '9');
INSERT INTO `ms_serial` VALUES ('172', 'PID', '20180130', '7');
INSERT INTO `ms_serial` VALUES ('173', 'MP', '20180130', '6');
INSERT INTO `ms_serial` VALUES ('174', 'M', '20180131', '1');
INSERT INTO `ms_serial` VALUES ('175', 'MP', '20180131', '35');
INSERT INTO `ms_serial` VALUES ('176', 'PID', '20180131', '15');
INSERT INTO `ms_serial` VALUES ('177', 'PR', '20180131', '102');
INSERT INTO `ms_serial` VALUES ('178', 'E', '20180131', '97');
INSERT INTO `ms_serial` VALUES ('179', 'PK', '20180206', '30');
INSERT INTO `ms_serial` VALUES ('180', 'M', '20180207', '2');
INSERT INTO `ms_serial` VALUES ('181', 'MP', '20180207', '40');
INSERT INTO `ms_serial` VALUES ('182', 'PID', '20180207', '30');
INSERT INTO `ms_serial` VALUES ('183', 'PK', '20180207', '8');
INSERT INTO `ms_serial` VALUES ('184', 'PR', '20180209', '177');
INSERT INTO `ms_serial` VALUES ('185', 'M', '20180209', '2');
INSERT INTO `ms_serial` VALUES ('186', 'PID', '20180209', '30');
INSERT INTO `ms_serial` VALUES ('187', 'MP', '20180209', '30');
INSERT INTO `ms_serial` VALUES ('188', 'U', '20180209', '1');
INSERT INTO `ms_serial` VALUES ('189', 'MP', '20180210', '20');
INSERT INTO `ms_serial` VALUES ('190', 'PK', '20180210', '3');
INSERT INTO `ms_serial` VALUES ('191', 'MP', '20180212', '4');
INSERT INTO `ms_serial` VALUES ('192', 'M', '20180212', '1');
INSERT INTO `ms_serial` VALUES ('193', 'PID', '20180212', '28');
INSERT INTO `ms_serial` VALUES ('194', 'PK', '20180212', '6');
INSERT INTO `ms_serial` VALUES ('195', 'PR', '20180212', '20');
INSERT INTO `ms_serial` VALUES ('196', 'PR', '20180213', '36');
INSERT INTO `ms_serial` VALUES ('197', 'PK', '20180213', '15');
INSERT INTO `ms_serial` VALUES ('198', 'MP', '20180216', '2');
INSERT INTO `ms_serial` VALUES ('199', 'PK', '20180216', '3');
INSERT INTO `ms_serial` VALUES ('200', 'PK', '20180218', '9');
INSERT INTO `ms_serial` VALUES ('201', 'MP', '20180218', '2');
INSERT INTO `ms_serial` VALUES ('202', 'U', '20180220', '1');
INSERT INTO `ms_serial` VALUES ('203', 'M', '20180220', '1');
INSERT INTO `ms_serial` VALUES ('204', 'MP', '20180220', '14');
INSERT INTO `ms_serial` VALUES ('205', 'G', '20180220', '2');
INSERT INTO `ms_serial` VALUES ('206', 'PID', '20180220', '227');
INSERT INTO `ms_serial` VALUES ('207', 'PK', '20180220', '12');
INSERT INTO `ms_serial` VALUES ('208', 'PR', '20180220', '72');
INSERT INTO `ms_serial` VALUES ('209', 'PK', '20180221', '9');
INSERT INTO `ms_serial` VALUES ('210', 'PK', '20180222', '3');
INSERT INTO `ms_serial` VALUES ('211', 'PR', '20180223', '3');
INSERT INTO `ms_serial` VALUES ('212', 'U', '20180224', '2');
INSERT INTO `ms_serial` VALUES ('213', 'E', '20180224', '14');
INSERT INTO `ms_serial` VALUES ('214', 'MP', '20180224', '15');
INSERT INTO `ms_serial` VALUES ('215', 'M', '20180225', '1');
INSERT INTO `ms_serial` VALUES ('216', 'MP', '20180225', '15');
INSERT INTO `ms_serial` VALUES ('217', 'PID', '20180225', '27');
INSERT INTO `ms_serial` VALUES ('218', 'PK', '20180225', '3');
INSERT INTO `ms_serial` VALUES ('219', 'PR', '20180225', '6');
INSERT INTO `ms_serial` VALUES ('220', 'PR', '20180226', '18');
INSERT INTO `ms_serial` VALUES ('221', 'PK', '20180228', '10');
INSERT INTO `ms_serial` VALUES ('222', 'M', '20180301', '2');
INSERT INTO `ms_serial` VALUES ('223', 'MP', '20180301', '19');
INSERT INTO `ms_serial` VALUES ('224', 'PID', '20180301', '47');
INSERT INTO `ms_serial` VALUES ('225', 'PK', '20180301', '3');
INSERT INTO `ms_serial` VALUES ('226', 'M', '20180302', '3');
INSERT INTO `ms_serial` VALUES ('227', 'PID', '20180302', '1467');
INSERT INTO `ms_serial` VALUES ('228', 'G', '20180302', '1');
INSERT INTO `ms_serial` VALUES ('229', 'M', '20180303', '11');
INSERT INTO `ms_serial` VALUES ('230', 'PID', '20180303', '2031');
INSERT INTO `ms_serial` VALUES ('231', 'G', '20180303', '17');
INSERT INTO `ms_serial` VALUES ('232', 'MP', '20180303', '12');
INSERT INTO `ms_serial` VALUES ('233', 'PK', '20180303', '3');
INSERT INTO `ms_serial` VALUES ('234', 'PR', '20180303', '55');
INSERT INTO `ms_serial` VALUES ('235', 'M', '20180304', '4');
INSERT INTO `ms_serial` VALUES ('236', 'PID', '20180304', '1365');
INSERT INTO `ms_serial` VALUES ('237', 'G', '20180304', '2');
INSERT INTO `ms_serial` VALUES ('238', 'MP', '20180304', '8');
INSERT INTO `ms_serial` VALUES ('239', 'PK', '20180304', '3');
INSERT INTO `ms_serial` VALUES ('240', 'E', '20180304', '11');
INSERT INTO `ms_serial` VALUES ('241', 'E', '20180306', '6');
INSERT INTO `ms_serial` VALUES ('242', 'MP', '20180306', '6');
INSERT INTO `ms_serial` VALUES ('243', 'M', '20180326', '1');
INSERT INTO `ms_serial` VALUES ('244', 'MP', '20180326', '24');
INSERT INTO `ms_serial` VALUES ('245', 'PID', '20180401', '330');
INSERT INTO `ms_serial` VALUES ('246', 'M', '20180401', '5');
INSERT INTO `ms_serial` VALUES ('247', 'MP', '20180401', '12');
INSERT INTO `ms_serial` VALUES ('248', 'M', '20180402', '3');
INSERT INTO `ms_serial` VALUES ('249', 'MP', '20180402', '23');
INSERT INTO `ms_serial` VALUES ('250', 'PID', '20180402', '130');
INSERT INTO `ms_serial` VALUES ('251', 'PK', '20180402', '1');
INSERT INTO `ms_serial` VALUES ('252', 'PK', '20180403', '1');
INSERT INTO `ms_userrole` VALUES ('admin', '1', '系统管理员');
INSERT INTO `ms_userrole` VALUES ('test001', '1', '系统管理员');
INSERT INTO `ms_userrole` VALUES ('test001', '2', '会务管理员');
INSERT INTO `ms_userrole` VALUES ('test002', '1', '系统管理员');
INSERT INTO `ms_userrole` VALUES ('test002', '2', '会务管理员');
INSERT INTO `ms_userrole` VALUES ('test003', '1', '系统管理员');
INSERT INTO `ms_userrole` VALUES ('test003', '2', '会务管理员');
INSERT INTO `ms_userrole` VALUES ('test004', '2', '会务管理员');
INSERT INTO `ms_userrole` VALUES ('admin001', '1', '系统管理员');
INSERT INTO `ms_users` VALUES ('U20150507038', 'admin', '670b14728ad9902aecba32e22fa4f6bd', 'admin', null, 'admin', '公开', '', '', '1', '激活', '2015-05-07 16:45:52', null, '2018-02-24 09:46:24', null, null, '2018-02-24 09:46:24');
INSERT INTO `ms_users` VALUES ('U20160229001', 'test001', '670b14728ad9902aecba32e22fa4f6bd', 'test001', null, 'test001', null, 'test001', null, '1', '激活', '2016-02-29 20:41:11', 'admin', '2018-06-18 23:31:28', 'admin', null, '2018-06-18 23:31:28');
INSERT INTO `ms_users` VALUES ('U20180209001', 'test002', '670b14728ad9902aecba32e22fa4f6bd', 'test002', null, 'test002', null, 'test002', null, '1', '激活', '2018-02-09 23:33:25', 'test001', '2018-06-19 23:45:35', 'test001', null, '2018-06-19 23:45:35');
INSERT INTO `ms_users` VALUES ('U20180220001', 'test003', '670b14728ad9902aecba32e22fa4f6bd', 'test003', null, 'test003', null, 'test003', '', '1', '激活', '2018-02-20 19:49:40', 'test001', '2018-02-20 23:23:29', 'test001', null, '2018-02-20 23:23:29');
INSERT INTO `ms_users` VALUES ('U20180224001', 'test004', '670b14728ad9902aecba32e22fa4f6bd', 'test004', null, 'test004', null, 'test004', null, '1', '激活', '2018-02-24 09:41:12', 'test001', '2018-02-24 09:46:11', 'test001', null, '2018-02-24 09:46:11');
INSERT INTO `ms_users` VALUES ('U20180224002', 'admin001', '670b14728ad9902aecba32e22fa4f6bd', 'admin001', null, 'admin001', null, 'admin001', null, '1', '激活', '2018-02-24 09:46:39', 'admin', '2018-02-24 09:46:48', 'admin', null, '2018-02-24 09:46:48');
