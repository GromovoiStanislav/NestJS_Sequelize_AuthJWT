import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from "./users/users.module";
import { ConfigModule } from "@nestjs/config";
import { User } from "./users/users.model";
import { RolesModule } from './roles/roles.module';
import { Role } from "./roles/roles.model";
import { UserRoles } from "./roles/user-roles.model";
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: "127.0.0.1",//process.env.POSTGRES_HOST,
      port: 5432,//Number(process.env.POSTGRESS_PORT),
      username: "postgres",//process.env.POSTGRES_USER,
      password: "root",//process.env.POSTGRESS_PASSWORD,
      database: "db",//process.env.POSTGRES_DB,
      models: [User, Role, UserRoles],
      autoLoadModels: true,
      logging: false
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    PostsModule,
  ]
})
export class AppModule {
}