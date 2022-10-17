import dotenv from 'dotenv'
import Joi from 'joi'

dotenv.config()

const skemaDotenv = Joi.object().keys({
  PORT: Joi.number().required(),
  DBPORT: Joi.required(),
  DBHOST: Joi.required(),
  DBNAME: Joi.required(),
  DBUSER: Joi.required(),
  DBPASS: Joi.required(),
  AKTIFSTATUS: Joi.required(),
  SUPERUSER: Joi.required(),
  KASTAUSER: Joi.number().required(),
  KASTAADMIN: Joi.number().required()
}).unknown()

const { value, error } = skemaDotenv.validate(process.env)

if (error) throw new Error(`Kesalahan pada file .env: ${error.message}`)

export const { PORT, DBPORT, DBHOST, DBNAME, DBUSER, DBPASS, AKTIFSTATUS, SUPERUSER, KASTAUSER, KASTAADMIN } = value