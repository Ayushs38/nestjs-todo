import { SequelizeModule } from '@nestjs/sequelize';

export const sequelizeModule = SequelizeModule.forRoot({
    dialect: 'postgres',
    host: 'localhost',
    port: 5434,
    username: 'postgres',
    password: 'admin',
    database: 'nest_todo_app',
    autoLoadModels: true,
    synchronize: true,
})