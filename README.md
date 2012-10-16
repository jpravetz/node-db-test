# node-db-test #

Test sequelize database interface. Tests include:

- Test round trip of UTC dates during write/read.

I have patched sequelize and node-mysql to use UTC dates rather then localtime.
This is necessary because of the nature of our distributed enviroment with multiple
databases in different timezones, not necessarily in the same timezone as where our
code is running.

I expect sequelize will directly support UTC time in an upcoming release, and then
this fork will no longer be necessary.