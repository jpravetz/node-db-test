var Sequelize = require('sequelize');
var Path = require('path');

var props = {};

module.exports = function( dbConfig ) {
	
    if( !props.config ) {

        if( !dbConfig )
            throw new Error( "Config not specified for org database" );
        props.config = dbConfig;
        console.log( "Initializing DB" );

        props.sequelize = new Sequelize( props.config.database, props.config.user, props.config.password, {
            host: props.config.host,
            logging: function(msg) {
                console.log("Sequelize: " + msg);
            },
            pool: { maxConnection: 10, maxIdleTime: 30 }
        });

        props.Session = props.sequelize.import(Path.join(__dirname,'models','Session'));

        /**
         * Create the database from the model.
         * Note that we use db-migrate to create the database. You can run this
         * as a test to make sure the models are equivalent.
         * @param callback
         */
        props.create = function(callback) {
            props.sequelize
                .sync({force:true})
                .on('success',function(err) {
                   console.log( 'Database sync complete' );
                    props.initContent(callback);
                })
                .error(function(err){
                    console.log( "Sync error: " + err );
                    callback(err);
                });
        }

        /**
         * Initialize the database by adding content
         * @param callback
         */
        props.initContent = function(callback) {

            var s1 = props.Session.build( { sid: props.genSid(10), expiresAt: new Date() } );

            var chainer = new Sequelize.Utils.QueryChainer;
            chainer.add( s1.save() );
            chainer.run().success( function() {
                console.log('Database object creation complete');
                callback(null,true);
            }).error(onError)


            function onError(err) {
                console.log( "Error writing object %s", err );
                callback(err);
            }
        };

        props.genSid = function(len) {
            var set = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ',
                setLen = set.length,
                salt = '';
            for (var i = 0; i < len; i++) {
                var p = Math.floor(Math.random() * setLen);
                salt += set[p];
            }
            return salt;
        }

    }

	return props;
};

function genSid(len) {
    var set = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ',
        setLen = set.length,
        salt = '';
    for (var i = 0; i < len; i++) {
        var p = Math.floor(Math.random() * setLen);
        salt += set[p];
    }
    return salt;
}

