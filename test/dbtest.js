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

var dbConfig = {
    "driver": "mysql",
    "host": "localhost",
    "user": "jpravetz",
    "password": "testtest",
    "database": "test"
}

var DB = require('../index')( dbConfig );

DB.create( function(err) {
    if( !err ) {
        testWR();
    }
});

function testWR() {
    var sid = DB.genSid(10);
    var s = DB.Session.build( { sid: sid, expiresAt: new Date() } );
    s.save()
        .success( function(session) {
            console.log( "Object written: session.expiresAt %s", session.expiresAt );
            console.log( session.values );
            console.log( "Looking for object for sid %s", sid );
            DB.Session.find({where: {sid: sid}})
                .success( function (record) {
                    console.log( "Found object for sid %s, session.expiresAt %s", sid, record.expiresAt );
                    console.log(record.values);
                    DB.sequelize.query( "select expiresAt from Sessions WHERE `Sessions`.`sid`='" + sid + "';", null, { raw: true })
                        .success( function(result) {
                            console.log( result );
                        }).error(onError);
                })
                .error(onError);
        }).error(onError);
}

function onError(err) {
    console.log( "Error: %s", err );
}




