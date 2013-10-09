CREATE TABLE IF NOT EXISTS `activator` (
  `auth-id` int(10) unsigned NOT NULL,
  `activity-id` int(10) unsigned NOT NULL,
  `active` tinyint(1) NOT NULL,
  `creation` datetime NOT NULL,
  `token` char(40) DEFAULT NULL,
  PRIMARY KEY (`auth-id`,`activity-id`)
) ENGINE=MyISAM DEFAULT CHARSET=ascii;

CREATE TABLE IF NOT EXISTS `activity` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `auth-id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `auth-id` (`auth-id`)
) ENGINE=MyISAM  DEFAULT CHARSET=ascii;

CREATE TABLE IF NOT EXISTS `activity-certification` (
  `activity-id` int(10) unsigned NOT NULL,
  `certification-id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`activity-id`,`certification-id`)
) ENGINE=MyISAM DEFAULT CHARSET=ascii;

CREATE TABLE IF NOT EXISTS `activity-description` (
  `activity-id` int(10) unsigned NOT NULL,
  `lang-id` int(10) unsigned NOT NULL,
  `value` varchar(255) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`activity-id`,`lang-id`),
  FULLTEXT KEY `value` (`value`)
) ENGINE=MyISAM DEFAULT CHARSET=ascii;

CREATE TABLE IF NOT EXISTS `activity-geo` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `activity-id` int(10) unsigned NOT NULL,
  `category-id` int(10) unsigned NOT NULL,
  `latitude` float(10,6) NOT NULL,
  `longitude` float(10,6) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `activity-id` (`activity-id`,`category-id`)
) ENGINE=MyISAM  DEFAULT CHARSET=ascii;

CREATE TABLE IF NOT EXISTS `activity-name` (
  `activity-id` int(10) unsigned NOT NULL,
  `value` varchar(127) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`activity-id`),
  FULLTEXT KEY `value` (`value`)
) ENGINE=MyISAM DEFAULT CHARSET=ascii;

CREATE TABLE IF NOT EXISTS `activity-place` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `activity-geo-id` int(10) unsigned NOT NULL,
  `road` varchar(255) DEFAULT NULL,
  `extra` varchar(255) DEFAULT NULL,
  `postcode` varchar(10) DEFAULT NULL,
  `city` varchar(60) DEFAULT NULL,
  `county` varchar(60) DEFAULT NULL,
  `state` varchar(60) DEFAULT NULL,
  `country` varchar(60) DEFAULT NULL,
  `email` varchar(60) DEFAULT NULL,
  `phone` varchar(60) DEFAULT NULL,
  `website` varchar(60) DEFAULT NULL,
  `twitter` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `activity-geo-id` (`activity-geo-id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `auth` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(127) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `auth-login` (
  `auth-id` int(10) unsigned NOT NULL,
  `active` tinyint(1) NOT NULL,
  `creation` datetime NOT NULL,
  PRIMARY KEY (`auth-id`)
) ENGINE=MyISAM DEFAULT CHARSET=ascii;

CREATE TABLE IF NOT EXISTS `category` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `icon` varchar(32) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=ascii;

CREATE TABLE IF NOT EXISTS `category-name` (
  `category-id` int(10) unsigned NOT NULL,
  `lang-id` int(10) unsigned NOT NULL,
  `value` varchar(20) NOT NULL,
  PRIMARY KEY (`category-id`,`lang-id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `certification` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `icon` varchar(32) NOT NULL,
  `name` varchar(60) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=ascii;

CREATE TABLE IF NOT EXISTS `country` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `lang_id` tinyint(4) NOT NULL DEFAULT '1',
  `name` varchar(50) NOT NULL,
  `iso2` char(2) NOT NULL,
  `latitude` float(10,6) NOT NULL,
  `longitude` float(10,6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `country_range` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `country_id` int(10) unsigned NOT NULL,
  `start` int(10) unsigned NOT NULL,
  `end` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `country_id` (`country_id`),
  KEY `range` (`start`,`end`)
) ENGINE=MyISAM  DEFAULT CHARSET=ascii;

CREATE TABLE IF NOT EXISTS `criteria` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `lang-id` int(10) unsigned NOT NULL,
  `value` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `lang-id` (`lang-id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `lang` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `value` char(2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=ascii;

CREATE TABLE IF NOT EXISTS `lang-description` (
  `lang-id` int(10) unsigned NOT NULL,
  `value` varchar(50) NOT NULL,
  PRIMARY KEY (`lang-id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;