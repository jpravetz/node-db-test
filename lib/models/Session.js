/*************************************************************************
 * ARMOR5 CONFIDENTIAL
 * Copyright 2012 Armor5, Inc. All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains the property
 * of Armor5, Inc. and its suppliers, if any. The intellectual and 
 * technical concepts contained herein are proprietary to Armor5, Inc.  
 * and its suppliers and may be covered by U.S. and Foreign Patents,  
 * patents in process, and are protected by trade secret or copyright law. 
 * Dissemination of this information or reproduction of this material is 
 * strictly forbidden unless prior written permission is obtained from 
 * Armor5, Inc..
 **************************************************************************/

var Sequelize = require('sequelize');

module.exports = function( sequelize, DataTypes ) {

	return sequelize.define( 'Session', {
        sid: {type: Sequelize.STRING, unique: true, allowNull: false},
        expiresAt: Sequelize.DATE,
        json: Sequelize.TEXT
	});
};

