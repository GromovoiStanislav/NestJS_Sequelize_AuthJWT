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
import { Post } from "./posts/posts.model";
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "node:path";

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      //rootPath: join( __dirname,'..', 'upload'),
      rootPath: join(process.cwd(), 'upload'),
      serveRoot:"/static"
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: "127.0.0.1",//process.env.POSTGRES_HOST,
      port: 5432,//Number(process.env.POSTGRESS_PORT),
      username: "postgres",//process.env.POSTGRES_USER,
      password: "root",//process.env.POSTGRESS_PASSWORD,
      database: "db",//process.env.POSTGRES_DB,
      models: [User, Role, UserRoles, Post],
      autoLoadModels: true,
      logging: false
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    PostsModule,
    FilesModule,
  ]
})
export class AppModule {
}