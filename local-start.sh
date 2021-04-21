##### Server Config
export PORT=7021
export BODY_LIMIT=5mb
export ALLOW_CORS_ORIGIN=*
export ALLOW_CORS_METHODS=OPTIONS,GET,POST,PUT,PATCH,DELETE

##### MongoDB Configs
export MONGO_USERNAME=
export MONGO_PASSWORD=
export MONGO_DBNAME=Notification-db
export MONGO_HOSTS=localhost:27017
#export MONGO_REPLICASET=
export MONGO_READ_PREFERENCE="secondaryPreferred"
#export MONGO_PEM_PATH="/home/node/mongo.pem"
#export MONGO_SERVER_IDENTITY_CHECK="true"

npm start
